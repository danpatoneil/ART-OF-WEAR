import { loadStripe } from "@stripe/stripe-js";
import { CHECKOUT } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { priceCheck } from "../../utils/helpers";

const Cart = () => {
  const [checkout, { data }] = useLazyQuery(CHECKOUT);
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || [])
  const removeFromCart = (e) => {
    // console.log(e.target.getAttribute("data-index"))
    const index = e.target.getAttribute("data-index");
    //remove item from cart, save cart
    const cartArray = cart;
    cartArray.splice(index, 1);
    setCart(cartArray);
  };
  const submitCheckout = () => {
    checkout({
      variables: { items: JSON.parse(sessionStorage.getItem("cart")) },
    });
  };
  return (
    <div>
      {cart.length ? (
        <div>
          {cart.map((item, index) => (
            <div key={index}>
              <p>{item.size}</p>
              <p>{item.cut}</p>
              <p>{item.color}</p>
              <p>{item.type}</p>
              <img src={item.image} />
              <p>Price: ${priceCheck(item.type)}</p>
              <button data-index={index} onClick={removeFromCart}>Delete</button>
            </div>
          ))}
          <button onClick={submitCheckout}>Checkout</button>
        </div>
      ) : (
        <h2>Empty Cart</h2>
      )}
    </div>
  );
};

export default Cart;
