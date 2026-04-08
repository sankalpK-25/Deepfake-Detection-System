from model_builder import build_deepfake_model

model = build_deepfake_model()
model.save("backend/model/deepfake_model.h5")

print("Deepfake detection model saved successfully")
