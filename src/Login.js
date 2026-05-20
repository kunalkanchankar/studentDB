import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "role",
                res.data.role
            );

            if (res.data.role === "admin") {

                navigate("/admin");

            }
            else {

                navigate("/student");

            }

        }
        catch (err) {

            alert("Login Failed");

        }

    };

    return (

        <div className="form-container">

            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>

            <p>
                Don't have an account?

                <Link to="/register">
                    Register
                </Link>

            </p>

        </div>

    )

}

export default Login;