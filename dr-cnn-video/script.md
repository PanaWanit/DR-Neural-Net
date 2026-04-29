# Remotion Video Script: Diabetic Retinopathy CNN (MBB Style)

**Total Duration**: ~10:00 (18,000 frames at 30 FPS)
**Style**: Minimalist, Zen design, MBB Pyramid Principle, Action Titles. No raw architecture PNGs—use coded visual diagrams.

---

### 0. Title Cover (0:00 - 0:15)
* **Action Title:** Diabetic Retinopathy Classification using Convolutional Neural Networks
* **Visuals:** Clean, centered typography. A subtle, slow-panning medical background or minimalist animated grid.
* **Key Talking Points:** Title, Author, and Course Information.

### 1. Executive Summary (0:15 - 1:15)
* **Action Title:** A Convolutional Neural Network successfully classifies Diabetic Retinopathy into 5 severity stages, enabling scalable diagnostics.
* **Visuals:** A coded, high-level pipeline diagram built with Remotion components (Input Fundus Image $\rightarrow$ SimpleCNN $\rightarrow$ 5-Stage Prediction). 
* **Key Talking Points:** State the problem, methodology (CNN), and final result ([X]% accuracy, High F1) immediately.

### 2. Situation & Complication (1:15 - 2:45)
* **Action Title:** Manual grading of Diabetic Retinopathy is time-intensive and highly subjective across the 5 progression stages.
* **Visuals:** A structured grid showing the 5 classes (0 to 4) using `dr-stages-img`, overlaid with class distribution bar charts.
* **Key Talking Points:** Explain the disease, Kaggle dataset bottleneck, and the severe class imbalance (Class 0 dominates).

### 3. Methodology: Why CNNs? (2:45 - 4:45)
* **Action Title:** Convolutional layers efficiently extract spatial hierarchies, identifying critical microaneurysms that standard networks miss.
* **Visuals:** An animated diagram showing a $3 \times 3$ kernel sliding over a matrix, highlighting parameter sharing and feature extraction.
* **Key Talking Points:** Explain CNN theory. Focus on why convolutions are superior to flattened dense layers for spatial data.

### 4. Technical Architecture & Preprocessing (4:45 - 6:45)
* **Action Title:** Robust data augmentation and a deep architecture mitigate the risk of overfitting on imbalanced medical data.
* **Visuals:** 
  - Left: Original vs. Augmented Image (`AddGaussianNoise`).
  - Right: Coded block diagram of the architecture (`Conv2d` $\rightarrow$ `SiLU` $\rightarrow$ `MaxPool2d`).
* **Key Talking Points:** Detail preprocessing and why Max Pooling reduces dimensionality and enforces translation invariance.

### 5. Multi-Class Classification Mechanics (6:45 - 8:15)
* **Action Title:** Softmax activation transforms raw network outputs into a definitive probability distribution across the 5 DR classes.
* **Visuals:** A dynamic bar chart showing the 32-dimensional dense vector collapsing into the 5 output probabilities.
* **Key Talking Points:** Explain the mathematical shift from feature extraction to classification via the Dense layers and Categorical Cross-Entropy loss.

### 6. Results & Risk Evaluation (8:15 - 9:30)
* **Action Title:** The model effectively minimizes high-risk diagnostic errors between severe and healthy cases.
* **Visuals:** Side-by-side coded animations of the Training vs. Validation Loss curves. 
* **Key Talking Points:** Frame results through a risk management lens. Discuss how augmentation stabilized the validation loss.

### 7. Strategic Implementation (9:30 - 10:00)
* **Action Title:** Algorithmic screening serves as a highly effective triage tool, optimizing resource allocation for medical professionals.
* **Visuals:** A clean, bulleted list of 3 concise next steps or clinical applications.
* **Key Talking Points:** Conclude with the real-world impact as an automated triage system.
