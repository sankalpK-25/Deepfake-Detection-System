import os

from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

from backend.model.predict import predict_image
from backend.paths import resource_path, writable_path

FRONTEND_BUILD_DIR = resource_path("frontend", "build")
FRONTEND_ASSETS_DIR = os.path.join(FRONTEND_BUILD_DIR, "assets")

app = Flask(
    __name__,
    template_folder=FRONTEND_BUILD_DIR,
    static_folder=FRONTEND_ASSETS_DIR,
    static_url_path="/assets",
)

# Enable CORS for frontend communication
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:3000"]}})

UPLOAD_FOLDER = writable_path("uploads")
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'mp4', 'avi', 'mov'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/<path:path>")
def serve_frontend(path):
    if path.startswith("api/"):
        return jsonify({"error": "Not found"}), 404

    requested_path = os.path.join(FRONTEND_BUILD_DIR, path)
    if os.path.isfile(requested_path):
        return send_from_directory(FRONTEND_BUILD_DIR, path)

    return render_template("index.html")

@app.route("/api/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        prediction, confidence = predict_image(filepath)
        
        # Map prediction to user-friendly verdict
        verdict_map = {
            "REAL": "AUTHENTIC",
            "FAKE": "DEEPFAKE DETECTED",
            "UNCERTAIN": "INCONCLUSIVE"
        }
        
        verdict = verdict_map.get(prediction, prediction)
        is_fake = prediction == "FAKE"
        
        return jsonify({
            "verdict": verdict,
            "prediction": prediction,
            "confidence": confidence,
            "isFake": is_fake,
            "filename": filename
        })
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=False)
