import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Cart() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const product = location.state?.product;
  const [isCartEmpty, setIsCartEmpty] = useState(true);


  useEffect(() => {
    if (product) {
      addToCart(product);
    }
  }, [product]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart && storedCart.length > 0) {
      setCart(storedCart);
      setIsCartEmpty(false);
    }
  }, []);

  useEffect(() => {
    setCartTotal(calculateTotal());
    setIsCartEmpty(cart.length === 0);

    // Save cart data to local storage whenever the cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };


  const emptyCart = () => {
    setCart([]);
    setIsCartEmpty(true);
    // Clear cart data from local storage
    localStorage.removeItem('cart');
  };


  const decreaseQty = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const updatedQty = item.qty - 1;
        if (updatedQty <= 0) {
          return null;
        }
        return { ...item, qty: updatedQty };
      }
      return item;
    });

    setCart(updatedCart.filter(Boolean));
  };

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = item.qty + 1;
        if (newQty > item.stock) {
          return { ...item };
        }
        return { ...item, qty: newQty };
      }
      return item;
    });

    setCart(updatedCart);
  };


  const addToCart = (product) => {
    console.log('Product added to cart:', product);
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          const newQty = item.qty + product.qty;
          if (newQty > item.qty) {
            return { ...item };
          }
          return { ...item, qty: newQty };
        }
        return item;
      });

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product }]);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  return (
    <div>
      <div className="cart py-5">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div>
              <h2>Cart</h2>
              <p>{cart.length} products</p>
            </div>
            <div>
              <Link
                className="btn btn-sm btn-outline-success"
                style={{ marginRight: "20px" }}
                to={`/userpages/Health-Store/Healthpage`}
              >
                Continue Shopping
              </Link>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={emptyCart}
              >
                Empty cart
              </button>
            </div>
          </div>
          <div className="my-5">
            {cart.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td width="70%">{item.name}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => decreaseQty(item.id)}
                          >
                            -
                          </button>
                          <span className="d-inline-block mx-3">{item.qty}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </button>
                        </td>
                        <td className="text-end">
                          {(item.price * item.qty).toFixed(2)} &euro;
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Cart is empty!</p>
            )}
          </div>
          <div>
            {isCartEmpty ? (
              <button className="btn btn-primary" disabled>
                Go to Checkout
              </button>
            ) : (
              <Link
                to={{
                  pathname: "/userpages/checkout/checkoutpage",
                  search: `?cartTotal=${cartTotal}&productNames=${encodeURIComponent(JSON.stringify(cart.map(item => item.name)))}`                  
                }}
                className="btn btn-primary"
              >
                Go to Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
      <div data-testid="total-price" style={{ marginLeft: "110px" }}>
        <h5>Total Price: {cartTotal}&euro; </h5>
      </div>
    </div>
  );
}

export default Cart;





