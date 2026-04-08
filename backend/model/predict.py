import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from backend.utils.preprocess import preprocess_image
from backend.model.model_builder import build_deepfake_model
from backend.paths import resource_path, writable_path

LOW = 0.45
HIGH = 0.65

def load_model_safe():
    """Load model with fallback for version mismatches"""
    model_h5_path = resource_path("backend", "model", "deepfake_model.h5")
    model_keras_path = resource_path("backend", "model", "deepfake_model.keras")
    writable_model_keras_path = writable_path("backend", "model", "deepfake_model.keras")
    
    # Try loading from .keras format first (native Keras format)
    if os.path.exists(model_keras_path):
        try:
            model = tf.keras.models.load_model(model_keras_path)
            print("✓ Model loaded from .keras format")
            return model
        except Exception as e:
            print(f"⚠ Failed to load .keras model: {e}")
    
    # Try loading H5 with legacy support disabled
    if os.path.exists(model_h5_path):
        try:
            # Use compiled=False to skip layer compatibility issues
            with tf.keras.utils.custom_object_scope({}):
                model = load_model(model_h5_path, compile=False)
            # Recompile with current TensorFlow version
            model.compile(
                optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
                loss="binary_crossentropy",
                metrics=["accuracy"]
            )
            print("✓ Model loaded from H5 file")
            # Save in native Keras format for future use
            try:
                os.makedirs(os.path.dirname(writable_model_keras_path), exist_ok=True)
                model.save(writable_model_keras_path)
                print("✓ Model saved in .keras format for faster loading")
            except Exception as e:
                print(f"⚠ Could not save to .keras format: {e}")
            return model
        except Exception as e:
            print(f"⚠ Failed to load H5 model: {e}")
    
    # Fallback: rebuild model from scratch
    print("⚠ Rebuilding model from scratch...")
    try:
        model = build_deepfake_model()
        # Save in native Keras format
        os.makedirs(os.path.dirname(writable_model_keras_path), exist_ok=True)
        model.save(writable_model_keras_path)
        print("✓ Model rebuilt and saved in .keras format")
        return model
    except Exception as e:
        print(f"✗ Failed to rebuild model: {e}")
        raise

model = load_model_safe()

def predict_image(image_path):
    image = preprocess_image(image_path)
    p = float(model.predict(image)[0][0])

    # Safety clamp
    p = max(0.0, min(1.0, p))

    if p >= HIGH:
        # REAL
        confidence = p * 100
        return "REAL", round(confidence, 2)

    elif p <= LOW:
        # FAKE
        confidence = (1 - p) * 100
        return "FAKE", round(confidence, 2)

    else:
        # UNCERTAIN → confidence = closeness to 0.5
        confidence = (1 - abs(p - 0.5) / 0.15) * 100
        confidence = max(0.0, min(100.0, confidence))
        return "UNCERTAIN", round(confidence, 2)
