import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const cartTotal = new URLSearchParams(location.search).get('cartTotal');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [product, setProduct] = useState(null);
  const [userID, setUserID] = useState(null);
  const productNamesParam = new URLSearchParams(location.search).get('productNames');
  const [productNames] = useState(productNamesParam ? JSON.parse(decodeURIComponent(productNamesParam)) : []);



  useEffect(() => {
    console.log('Product in Checkout:', product);
    const productParam = new URLSearchParams(location.search).get('product');
    if (productParam) {
      setProduct(JSON.parse(decodeURIComponent(productParam)));
      console.log('Product:', JSON.parse(decodeURIComponent(productParam)));
    }
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log(userData);
      setUserID(userData.user.id);
    }
  }, [location.search]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('notes', notes);
    formData.append('total', cartTotal);
    formData.append('product', productNames);
    formData.append("user_id", userID);



    fetch('http://127.0.0.1:8000/api/orders', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Empty the cart
        // Remove cart data from local storage
        localStorage.removeItem('cart');
        window.location.href = '/userpages/orders/orderview';
      })
      .catch((error) => console.error(error));
  };


  return (
    <div>
      <div className="checkout-page py-5">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <h2>Checkout</h2>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <Link type="button" className="btn btn-secondary d-flex justify-content-center align-items-center" to={`/userpages/Cartview/cartview`}>
                Go back to cart
              </Link>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes:</label>
              <textarea
                className="form-control"
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="product">Products:</label>
              <input className="form-control" type="text" value={productNames.join(', ')} readOnly />
            </div>
            <br />
            <div>
              <p>Total: {cartTotal} €</p>
            </div>
            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

