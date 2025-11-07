import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('users');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const collectData = async () => {
        if (!name || !email || !password) {
            setError(true);
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
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        result = await result.json();

        if (result.auth && result.user) {
            localStorage.setItem("users", JSON.stringify(result.user));
            localStorage.setItem("token", result.auth);
            navigate('/');
        } else {
            alert("Registration failed. Please try again.");
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
