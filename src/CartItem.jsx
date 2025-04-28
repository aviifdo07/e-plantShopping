import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css'; // Don't forget your styles!

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateItemSubtotal = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1)); // remove '$'
    return (unitPrice * item.quantity).toFixed(2); // 2 decimal points
  };

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => {
        const unitPrice = parseFloat(item.cost.substring(1));
        return total + unitPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>
                <p>Subtotal: ${calculateItemSubtotal(item)}</p>
              </div>
              <div className="cart-item-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
                <button className="cart-item-remove" onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total Amount: ${calculateTotalAmount()}</h2>
            <div className="cart-actions">
              <button onClick={handleContinueShopping}>Continue Shopping</button>
              <button onClick={handleCheckoutShopping}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
