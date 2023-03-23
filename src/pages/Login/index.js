import React, { useEffect, useState } from "react";
import { ENDPOINT } from "../../constants";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [groupName, setGroupName] = useState(null);
  const [passkey, setPassKey] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("team_id") && localStorage.getItem("passkey")) {
      navigate("/dashboard");
    }
  }, []);

  const onSubmit = async () => {
    try {
      const res = await fetch(ENDPOINT + "/team/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team_id: groupName, passkey }),
      }).then((r) => r.json());
      if (res.message == "success") {
        localStorage.setItem("team_id", groupName);
        localStorage.setItem("passkey", passkey);
        navigate("/dashboard");
        return;
      }
      //failed
      toast.error(res.message, { autoClose: 4000 });
    } catch (error) {
      toast.error("Something went wrong :(", { autoClose: 4000 });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
      className="main"
    >
      <div className="login-form p-4 bg-yellow-900">
        <div>
          <input
            type={"text"}
            placeholder="Group ID"
            onChange={(e) => setGroupName(e.target.value)}
            
          />
        </div>
        <div>
          <input
            type={"password"}
            placeholder="Pass key"
            onChange={(e) => setPassKey(e.target.value)}
          />
        </div>
        <button onClick={onSubmit} className="bg-red-900 text-white">Start!</button>
      </div>
    </div>
  );
};

export default Login;
