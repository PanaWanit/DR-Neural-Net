import argparse
from collections import Counter
from pathlib import Path

import torch
from torchvision import datasets, transforms

from dr_cnn.augmentations import AddGaussianNoise
from dr_cnn.experiment import run_experiment
from dr_cnn.plotting import draw_cnn_architecture, plot_class_distribution
from dr_cnn.seed import set_seed
from dr_cnn.splits import print_split_distribution, stratified_split_indices


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
    device = torch.device("cpu")

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
