import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem("users");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
 
  };

  return (
    <div>
      <ul className='name-ul'>
        <li><Link to="/">Product</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/updateprolist">Update Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        {
          auth?<li><Link onClick={logout} to='/signup'>Logout</Link></li>:<> 
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/login'>Sign In</Link></li></>
        }
      </ul>
    </div>
  );
};

export default Nav;

// JSON.parse(auth).name --It is print the author or name in the navigation bar.
//<> and </> It is known as segmental

/* Explaination:
--Link Component Usage: The Link component from react-router-dom is used to create navigation links that do not cause full page reloads. This enables a smooth, single-page application (SPA) experience by updating the browser's history and URL without reloading the page.
*/