# COMP 247 — KSI Collision Prediction Project

> Predict whether a Toronto traffic collision will result in a **fatal or non-fatal** outcome using supervised machine learning, served through a Flask REST API and a Next.js web frontend.

---

## Project Status

| Phase | Description | Status |
|---|---|---|
| 1 | Data Exploration | ✅ Complete |
| 2 | Data Transformation & Preparation | ✅ Complete |
| 3 | Modelling (4 ML models) | ✅ Complete |
| 4 | Flask REST API | ✅ Complete |
| 5 | Next.js Frontend | ✅ Complete |

---

## Model Results

| Model | Accuracy | F1 Score | Notes |
|---|---|---|---|
| **Random Forest** | **88.75%** | 0.87 | Best model — tuned with GridSearchCV |
| Decision Tree | 82.92% | 0.45 | Interpretable, fast inference |
| SVM (RBF Kernel) | AUC 83.6% | — | Accuracy output not saved in notebook |
| Neural Network (MLP) | — | — | Output not saved in notebook |

All models trained on Toronto Police KSI dataset (2006–2024), 22 features, with SMOTE class balancing.

---

## Project Structure

```
COMP247_Toronto_collison_Project/
├── api/
│   └── app.py                  # Flask REST API
├── frontend/                   # Next.js web app
│   ├── app/
│   │   ├── page.js             # Landing / home page
│   │   ├── predict/page.js     # 5-step prediction form
│   │   ├── history/page.js     # Past predictions
│   │   └── models/page.js      # Model info & accuracies
│   ├── components/             # Reusable UI components
│   └── lib/                    # API client & constants
├── model/                      # Trained .pkl model files
├── pipeline/                   # Preprocessing pipeline .pkl
├── data/
│   └── KSI_Project Dataset.csv
├── KSI_project.ipynb           # Full ML notebook
└── requirements.txt
```

---

## How to Run

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm

---

### 1. Clone the repository

```bash
git clone <repo-url>
cd COMP247_Toronto_collison_Project
```

---

### 2. Set up the Python environment

```bash
# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate
```

```bash
# Install Python dependencies
pip install -r requirements.txt
```

---

### 3. Start the Flask API

```bash
python api/app.py
```

The API will start at **http://localhost:5000**

Verify it is running:
```bash
curl http://localhost:5000/health
# → {"status": "ok"}
```

Available endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | API health check |
| GET | `/models` | List loaded models |
| POST | `/models/<model_name>/predict` | Run a prediction |

**Predict request body:**
```json
{
  "features": {
    "VEHTYPE": "Automobile",
    "INITDIR": "N",
    "AUTOMOBILE": 1,
    "ACCLOC": "At Intersection",
    "HOOD_140": 70,
    "ROAD_CLASS": "Major Arterial",
    "IMPACTYPE": "Angle",
    "DISTRICT": "Toronto and East York",
    "INVTYPE": "Driver",
    "RDSFCOND": "Dry",
    "INVAGE": 35,
    "VISIBILITY": "Clear",
    "DIVISION": "D51",
    "LIGHT": "Daylight",
    "TRAFFCTL": "Traffic Signal",
    "YEAR": 2024,
    "MONTH": 6,
    "HOUR": 14,
    "DAY_OF_WEEK": 4,
    "SPEEDING": 0,
    "ALCOHOL": 0,
    "AG_DRIV": 0
  }
}
```

**Response:**
```json
{
  "success": true,
  "model": "decision_tree",
  "prediction": 0,
  "confidence": 0.21
}
```
`prediction: 1` = Fatal (KSI), `prediction: 0` = Non-Fatal

---

### 4. Start the Next.js frontend

Open a **new terminal** (keep the Flask API running):

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:3000**

---

### Running both together (summary)

```
Terminal 1:  python api/app.py          → http://localhost:5000
Terminal 2:  cd frontend && npm run dev  → http://localhost:3000
```

---

## Frontend Pages

| Route | Description |
|---|---|
| `/` | Landing page — overview and quick start |
| `/predict` | 5-step form to enter all 22 features and get a prediction |
| `/history` | View and delete past predictions (stored locally) |
| `/models` | Model cards with accuracies from the notebook |

---

## Tech Stack

| Layer | Technology |
|---|---|
| ML & Data | Python, Scikit-learn, Pandas, NumPy, imbalanced-learn (SMOTE) |
| Visualisation | Matplotlib, Seaborn |
| API | Flask, Flask-CORS |
| Frontend | Next.js 15 (JavaScript), Tailwind CSS, Lucide Icons |
| Model Storage | joblib `.pkl` files |

---

## Dataset

**Toronto Police Service — KSI Open Data**  
18,957 collision records · 54 raw features · 2006–2024  
Target variable: `ACCLASS` (Fatal / Non-Fatal)  
Final model input: 22 selected features after chi-square selection and cleaning
