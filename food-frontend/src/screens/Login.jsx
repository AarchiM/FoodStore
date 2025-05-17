import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgpng from "../assets/bgpng2.png";

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/userlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert("Please Enter Valid Credentials...");
        setCredentials({ email: "", password: "" });
      } else {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", data.authToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to parse response:", error);
      alert("Server error or invalid JSON response.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="p-2 flex flex-row space-y-6 items-center w-full h-[79vh] justify-center">
      <div>
        <img src={bgpng} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-2/5 flex space-y-6 flex-col shadow p-8"
      >
        <h1 className="font-bold text-center">Login</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            className="w-full p-1 bg-transparent border-b focus:outline-none border-primary"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="w-full p-1 bg-transparent border-b focus:outline-none border-primary"
          />
        </div>
        <button className="flex justify-center bg-primary text-white px-2 py-1 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
