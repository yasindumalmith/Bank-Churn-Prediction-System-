from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    # In the future, POST request logic goes here
    return render_template('predict.html')

if __name__ == '__main__':
    app.run(debug=True)
