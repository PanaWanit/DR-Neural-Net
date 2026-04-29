import csv

import matplotlib.pyplot as plt
import numpy as np


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
