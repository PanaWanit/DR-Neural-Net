from torch import nn


class SimpleCNN(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 128, kernel_size=5, padding=2),
            nn.SiLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(128, 64, kernel_size=5, padding=2),
            nn.SiLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(64, 32, kernel_size=3, padding=1),
            nn.SiLU(),
            nn.MaxPool2d(2),
        )
        self.pool = nn.AdaptiveAvgPool2d((1, 1))
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(32, num_classes),
        )

    def forward(self, x):
        x = self.features(x)
        x = self.pool(x)
        x = self.classifier(x)
        return x
