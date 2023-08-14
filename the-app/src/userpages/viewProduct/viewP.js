import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function ViewP() {
  const [inputs, setInputs] = useState({ name: '', category: '', price: '', qty: '', image: null });
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  function getProduct() {
    axios
      .get(`http://127.0.0.1:8000/api/products/${id}`)
      .then(function (response) {
        console.log(response.data);
        setProduct(response.data.product);
        setInputs(response.data.product);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const handleQtyChange = (e) => {
    const newQty = parseInt(e.target.value);
    const maxQty = product.qty; // Maximum available stock

    if (newQty <= maxQty) {
      setQty(newQty);
    } else {
      setQty(maxQty);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const cartItem = {
      id: `P_${product.id}`,
      name: product.name,
      category: product.category,
      price: product.price,
      qty: qty,
    };

    console.log('Item added to cart:', cartItem);

    // Retrieve the existing cart from local storage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingItem = existingCart.find((item) => item.id === cartItem.id);

    if (existingItem) {
      // If the product exists, update its quantity
      const updatedCart = existingCart.map((item) =>
        item.id === cartItem.id ? { ...item, qty: item.qty + cartItem.qty } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // If the product is new, add it to the cart
      const updatedCart = [...existingCart, cartItem];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }


    // Navigate to the cart view page with the product data
    navigate('/userpages/Cartview/cartview', { state: cartItem });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="product py-5">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <h1>{inputs.name}</h1>
              <img src={`http://127.0.0.1:8000/storage/products/${inputs.image}`} alt={inputs.name} style={{ width: '250px', height: '250px' }} />
              <p className="my-5 p-2" style={{ border: '1px solid #e3e3e3' }}>
                {inputs.category}
              </p>
              <p>Price: {inputs.price} &euro;</p>
              <form onSubmit={handleSubmit} className="d-flex align-items-center">
                <label htmlFor="qty">Quantity:</label>&nbsp;
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  value={qty}
                  min="1"
                  className="form-control me-4 w-25"
                  max={product.qty}
                  onChange={handleQtyChange}
                />
                <button type="submit" className="btn btn-sm btn-outline-primary">
                  Add to cart
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ViewP;
