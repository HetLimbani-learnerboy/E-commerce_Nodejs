import React, { useEffect, useState } from "react";

const Profilepage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const storedUser = localStorage.getItem("users");
            const token = localStorage.getItem("token");

            if (!storedUser || !token) {
                setError("No user session found. Please log in first.");
                return;
            }

            let userData;
            try {
                userData = JSON.parse(storedUser);
            } catch (err) {
                console.error("❌ Error parsing user data:", err);
                setError("Corrupted user data. Please log in again.");
                localStorage.removeItem("users");
                localStorage.removeItem("token");
                return;
            }

            if (!userData._id) {
                setError("User ID missing. Please log in again.");
                return;
            }

            try {
                const result = await fetch(`http://localhost:5400/profile?id=${userData._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (result.ok) {
                    const user = await result.json();
                    if (user?.name && user?.email) {
                        setName(user.name);
                        setEmail(user.email);
                    } else {
                        setError("Invalid user data received.");
                    }
                } else {
                    setError(`Failed to fetch profile: ${result.statusText}`);
                }
            } catch (networkErr) {
                console.error("Network error:", networkErr);
                setError("Network error while fetching profile.");
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="profile-content">
            <h1>Profile Page</h1>

            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : name && email ? (
                <div>
                    <p><strong>Username:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Profilepage;
