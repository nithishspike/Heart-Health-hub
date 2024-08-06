
import './App.css';
import HeartMed from "./components/Heart"
import Login from "./components/Login"
import SignUp from "./components/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/> 
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Heart" element={<HeartMed />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
