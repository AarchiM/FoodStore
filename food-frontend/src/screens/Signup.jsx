import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const data = await response.json();

    if (!data.success) {
      alert("Please Enter Valid Credentials...");
    }
    // else {
    //   setCredentials({ name: "", email: "", password: "", location: "" });
    // }

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
      } else {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", data.authToken);
        setCredentials({ name: "", email: "", password: "", location: "" });
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
    <div className="p-2 flex space-y-6 flex-col items-center w-full h-[79vh] justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-3/5 flex space-y-6 flex-col shadow p-8"
      >
        <h1 className="font-bold text-center">Sign Up</h1>
        <div className="flex flex-col">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            className="w-full p-1 bg-transparent border-b focus:outline-none border-primary"
          />
        </div>
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
        <div className="flex flex-col">
          <label htmlFor="location">Location </label>
          <input
            type="text"
            id="location"
            name="location"
            value={credentials.location}
            onChange={onChange}
            className="w-full p-1 bg-transparent border-b focus:outline-none border-primary"
          />
        </div>
        <button className="flex justify-center bg-primary text-white px-2 py-1 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
