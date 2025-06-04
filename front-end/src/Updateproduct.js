import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Updateproduct = () => {
    const [name, setProduct] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {   
        getproductdetails();
    }, []); 

    const getproductdetails = async () => {
        let result = await fetch(`http://localhost:5400/products/${params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` // Added Authorization header
            }
        });
        result = await result.json();
        setProduct(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    };

    const updateproductshandle = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }
        let result = await fetch(`http://localhost:5400/products/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}` // Added Authorization header
            }
        });
        result = await result.json();
        if (result) {
            alert("Product updated successfully");
            navigate('/'); // Redirect to the product list or home page
        }
    };

    return (
        <div className="addpro-content">
            <h2>Update Products</h2>
            <input className="Inputbox" value={name} onChange={(e) => setProduct(e.target.value)} type="text" placeholder="Enter Product Name" />
            {error && !name && <span className="invalid-input">Please enter valid product name</span>}
             
            <input className="Inputbox" value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Product Price" />
            {error && !price && <span className="invalid-input">Please enter valid product price</span>} 
            <input className="Inputbox" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Product Category" />
            {error && !category && <span className="invalid-input">Please enter valid product category</span>}
            <input className="Inputbox" value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Enter Product Company" />
            {error && !company && <span className="invalid-input">Please enter valid product company</span>}
                       
            <button onClick={updateproductshandle} className="submitprobutton" type="submit">Update Product</button>
        </div>
    );
};

export default Updateproduct;