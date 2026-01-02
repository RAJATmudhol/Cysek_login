import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./style.css"
export default function Login() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await api.post("/auth/request-otp", { user });
      localStorage.setItem("user", user);
      navigate("/verify");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
       <div className="container">
      <h2 className="title">Login</h2>
      <input
        placeholder="Email or Phone"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="input"
      />
      <button onClick={submit} className="button">
        Send OTP
      </button>
    </div>
  );
}
