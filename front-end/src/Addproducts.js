import React from "react";

const AddProducts = () => {
    const [name, setProduct] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const addproductshandle = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        console.warn(name, price, category, company);
        // let result = await fetch("http://localhost:5400/addproduct", {
        let result = await fetch("/addproduct", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            }
        });

        result = await result.json(); 
        console.warn(result);

        if (result) {
            alert("Product added successfully");
        } else {
            alert("Failed to add product");
        }
    };

    return (
        <div className="addpro-content">
            <h2>Add Products</h2>
            <input className="Inputbox" value={name} onChange={(e) => setProduct(e.target.value)} type="text" placeholder="Enter Product Name" />
            {error && !name && <span className="invalid-input">Please enter valid product name</span>}
             
            <input className="Inputbox" value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Product Price" />
            {error && !price && <span className="invalid-input">Please enter valid product price</span>} 
            <input className="Inputbox" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Product Category" />
            {error && !category && <span className="invalid-input">Please enter valid product category</span>}
            <input className="Inputbox" value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Enter Product Company" />
            {error && !company && <span className="invalid-input">Please enter valid product company</span>}
                       
            <button onClick={addproductshandle} className="submitprobutton" type="submit">Add Product</button>
        </div>
    );
};

export default AddProducts;