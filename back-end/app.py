import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
import pickle 
from flask import Flask, request, jsonify
from pymongo import MongoClient 
from urllib.parse import quote_plus
username = quote_plus("nithish")
password = quote_plus("Spike@23")

connection_string = f"mongodb+srv://{username}:{password}@patient-data.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"

client = MongoClient(connection_string)
mydatabase = client["dummy_data"] 
# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for all routes, allowing requests from any origin
CORS(app,resources={r"/*":{"origins":"*"}})

model = pickle.load(open('model.pkl', 'rb'))

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)
# Define a route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    
    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])
        # for i in query_df.columns:
        #     query_df[i].astype(int)
            #print(query_df[i][0],'-')
        prediction = model.predict(query_df)
        return jsonify({'Prediction': str(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)})
@app.route("/signup",methods=['POST'])
def signup():
    try:
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        collection = mydatabase["school"]
        if collection.find_one({"username": username}):
         return jsonify({"exists": True})
        else:
         print(username,password,collection.find_one({"username": username}))
         collection.insert_one({"username": username, "email": email, "password": password})
         return jsonify({"exists": False})

    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route("/check_user",methods=['POST'])
def check_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    collection = mydatabase["school"]
    user = collection.find_one({"username": username, "password": password})
    print(username,password,user)
    if user:
        return jsonify({"exists": True})
    else:
        return jsonify({"exists": False})
    
@app.route("/patient_data",methods=['POST'])
def patient_data():
    data = request.json
    username = data.get("username") 
    collection = mydatabase["school"]
    
    print(collection.update_one({"username":username},{"$push": {"patient_data": data}}))
    return jsonify({"message": "Patient data inserted successfully"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)