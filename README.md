## COMP 247 — KSI Collision Prediction Project

A supervised machine learning project that predicts whether a traffic
collision in Toronto will result in a fatality, based on the Toronto
Police Service KSI dataset (2006–2023).

---

## Project Status
🟡 Phase 1 — Data Exploration (Completed)
🟡 Phase 2 — Data Transformation (In Progress)
⚪ Phase 3 — Modelling & Deployment (Upcoming)

---

## What Has Been Done

### 1. Data Exploration (Yaksh)
- Loaded and explored 18,957 records across 54 features
- Identified `ACCLASS` as the binary target (Fatal=1, Non-Fatal=0)
- Full missing value analysis — 384,930 nulls across 39 columns
- Established drop/impute/encode strategy for all affected columns
- Applied chi-square feature selection — retained 22 significant features
- Engineered date features: YEAR, MONTH, HOUR, DAY_OF_WEEK from DATE column
- Identified key insights: Yonge St highest collision frequency,
  class imbalance (Fatal = 14.1% only)

### 2. Visualizations (Alex)
- Seaborn correlation heatmap for numeric features
- Class distribution plot highlighting target imbalance
- Countplots for key categorical features vs target column
- Missing value heatmap to support drop decisions

### 3. Data Transformation (Yaksh & Aayan)
- Dropped all columns exceeding 40% missing value threshold
- Dropped identifier and leaky columns (ACCNUM, FATAL_NO, INJURY etc.)
- Handled binary flag columns — SPEEDING, ALCOHOL, REDLIGHT, AG_DRIV
  converted to 0/1 indicators (missing = No)
- Aayan handled imputation of remaining low-missing columns using mode
- Encoded all categorical columns using OrdinalEncoder
- Cleaned target column — removed Property Damage Only rows and
  single missing ACCLASS row
- Final dataset shape: 18,938 rows x 22 features, zero nulls remaining

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