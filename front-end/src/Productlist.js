import React, { useEffect } from "react";

const Productlist = () => {
    const [product, setProduct] = React.useState([]);

    useEffect(() => {
        getproduct();
    }, []);

    const getproduct = async () => {
        try {
            let result = await fetch("http://localhost:5400/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }
            });

            if (!result.ok) {
                throw new Error(`Error: ${result.status} ${result.statusText}`);
            }

            let data = await result.json();
            setProduct(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const changehandle = async (event) => {
        let key = event.target.value;
        try {
            if (key) {
                let result = await fetch(`http://localhost:5400/search/${key}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                });

                let data = await result.json();
                setProduct(data);
            } else {
                getproduct();
            }
        } catch (error) {
            console.error("Failed to search products:", error);
        }
    };

    return (
        <div className="productlist">
            <h2>Product List</h2>
            <input type="text" className="searchbox" placeholder="Search Product" onChange={changehandle} />

            {
                product.length > 0 ? (
                    <>
                        <ul>
                            <li>Sr no.</li>
                            <li>Product Name</li>
                            <li>Product Price</li>
                            <li>Product Category</li>
                            <li>Product Company</li>
                        </ul>

                        {
                            product.map((item, index) => {
                                return (
                                    <ul key={item._id} className="productlistul">
                                        <li>{index + 1}</li>
                                        <li>{item.name}</li>
                                        <li>{item.price}</li>
                                        <li>{item.category}</li>
                                        <li>{item.company}</li>
                                    </ul>
                                )
                            })
                        }
                    </>
                ) : (
                    <h3>No products available. Please add some products.</h3>
                )
            }
        </div>
    );
};

export default Productlist;