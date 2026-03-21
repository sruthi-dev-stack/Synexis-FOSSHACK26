#  System Architecture — VeritasData

##  Overview

VeritasData follows a modular pipeline-based architecture designed to process datasets step-by-step from ingestion to final reporting.



##  High-Level Flow

User → Upload Dataset → Processing Pipeline → Analysis → Cleaning → Scoring → Reports



##  Core Components

### 1. Frontend Layer
- HTML, CSS, JavaScript
- Handles user interaction
- Upload dataset
- Displays dashboard & results

### 2. API Layer (FastAPI)
- Receives dataset from frontend
- Routes requests to backend modules
- Returns processed results

### 3. Pipeline Engine 

File: `src/pipeline.py`

Responsible for:
- Managing workflow
- Calling all modules step-by-ste

### 4. Data Ingestion Layer
- Reads CSV, Excel, JSON
- Validates dataset format
- Checks corruption

### 5. Profiling Layer
- Exploratory Data Analysis (EDA)
- Column statistics
- Schema detection

### 6. Detection Layer
Detects:
- Missing values
- Duplicates
- Outliers
- Bias
- PII (sensitive data)

### 7. Cleaning Layer
- Handles missing values
- Removes duplicates
- Fixes formats
- Treats outliers

### 8. Scoring Layer
Calculates:
- Dataset Health Score
- Column Trust Score

### 9. Explainability Layer
- Explains issues in simple language
- Generates AI dataset story

### 10. Machine Learning Layer
- Trains models on raw & cleaned data
- Compares performance

### 11. Compliance Layer
Checks:
- GDPR
- HIPAA
- ISO standards

### 12. Output Layer
Generates:
- Clean dataset
- Reports (JSON, HTML, PDF)
- Certificate

##  Technologies Used

- Python
- FastAPI
- Pandas, NumPy
- Scikit-learn
- Matplotlib / Plotly
- SDV (Synthetic Data)

##  Design Advantages

- Modular structure
- Scalable architecture
- Beginner-friendly
- Explainable AI focused
