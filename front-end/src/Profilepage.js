import React, { useEffect, useState } from "react";

const Profilepage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const userData = JSON.parse(localStorage.getItem("users"));
            if (userData && userData._id) {
                let result = await fetch(`http://localhost:5400/profile?id=${userData._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (result.ok) {
                    let user = await result.json();
                    if (user && user.name && user.email) {
                        setName(user.name);
                        setEmail(user.email);
                    }
                } else {
                    console.error("Failed to fetch profile:", result.status, result.statusText);
                }
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="profile-content">
            <h1>Profile Page</h1>
            {name && email ? (
                <div>
                    <p><strong>Username:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                </div>
            ) : (
                <p>No user data available. Please log in.</p>
            )}
        </div>
    );
};

export default Profilepage;