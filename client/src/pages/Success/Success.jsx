import { useMutation } from "@apollo/client";
import "./Success.css";
import {UPDATE_ORDER} from '../../utils/mutations'
const Success = () => {
    const [addOrder] = useMutation(UPDATE_ORDER)

    return (
        <p>Your order has been successfully completed!</p>
    )
}

export default Success;
