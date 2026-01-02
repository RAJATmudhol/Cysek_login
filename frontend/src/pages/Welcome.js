import { useEffect, useState } from "react";
import api from "../api";

export default function Welcome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/auth/me", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  return <h2>Welcome {user?.identifier}</h2>;
}
