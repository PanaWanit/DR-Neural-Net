from collections import Counter

import numpy as np
from sklearn.model_selection import StratifiedShuffleSplit


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
