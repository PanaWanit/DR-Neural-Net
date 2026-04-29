# Diabetic Retinopathy Classification (Simple CNN)

This project trains a small CNN for 5-class diabetic retinopathy classification using PyTorch.

## Data layout

The dataset is expected in an ImageFolder-style directory:

```
data/
  Mild/
  Moderate/
  No_DR/
  Proliferate_DR/
  Severe/
```

## Setup (uv)

Install dependencies:

```
uv sync
```

## Run experiments

Run the default experiment (CPU only):

```
uv run python train.py --data-dir data
```

Common options:

```
uv run python train.py \
  --data-dir data \
  --epochs 10 \
  --batch-size 32 \
  --image-size 128 \
  --lr 0.001 \
  --seed 42
```

## What the script does

- Locks random seed for reproducibility.
- Performs a stratified split: train/val/test = 70/10/20.
- Trains two models:
  - Baseline: resize + normalization.
  - Augmented: flips, rotation, affine, Gaussian noise, random erasing.
- Logs train/val loss per epoch for overfitting analysis.
- Evaluates on the test split using accuracy and macro F1.
- Prints class ratios for the full dataset and each split.
- Draws a small CNN architecture diagram.

## Outputs

All experiment images are saved under the figure folder:

- figure/class_distribution.png
- figure/baseline_loss_curve.png
- figure/augmented_loss_curve.png
- figure/cnn_architecture.png

Loss histories are saved as CSV:

- results/baseline_losses.csv
- results/augmented_losses.csv

## Notes

- CPU-only by default (no MPS / Metal use).
- Use --image-size 96 if you need faster runs on a Mac with limited RAM.
- Class imbalance is reported in the console and in figure/class_distribution.png.
