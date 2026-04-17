from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load preprocessing pipeline
preprocessing_pipeline = joblib.load(r"C:\Users\yaksh\OneDrive\Desktop\COMP247_Toronto_collison_Project\pipeline\pipeline.pkl")

# Load models
models = {
    "svm": joblib.load(r"C:\Users\yaksh\OneDrive\Desktop\COMP247_Toronto_collison_Project\model\svm_model.pkl"),
    "decision_tree": joblib.load(r"C:\Users\yaksh\OneDrive\Desktop\COMP247_Toronto_collison_Project\model\decision_tree_alex.pkl"),
#      "neural_network": joblib.load(r"C:\Users\yaksh\OneDrive\Desktop\COMP247_Toronto_collison_Project\models\neural_network_ksi_model.pkl"),
#    "random_forest": joblib.load(r"C:\Users\yaksh\OneDrive\Desktop\COMP247_Toronto_collison_Project\models\random_forest_ksi_model.pkl")
}

#22 features
FEATURES = [
    'VEHTYPE', 'INITDIR', 'AUTOMOBILE', 'ACCLOC', 'HOOD_140', 'ROAD_CLASS',
    'IMPACTYPE', 'DISTRICT', 'INVTYPE', 'RDSFCOND', 'INVAGE', 'VISIBILITY',
    'DIVISION', 'LIGHT', 'TRAFFCTL', 'YEAR', 'MONTH', 'HOUR', 'DAY_OF_WEEK',
    'SPEEDING', 'ALCOHOL', 'AG_DRIV'
]


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


#List models
@app.route("/models", methods=["GET"])
def list_models():
    return jsonify({"models": list(models.keys())})


# Predict endpoint
@app.route("/models/<model_name>/predict", methods=["POST"])
def predict(model_name):

  
    if model_name not in models:
        return jsonify({"error": "Model not found"}), 400

    data = request.get_json()

   
    if not data or "features" not in data:
        return jsonify({"error": "Missing features"}), 400

    input_features = data["features"]

   
    if set(input_features.keys()) != set(FEATURES):
        return jsonify({"error": "Feature mismatch"}), 400

    try:
        
        df = pd.DataFrame([input_features])

       
        df = df[FEATURES]

       
        X_processed = preprocessing_pipeline.transform(df)

      
        model = models[model_name]

       
        prediction = model.predict(X_processed)[0]

        
        confidence = None
        if hasattr(model, "predict_proba"):
            confidence = float(model.predict_proba(X_processed)[0][1])

        return jsonify({
            "model": model_name,
            "prediction": int(prediction),
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)