## COMP 247 - KSI Collision Prediction Project

A supervised machine learning project that predicts whether a traffic 
collision in Toronto will result in a fatality, based on the Toronto 
Police Service KSI dataset (2006–2020).

---

## Project Status
🟡 Phase 1 — Data Exploration (Completed)


---

## What Has Been Done
1.  Loaded and explored 18,957 records across 54 features
- Identified `ACCLASS` as the binary target (Fatal=1, Non-Fatal=0)
- Full missing value analysis — 384,930 nulls across 39 columns
- Established drop/impute/encode strategy for all affected columns
- Identified key insights: Yonge St highest collision frequency, 
  significant class imbalance (Fatal = 14.1% only)

---
2. Visulizations using seaborn 
- seaborn corr heatmap for numerics
- Visualizing the imbalanced classes
- visualizing essential features wiht the target column
- Getting insight about columns need to be dropped


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
```

