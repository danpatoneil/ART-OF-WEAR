import { useEffect } from "react";
import "./Success.css";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER } from "../../utils/mutations";


const Success = () => {
  const [addOrder] = useMutation(UPDATE_ORDER);
  useEffect(() => {
    async function saveOrder() {
        const searchParams = new URLSearchParams(window.location.search);
        const orderId = searchParams.get('order_id');
        console.log("orderID is : ", orderId)
        const {data} = await addOrder({variables: {id: orderId, status:'Received'}})
        console.log(data.updateOrder._id)
    }
    setTimeout(() => {
      window.location.assign("/");
    }, 3000);
    saveOrder();
  }, [addOrder]);

  return <p>Your order was successfully processed!</p>;
};

export default Success;
