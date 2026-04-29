import argparse
import csv
import random
from collections import Counter
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import torch
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score
from sklearn.model_selection import StratifiedShuffleSplit
from torch import nn
from torch.utils.data import DataLoader, Subset
from torchvision import datasets, transforms
from tqdm import tqdm


def set_seed(seed):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
    try:
        torch.use_deterministic_algorithms(True)
    except Exception:
        pass


def seed_worker(worker_id):
    worker_seed = torch.initial_seed() % 2**32
    np.random.seed(worker_seed)
    random.seed(worker_seed)


def stratified_split_indices(targets, seed):
    targets = np.array(targets)
    sss1 = StratifiedShuffleSplit(
        n_splits=1, train_size=0.7, test_size=0.3, random_state=seed
    )
    train_idx, temp_idx = next(sss1.split(np.zeros(len(targets)), targets))

    temp_targets = targets[temp_idx]
    sss2 = StratifiedShuffleSplit(
        n_splits=1, train_size=2 / 3, test_size=1 / 3, random_state=seed
    )
    val_rel, test_rel = next(sss2.split(np.zeros(len(temp_targets)), temp_targets))
    val_idx = temp_idx[val_rel]
    test_idx = temp_idx[test_rel]

    return train_idx.tolist(), val_idx.tolist(), test_idx.tolist()


def print_split_distribution(split_name, indices, targets, class_names):
    counts = Counter(targets[idx] for idx in indices)
    total = len(indices)
    print(f"{split_name} split ratios:")
    for idx, name in enumerate(class_names):
        count = counts.get(idx, 0)
        ratio = count / total if total > 0 else 0.0
        print(f"  {name}: {count} ({ratio:.3f})")


class AddGaussianNoise:
    def __init__(self, mean=0.0, std=0.02):
        self.mean = mean
        self.std = std

    def __call__(self, tensor):
        if self.std <= 0:
            return tensor
        noise = torch.randn_like(tensor) * self.std + self.mean
        return torch.clamp(tensor + noise, 0.0, 1.0)


class SimpleCNN(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.pool = nn.AdaptiveAvgPool2d((1, 1))
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64, num_classes),
        )

    def forward(self, x):
        x = self.features(x)
        x = self.pool(x)
        x = self.classifier(x)
        return x


def train_one_epoch(model, loader, criterion, optimizer, device, desc=None):
    model.train()
    total_loss = 0.0
    progress = tqdm(loader, desc=desc or "Train", leave=False)
    for images, labels in progress:
        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad(set_to_none=True)
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item() * images.size(0)
    return total_loss / len(loader.dataset)


def evaluate(model, loader, criterion, device, desc=None):
    model.eval()
    total_loss = 0.0
    all_preds = []
    all_labels = []
    with torch.no_grad():
        progress = tqdm(loader, desc=desc or "Eval", leave=False)
        for images, labels in progress:
            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)
            loss = criterion(outputs, labels)
            preds = torch.argmax(outputs, dim=1)

            total_loss += loss.item() * images.size(0)
            all_preds.append(preds.cpu().numpy())
            all_labels.append(labels.cpu().numpy())

    y_true = np.concatenate(all_labels)
    y_pred = np.concatenate(all_preds)
    avg_loss = total_loss / len(loader.dataset)
    return avg_loss, y_true, y_pred


def save_loss_history(loss_history, csv_path):
    with open(csv_path, "w", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["epoch", "train_loss", "val_loss"])
        for idx, (train_loss, val_loss) in enumerate(
            zip(loss_history["train"], loss_history["val"]), start=1
        ):
            writer.writerow([idx, train_loss, val_loss])


def plot_loss_curve(loss_history, fig_path, title):
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.plot(loss_history["train"], label="train")
    ax.plot(loss_history["val"], label="val")
    ax.set_xlabel("Epoch")
    ax.set_ylabel("Loss")
    ax.set_title(title)
    ax.legend()
    fig.tight_layout()
    fig.savefig(fig_path, dpi=150)
    plt.close(fig)


def plot_class_distribution(rows, fig_path):
    labels = [row[0] for row in rows]
    counts = [row[1] for row in rows]

    fig, ax = plt.subplots(figsize=(6, 4))
    ax.bar(labels, counts, color="#4C78A8")
    ax.set_title("Class distribution (full dataset)")
    ax.set_ylabel("Count")
    ax.tick_params(axis="x", rotation=20)
    fig.tight_layout()
    fig.savefig(fig_path, dpi=150)
    plt.close(fig)


def draw_cnn_architecture(fig_path, num_classes):
    labels = [
        "Input\n3xHxW",
        "Conv 3x3\n16",
        "MaxPool 2x2",
        "Conv 3x3\n32",
        "MaxPool 2x2",
        "Conv 3x3\n64",
        "MaxPool 2x2",
        "GlobalAvgPool",
        f"FC\n{num_classes} classes",
    ]

    fig, ax = plt.subplots(figsize=(12, 2.8))
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

    x_positions = np.linspace(0.05, 0.95, len(labels))
    for i, label in enumerate(labels):
        ax.text(
            x_positions[i],
            0.5,
            label,
            ha="center",
            va="center",
            bbox=dict(boxstyle="round", facecolor="#E2E8F0", edgecolor="#4A5568"),
        )
        if i > 0:
            ax.annotate(
                "",
                xy=(x_positions[i] - 0.04, 0.5),
                xytext=(x_positions[i - 1] + 0.04, 0.5),
                arrowprops=dict(arrowstyle="->", color="#4A5568"),
            )

    fig.tight_layout()
    fig.savefig(fig_path, dpi=150)
    plt.close(fig)


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
    optimizer = torch.optim.AdamW(model.parameters(), lr=args.lr)

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

    report = classification_report(
        y_true,
        y_pred,
        target_names=class_names,
        digits=4,
        zero_division=0,
    )
    print(f"\n[{name}] Classification report:\n{report}")

    cm = confusion_matrix(y_true, y_pred)
    print(f"[{name}] Confusion matrix:\n{cm}\n")

    return {
        "test_loss": test_loss,
        "accuracy": accuracy,
        "macro_f1": macro_f1,
    }


def main():
    parser = argparse.ArgumentParser(description="Simple CNN for diabetic retinopathy")
    parser.add_argument("--data-dir", type=str, default="data")
    parser.add_argument("--batch-size", type=int, default=32)
    parser.add_argument("--epochs", type=int, default=30)
    parser.add_argument("--lr", type=float, default=1e-3)
    parser.add_argument("--image-size", type=int, default=256)
    parser.add_argument("--num-workers", type=int, default=0)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    set_seed(args.seed)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    data_dir = Path(args.data_dir)
    fig_dir = Path("figure")
    results_dir = Path("results")
    fig_dir.mkdir(parents=True, exist_ok=True)
    results_dir.mkdir(parents=True, exist_ok=True)

    base_dataset = datasets.ImageFolder(data_dir)
    class_names = base_dataset.classes

    class_counts = Counter(base_dataset.targets)
    total = sum(class_counts.values())
    rows = []
    for idx, name in enumerate(class_names):
        count = class_counts.get(idx, 0)
        ratio = count / total if total > 0 else 0.0
        rows.append((name, count, ratio))

    print("Class ratios (full dataset):")
    for name, count, ratio in rows:
        print(f"  {name}: {count} ({ratio:.3f})")

    plot_class_distribution(rows, fig_dir / "class_distribution.png")

    train_idx, val_idx, test_idx = stratified_split_indices(base_dataset.targets, args.seed)
    print_split_distribution("Train", train_idx, base_dataset.targets, class_names)
    print_split_distribution("Val", val_idx, base_dataset.targets, class_names)
    print_split_distribution("Test", test_idx, base_dataset.targets, class_names)

    mean = [0.485, 0.456, 0.406]
    std = [0.229, 0.224, 0.225]

    val_transform = transforms.Compose(
        [
            transforms.Resize((args.image_size, args.image_size)),
            transforms.ToTensor(),
            transforms.Normalize(mean=mean, std=std),
        ]
    )

    plain_transform = transforms.Compose(
        [
            transforms.Resize((args.image_size, args.image_size)),
            transforms.ToTensor(),
            transforms.Normalize(mean=mean, std=std),
        ]
    )

    augmented_transform = transforms.Compose(
        [
            transforms.Resize((args.image_size, args.image_size)),
            transforms.RandomHorizontalFlip(),
            transforms.RandomVerticalFlip(),
            transforms.RandomRotation(10),
            transforms.RandomAffine(degrees=0, shear=5, scale=(0.9, 1.1)),
            transforms.ToTensor(),
            AddGaussianNoise(mean=0.0, std=0.02),
            transforms.RandomErasing(p=0.25, scale=(0.02, 0.08), ratio=(0.3, 3.3)),
            transforms.Normalize(mean=mean, std=std),
        ]
    )

    draw_cnn_architecture(fig_dir / "cnn_architecture.png", len(class_names))

    print("\nTraining baseline model (no augmentation)")
    baseline_metrics = run_experiment(
        "baseline",
        plain_transform,
        val_transform,
        data_dir,
        (train_idx, val_idx, test_idx),
        class_names,
        device,
        args,
        fig_dir,
        results_dir,
    )

    print("\nTraining augmented model")
    augmented_metrics = run_experiment(
        "augmented",
        augmented_transform,
        val_transform,
        data_dir,
        (train_idx, val_idx, test_idx),
        class_names,
        device,
        args,
        fig_dir,
        results_dir,
    )

    print("\nSummary")
    print(
        "Baseline - accuracy: {:.4f}, macro F1: {:.4f}".format(
            baseline_metrics["accuracy"], baseline_metrics["macro_f1"]
        )
    )
    print(
        "Augmented - accuracy: {:.4f}, macro F1: {:.4f}".format(
            augmented_metrics["accuracy"], augmented_metrics["macro_f1"]
        )
    )


if __name__ == "__main__":
    main()
