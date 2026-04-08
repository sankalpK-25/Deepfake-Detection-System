import cv2
import numpy as np
from tensorflow.keras.applications.xception import preprocess_input

def preprocess_image(image_path):
    """
    Takes an image path and returns a preprocessed
    image ready for Xception model.
    """

    # Read image using OpenCV
    image = cv2.imread(image_path)

    if image is None:
        raise ValueError("Could not read image")

    # Convert BGR (OpenCV) to RGB
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Resize to Xception input size
    image = cv2.resize(image, (299, 299))

    # Convert to float array
    image = np.array(image, dtype=np.float32)

    # Add batch dimension
    image = np.expand_dims(image, axis=0)

    # Normalize using Xception preprocessing
    image = preprocess_input(image)

    return image
