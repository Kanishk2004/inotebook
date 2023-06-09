import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password}),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
        // save auth token and redirect
        localStorage.setItem('token', json.authToken);
        props.showAlert("Loggedin successfully!", "success");
        navigate("/");
    } else {
        props.showAlert("Invalid details!", "danger");
    }
 
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-5">
      <h2>Login to continue to iNotebook</h2>
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
        <Link className="btn btn-outline-primary ms-2" to="/signup" role="button">Create Account</Link>
      </form>
    </div>
  );
};

export default Login;
