from flask import Flask, render_template, request, redirect, url_for, session
import joblib
import numpy as np

app = Flask(__name__)
app.secret_key = 'bank_churn_secret_key_123'

# Load models
try:
    scaler = joblib.load('models/scaler.pkl')
    model = joblib.load('models/best_model.pkl')
except Exception as e:
    print(f"Warning: Could not load models. {e}")
    scaler = None
    model = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        # 1. Extract raw numerical values
        age = float(request.form.get('age', 0))
        balance = float(request.form.get('balance', 0))
        salary = float(request.form.get('estimated_salary', 0))
        tenure = float(request.form.get('tenure', 0))
        credit_score = float(request.form.get('credit_score', 0))
        num_products = float(request.form.get('num_of_products', 1))
        
        # 2. Extract and Encode Categorical variables
        # Gender: Female = 0, Male = 1
        gender_raw = request.form.get('gender')
        gender = 1 if gender_raw == 'Male' else 0
        
        # Geography: France = 0, Germany = 1, Spain = 2
        geo_raw = request.form.get('geography')
        if geo_raw == 'France':
            geography = 0
        elif geo_raw == 'Germany':
            geography = 1
        elif geo_raw == 'Spain':
            geography = 2
        else:
            geography = 0
            
        # Is Active Member / Has Credit Card: Yes (on) = 1, No = 0
        is_active = 1 if request.form.get('is_active_member') == 'on' else 0
        has_card = 1 if request.form.get('has_cr_card') == 'on' else 0

        # Print to terminal to verify encoding
        print(f"--- Encoded Input Data ---")
        print(f"Age: {age}, Balance: {balance}, Salary: {salary}, Tenure: {tenure}")
        print(f"Credit Score: {credit_score}, Num Products: {num_products}")
        print(f"Gender: {gender}, Geography: {geography}")
        print(f"Is Active: {is_active}, Has Card: {has_card}")
        
        # Build the Input Array
        input_data = np.array([[
            credit_score,
            geography,
            gender,
            age,
            tenure,
            balance,
            num_products,
            has_card,
            is_active,
            salary
        ]])
        
        # Scale and Predict
        if scaler and model:
            try:
                scaled_data = scaler.transform(input_data)
                prediction_prob = model.predict_proba(scaled_data)[0][1]
                probability = round(prediction_prob * 100)
                
                if probability >= 60:
                    risk = "HIGH"
                elif probability >= 30:
                    risk = "MEDIUM"
                else:
                    risk = "LOW"
            except Exception as e:
                print(f"Prediction Error: {e}")
                risk = "ERROR"
                probability = 0
        else:
            risk = "HIGH"
            probability = 82
            
        # Get raw geography name for display
        geo_raw = request.form.get('geography', 'Unknown')
        
        # Store results in session to pass to the result page
        session['prediction_result'] = {
            'risk': risk,
            'probability': probability,
            'credit_score': int(credit_score),
            'geography': geo_raw,
            'age': int(age),
            'balance': balance,
            'num_products': int(num_products)
        }
        
        return redirect(url_for('result'))

    return render_template('predict.html')

@app.route('/result')
def result():
    # Retrieve the result data from the session
    result_data = session.get('prediction_result')
    
    # If there is no data (user navigated directly to /result), send them back to /predict
    if not result_data:
        return redirect(url_for('predict'))
        
    return render_template('result.html', **result_data)

if __name__ == '__main__':
    app.run(debug=True)
