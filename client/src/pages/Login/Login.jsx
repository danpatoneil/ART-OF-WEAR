import "./Login.css";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { useState } from "react";
import Auth from '../../utils/auth'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login, { loading, error }] = useMutation(LOGIN_USER);

    const handleLogin = async () => {
        try {
            console.log(email)
            console.log(password)
            const { data } = await login({
                variables: { email, password },
            });
            // console.log(data.login.token)
            Auth.login(data.login.token)
            // Handle successful login
        } catch (error) {
            // Handle login error
        }
    };

    return (
        
        <div className ="register-container">
            <h1 className = "register-h1">Login</h1>
            <input className = "register-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input className = "register-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className = "button" onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button >
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default Login;
