import numpy as np
import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model
from sklearn.metrics import classification_report, confusion_matrix

# 🔹 Load model
model = load_model("./model/deepfake_model.h5")

# 🔹 Dataset path
val_dir = "../dataset/val"

# 🔹 Image generator (same preprocessing as training)
datagen = ImageDataGenerator(rescale=1./255)

val_generator = datagen.flow_from_directory(
    val_dir,
    target_size=(299, 299),
    batch_size=32,
    class_mode='binary',
    shuffle=False
)

# 🔹 Predictions
y_pred = model.predict(val_generator)
y_pred = (y_pred > 0.5).astype(int).flatten()

# 🔹 True labels
y_true = val_generator.classes

# 🔹 Confusion Matrix
cm = confusion_matrix(y_true, y_pred)
TN, FP, FN, TP = cm.ravel()

print("\nConfusion Matrix:")
print(cm)

# 🔹 Metrics
print("\nClassification Report:")
print(classification_report(y_true, y_pred))

# 🔹 Manual Metrics
accuracy = (TP + TN) / (TP + TN + FP + FN)
precision = TP / (TP + FP) if (TP + FP) != 0 else 0
recall = TP / (TP + FN) if (TP + FN) != 0 else 0
f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) != 0 else 0

print("\nManual Metrics:")
print(f"Accuracy: {accuracy:.2f}")
print(f"Precision: {precision:.2f}")
print(f"Recall: {recall:.2f}")
print(f"F1 Score: {f1:.2f}")