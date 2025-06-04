import './App.css';
import Nav from './Navi';
import Footer from './Footerin';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Signup from './Signup';
import Privatecomponent from './privatecomponent';
import Login from './Login'
import AddProducts from './Addproducts';
import Productlist from './Productlist';
import Updateproduct from './Updateproduct';
import Updateprolist from './Updateprolist';
import Profilepage from './Profilepage';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<Privatecomponent />}>
          <Route path="/" element={<Productlist/>} />
          <Route path="/add" element={<AddProducts/>} />
          <Route path="/update/:id" element={<Updateproduct/>} />
          <Route path="/updateprolist" element={<Updateprolist />} />
          <Route path="/profile" element={<Profilepage/>} />
          <Route path="/logout" element={<h1>You are logged out successfully</h1>} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    <Footer />
  </div>
);
}

export default App;

//JWT token is used to authenticate users and protect routes in a React application. It is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature structure or as the plaintext of a JSON Web Encryption structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.
//Here i am not using JWT token but i will use it in the next project.
/*Explaination:
--rowserRouter: Provides routing functionality, enabling navigation without page reloads.​
--Routes: Contains all route definitions. Each Route specifies a path and the component (or element) to render when that path is accessed.*/