import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [auth, setAuth] = useState(!!localStorage.getItem("users"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => setAuth(!!localStorage.getItem("users"));
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem("token");
    setAuth(false);
    navigate('/login');
  };

  return (
    <div>
      <ul className='name-ul'>
        <li><Link to="/">Product</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/updateprolist">Update Product</Link></li>
        {auth && <li><Link to="/profile">Profile</Link></li>}

        {auth ? (
          <li><Link onClick={logout} to="#">Logout</Link></li>
        ) : (
          <>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Sign In</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
