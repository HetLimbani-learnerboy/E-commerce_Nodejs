import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false); // State to track validation errors
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('users');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const collectData = async () => {
        if (!name || !email || !password) {
            setError(true); // Set error to true if any field is empty
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        let result = await fetch("http://localhost:5400/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-type': "application/json"
            }
        });
        result = await result.json();
        localStorage.setItem("users", JSON.stringify(result.result)); // Corrected spelling
        localStorage.setItem("token", result.auth); // Corrected spelling
        if (result) {
            navigate('/');
        }
    };

    return (
        <div className="content">
            <h2>Register</h2>
            <input
                className="Inputbox"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Username"
            />
            {error && !name && <span className="invalid-input">Please enter a valid username</span>}

            <input
                className="Inputbox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter your email"
            />
            {error && !email && <span className="invalid-input">Please enter a valid email</span>}

            <input
                className="Inputbox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
            />
            {error && !password && <span className="invalid-input">Please enter a valid password</span>}

            <button className="submitbutton" type="submit" onClick={collectData}>Signup</button>
        </div>
    );
};

export default Signup;