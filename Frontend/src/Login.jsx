import { useState, useContext } from "react";
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  
    const { setToken, setIsLoggedIn } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    // if (data.success) {
    //   localStorage.setItem("token", data.token);
    //   setToken(data.token);
    //   navigate("/");
    // } else {
    //   alert(data.error);
    // }
     if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        // Ensure you update the logged-in state here
        if(setIsLoggedIn) setIsLoggedIn(true); 
        navigate("/");
      } else {
        alert(data.error || "Login failed");
      }
    } 
  

  return (
    <div className="auth-box">
      <h2>Welcome back</h2>
      <p>Welcome back! Please enter your details.</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="forgot" onClick={() => navigate("/forgot-password")}>
        Forgot password
      </div>
      <button className="login-btn" onClick={loginUser}>Login</button>
      <button className="google-btn">
        <span className="google-icon">G</span>Sign in with Google
      </button>
      <div className="signup-link">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")}>Sign up for free</span>
      </div>
    </div>
  );
}

export default Login;
