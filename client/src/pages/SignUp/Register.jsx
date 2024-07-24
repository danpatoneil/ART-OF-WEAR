import "./Register.css";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';


const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [registerUser, { loading, error }] = useMutation(ADD_USER);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data} = await registerUser({ variables: formData });
        // console.log(data.addUser.token)
        Auth.login(data.addUser.token)
    };

    return (
        <div className="register-container">
            <h1 className = "register-h1">Register</h1>
            <form onSubmit={handleSubmit} className = "register-form">
                <input
                className = "register-input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                className = "register-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                className = "register-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button className = "button" type="submit" disabled={loading}>
                    Register
                </button>
            </form>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Register;
