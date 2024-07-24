import "./Register.css";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutations";

import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser({ variables: formData });
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit" disabled={loading}>
                    Register
                </button>
            </form>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Register;