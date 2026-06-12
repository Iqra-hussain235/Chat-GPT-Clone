import { useState, useContext } from "react";
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Signup() {
  
    const { setToken, setIsLoggedIn } = useContext(MyContext); 
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    role: "", // student or teacher
    name: "",
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    const res = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();

    if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        if (setIsLoggedIn) setIsLoggedIn(true); // Set login state
        navigate("/api/chat");
      } else {
        alert(data.error || "Signup failed.");
      }
    } 

  return (
    <div className="auth-box">
      <h2>Create your account</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="">Role</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button className="login-btn" onClick={signupUser}>Sign Up</button>
      <div className="signup-link">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </div>
    </div>
  );
}

export default Signup;
