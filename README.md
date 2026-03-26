## COMP 247 — KSI Collision Prediction Project

A supervised machine learning project that predicts whether a traffic
collision in Toronto will result in a fatality, based on the Toronto
Police Service KSI dataset (2006–2023).

---

## Project Status
🟢 Phase 1 — Data Exploration (Completed)  
🟡 Phase 2 — Data Transformation & Preparation (Completed)  
🟡 Phase 3 — Modelling (In Progress)  
⚪ Phase 4 — Evaluation & Deployment (Upcoming)
---

## What Has Been Done

### 1. Data Exploration (Yaksh)
- Loaded and explored 18,957 records across 54 features
- Identified `ACCLASS` as the target variable (Fatal vs Non-Fatal)
- Analyzed missing values — 384,930 nulls across 39 columns
- Planned strategy for handling missing data (drop/impute)
- Applied chi-square feature selection to identify useful features
- Engineered new time-based features from DATE:
  - YEAR, MONTH, HOUR, DAY_OF_WEEK
- Key findings:
  - Strong class imbalance (Fatal ≈ 14%)
  - Certain locations (e.g., Yonge St) have higher collision frequency

---

### 2. Visualizations (Alex)
- Correlation heatmap for numeric features
- Class distribution plot showing imbalance
- Countplots for categorical features vs target
- Missing value heatmap to support cleaning decisions

---

### 3. Data Transformation (Yaksh & Aayan)
- Dropped columns with more than 40% missing values
- Removed unnecessary and leakage columns:
  - ACCNUM, FATAL_NO, INJURY, etc.
- Converted binary indicator columns:
  - SPEEDING, ALCOHOL, REDLIGHT, AG_DRIV -> 0/1 format
  - Missing values treated as "No"
- Imputed remaining missing values using mode (categorical)
- Cleaned target column:
  - Removed "Property Damage Only" rows
  - Removed rows with missing `ACCLASS`
- Final cleaned dataset:
  - ~18,900 rows
  - 22 selected features
  - No missing values in target

---

### 4. Feature Selection & Model Preparation (Mohammednaeem)
- Applied Chi-Square feature selection
  - Retained features with p-value < 0.05
- Created final feature set for modelling

- Defined:
  - `X` -> selected features
  - `y` -> target (`ACCLASS`)

- Handled issue with missing target values:
  - Dropped rows where `ACCLASS` was null before training

- Split dataset:
  - 80% training / 20% testing
  - Used stratified split to preserve class distribution

- Built preprocessing pipeline:
  - **SimpleImputer** → handles any remaining missing values
  - **OrdinalEncoder** → converts categorical data to numeric
  - **StandardScaler** → scales numerical features

- Combined preprocessing with model using Pipeline

- Trained model:
  - RandomForestClassifier

- Generated predictions on test data

---

## Environment Setup

**1. Clone the repo**
```bash
git clone <repo-url>
cd COMP247_TorontoCollision_ML_Project
```

**2. Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows
```

**3. Install dependencies**
```bash
pip install -r requirements.txt
```

**4. Add the dataset**
Place `KSI_Project_Dataset.csv` in the root project folder

**5. Run the notebook**
```bash
jupyter notebook KSI_Project.ipynb
```

---

## Tech Stack
- Python, Pandas, NumPy, Scikit-learn
- Matplotlib, Seaborn
- Flask (upcoming)

---

## Dataset
Toronto Police Service — KSI Open Data (2006–2023)