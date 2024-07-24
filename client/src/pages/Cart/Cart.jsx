import { loadStripe } from "@stripe/stripe-js";
import { CHECKOUT } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { priceCheck } from "../../utils/helpers";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const [checkout, { data }] = useLazyQuery(CHECKOUT);
  const [cart, setCart] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );
  useEffect(() => {
    // console.log(data)
    if(data) {
        stripePromise.then((res) => {
            res.redirectToCheckout({sessionId: data.checkout.session})
        }).catch(error => {
            console.error(error)
        })
    }
  }, [data])
  const removeFromCart = (e) => {
    // console.log(e.target.getAttribute("data-index"))
    const index = e.target.getAttribute("data-index");
    //remove item from cart, save cart
    // Create a new array with the item removed
    const updatedCart = cart.filter((item, i) => i !== parseInt(index));

    setCart(updatedCart);
  };
  const submitCheckout = () => {
    console.log('checkout Begins')
    // console.log(cart)
    let checkoutInput = []
    for (const product of cart) {
        const price = priceCheck(product.item);
        product.price = price;
        checkoutInput.push(product);
    }
    //price: priceCheck(item)
    // console.log(checkoutInput)
    checkout({
      variables: { items: checkoutInput },
    });
  };
  sessionStorage.setItem('cart', JSON.stringify(cart))
  return (
    <div>
      {cart.length ? (
        <div className = "cart-div">
          {cart.map((item, index) => (
            <div key={index}>
              <p className ="card-p">{item.size}</p>
              <p className ="card-p">{item.cut}</p>
              <p className ="card-p">{item.color}</p>
              <p className ="card-p">{item.type}</p>
              <img src={item.image} />
              <p>Price: ${priceCheck(item.type)}</p>
              <button className = "button" data-index={index} onClick={removeFromCart}>
                Delete
              </button>
            </div>
          ))}
          <button className = "button" onClick={submitCheckout}>Checkout</button>
        </div>
      ) : (
        <h2 className ="cart-h2">Cart</h2>
      )}
    </div>
  );
};

export default Cart;
