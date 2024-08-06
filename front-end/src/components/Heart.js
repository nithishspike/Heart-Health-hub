import React,{useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/HeartMed.css";
import HeartMed_image from "../images/Heart_Med-removebg-preview.png"
const HeartMed = () => {
  const [isLoading, setIsloading] = useState(false);
  const location = useLocation();
  const [username, setUsername] = useState('');
  // State to manage form data
  useEffect(() => {
    if (location.state && location.state.username) {
      setUsername(location.state.username);
    }
  }, [location]);
  const [formData, setFormData] = useState({
    name:"",
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang:"",
    oldpeak: "",
    slope: "",
    ca:"",
    thal:""
  });
  // State to manage prediction result
  const [result, setResult] = useState("");
  // State to manage displaying result
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let inputData = { ...formData };
    inputData[name] = value;
    setFormData(inputData);
  };
  const handleSaveData = () => {
    const url = "http://localhost:5000/patient_data";
    setIsloading(true);
    console.log(formData);
    const jsonData = JSON.stringify({...formData,username});
    // Fetch request to the Flask backend
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setResult(response.message);
        setIsloading(false);
        setShowSpan(true);
      });
  };
  // Function to handle the 'Predict Selling Price' button click
  const handlePredictClick = () => {
    const url = "http://localhost:5000/predict";
    setIsloading(true);
    console.log(formData);
    const jsonData = JSON.stringify(formData);
    // Fetch request to the Flask backend
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setResult("The Patient have a "+response.Prediction);
        setIsloading(false);
        setShowSpan(true);
      });
  };
  
  return (
    <div className="container">
      <div className="sidebar">
        <h2>Dash Board</h2>
        <ul>
          <li><a href="home.html">Report</a></li>
          <li><a href="#">Patient checkup</a></li>
          <li><a href="Severity analysis.html">Severity analysis</a></li>
          <li><a href="#">BMI calculator</a></li>
          <li><a href="feedback.html">Feedback</a></li>
          <li><a href="#">Support</a></li>
        </ul>
      </div>
      <div className="main">
        <div className="header">
          <img src={HeartMed_image} alt="Heart Med Logo" />
          <div className="user-info">
            <i className="fa fa-user"></i>
          </div>
        </div>
        <div className="form-container">
          <h3> Please provide Patient details:</h3>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} min="1" max="100" required />
          </div>
          <div className="input-group">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="1" max="100" required />
          </div>
          <div className="input-group">
            <label htmlFor="sex">Sex:</label>
               <select id="sex" name="sex" value={formData.sex} onChange={handleChange} required>
                <option value="">Select Sex</option> {/* Added default option */}
                <option value="1">Male</option>
                <option value="0">Female</option>
               </select>
          </div>
          <div className="input-group">
            <label htmlFor="fasting_blood_sugar">Fasting blood sugar:</label>
            <input type="number" id="fbs" value={formData.fbs} onChange={handleChange} name="fbs" />
          </div>
          <div className="input-group">
            <label htmlFor="slope">Slope:</label>
            <input type="number" id="slope" name="slope" value={formData.slope} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="resting_electrocardiograph">Resting electrocardiograph:</label>
            <input type="number" id="restecg" name="restecg"  value={formData.restecg} onChange={handleChange}  />
          </div>
          <div className="input-group">
            <label htmlFor="ca">Ca:</label>
            <input type="number" id="ca" name="ca" value={formData.ca} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="chest_pain">Chest pain:</label>
            <input type="number" id="cp" name="cp" value={formData.cp} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="the_person_s_maximum_heart_rate">The person's maximum heart rate:</label>
            <input type="number" id="thalach" name="thalach" value={formData.thalach} onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="thalassemia">Thalassemia:</label>
            <input type="number" id="thal" name="thal" onChange={handleChange} value={formData.thal}/>
          </div>
          <div className="input-group">
            <label htmlFor="trestbps">Trestbps:</label>
            <input type="number" id="trestbps" name="trestbps" value={formData.trestbps} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="exercise_induced_angina">Exercise induced angina:</label>
            <input type="number" id="exang" name="exang" value={formData.exang} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="cholesterol">Cholesterol:</label>
            <input type="number" id="chol" name="chol" value={formData.chol} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="oldpeak">Old peak:</label>
            <input type="number" id="oldpeak" name="oldpeak" value={formData.oldpeak} onChange={handleChange} />
          </div>
          <div className="form-group mt-3">
              <button
                className="btn btn-primary form-control"
                disabled={isLoading}
                onClick={!isLoading ? handlePredictClick : null}
              >
                Predict 
              </button> 
              <button
                className="btn btn-primary form-control" 
                disabled={isLoading}
                onClick={!isLoading ? handleSaveData : null}
              >
                Save Patient data
              </button>
            </div>
          <br />
          <div className="text-center">
            <h4>
              {showSpan && (
                <span id="prediction">
                  {result && Object.keys(result).length !== 0 ? (
                    <p>{result} </p>
                  ) : (
                    <p>Please fill out each field in the form completely</p>
                  )}
                </span>
              )}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeartMed;
