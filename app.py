from flask import Flask, render_template, request

app = Flask(__name__)

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
        print(f"Gender: {gender}, Geography: {geography}")
        print(f"Is Active: {is_active}, Has Card: {has_card}")
        
        # We will connect the scaler and model here later
        
        return render_template('result.html', risk="HIGH", probability=82)

    return render_template('predict.html')

if __name__ == '__main__':
    app.run(debug=True)
