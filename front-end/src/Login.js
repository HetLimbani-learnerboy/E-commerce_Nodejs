import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('users');
        if (auth) {
            navigate('/');
        }
    }, []);

    const handlelogin = async () => {
        // let result = await fetch("http://localhost:5400/login", {
        let result = await fetch("https://e-commerce-nodejs-lk6n.onrender.com/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': "application/json"
            }
        });

        result = await result.json();

        if (result.auth) {
            localStorage.setItem("users", JSON.stringify(result.user));
            localStorage.setItem("token", result.auth); 
            navigate('/'); 
        } else {
            alert("Please check your information");
        }
    };

    return (
        <div className='content'>
            <h1>Login Page</h1>
            <input
                className="Inputbox"
                name='email'
                type="text"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                className="Inputbox"
                name='password'
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={handlelogin} className="submitbutton" type="submit">Login</button>
        </div>
    );
};

export default Login;