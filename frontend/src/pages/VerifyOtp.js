import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const verify = async () => {
    try {
      const res = await api.post("/auth/verify-otp", {
        user: localStorage.getItem("user"),
        otp,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/welcome");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div  className="container">
      <h2 className="title">Verify OTP</h2>
      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verify} className="button">Verify</button>
    </div>
  );
}
