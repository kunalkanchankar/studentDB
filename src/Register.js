import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: "",
        email: "",
        password: "",
        role: "student"

    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/register",
                form
            );

            alert("Registration Successful");

            navigate("/");

        }
        catch (err) {

            alert("Registration Failed");

            console.log(err);

        }

    };

    return (

        <div className="form-container">

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <select
                    name="role"
                    onChange={handleChange}
                >

                    <option value="student">
                        Student
                    </option>

                    <option value="admin">
                        Teacher/Admin
                    </option>

                </select>

                <button type="submit">

                    Register

                </button>

            </form>

            <p>

                Already have account?

                <Link to="/">
                    Login
                </Link>

            </p>

        </div>

    )

}

export default Register;