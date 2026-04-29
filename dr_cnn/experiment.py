import torch
from sklearn.metrics import accuracy_score, f1_score
from torch import nn
from torch.utils.data import DataLoader, Subset
from torchvision import datasets

from dr_cnn.model import SimpleCNN
from dr_cnn.plotting import plot_loss_curve, save_loss_history
from dr_cnn.seed import seed_worker
from dr_cnn.train_eval import evaluate, train_one_epoch


def run_experiment(
    name,
    train_transform,
    val_transform,
    data_dir,
    indices,
    class_names,
    device,
    args,
    fig_dir,
    results_dir,
):
    train_idx, val_idx, test_idx = indices

    train_dataset = datasets.ImageFolder(data_dir, transform=train_transform)
    val_dataset = datasets.ImageFolder(data_dir, transform=val_transform)
    test_dataset = datasets.ImageFolder(data_dir, transform=val_transform)

    generator = torch.Generator()
    generator.manual_seed(args.seed)

    train_loader = DataLoader(
        Subset(train_dataset, train_idx),
        batch_size=args.batch_size,
        shuffle=True,
        num_workers=args.num_workers,
        worker_init_fn=seed_worker,
        generator=generator,
    )
    val_loader = DataLoader(
        Subset(val_dataset, val_idx),
        batch_size=args.batch_size,
        shuffle=False,
        num_workers=args.num_workers,
        worker_init_fn=seed_worker,
        generator=generator,
    )
    test_loader = DataLoader(
        Subset(test_dataset, test_idx),
        batch_size=args.batch_size,
        shuffle=False,
        num_workers=args.num_workers,
        worker_init_fn=seed_worker,
        generator=generator,
    )

    model = SimpleCNN(num_classes=len(class_names)).to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=args.lr)

    history = {"train": [], "val": []}
    for epoch in range(1, args.epochs + 1):
        train_desc = f"{name} train {epoch}/{args.epochs}"
        val_desc = f"{name} val {epoch}/{args.epochs}"
        train_loss = train_one_epoch(
            model, train_loader, criterion, optimizer, device, desc=train_desc
        )
        val_loss, _, _ = evaluate(model, val_loader, criterion, device, desc=val_desc)
        history["train"].append(train_loss)
        history["val"].append(val_loss)
        print(f"[{name}] Epoch {epoch:02d} | train: {train_loss:.4f} | val: {val_loss:.4f}")

    save_loss_history(history, results_dir / f"{name}_losses.csv")
    plot_loss_curve(
        history,
        fig_dir / f"{name}_loss_curve.png",
        f"Loss curves ({name})",
    )

    test_desc = f"{name} test"
    test_loss, y_true, y_pred = evaluate(
        model, test_loader, criterion, device, desc=test_desc
    )
    accuracy = accuracy_score(y_true, y_pred)
    macro_f1 = f1_score(y_true, y_pred, average="macro")

    print(
        f"[{name}] Test loss: {test_loss:.4f} | "
        f"accuracy: {accuracy:.4f} | macro F1: {macro_f1:.4f}"
    )

    return {
        "test_loss": test_loss,
        "accuracy": accuracy,
        "macro_f1": macro_f1,
    }
