import { useParams } from "react-router-dom";
import { GET_DESIGN } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
 import {saveToCart, shirtPhotos} from "../../utils/helpers"
import "./Shirts.css"

const Shirts = () => {
  let { id } = useParams();
//   console.log(id)
  const { loading, data } = useQuery(GET_DESIGN, {
    variables: {id:id}
  });
  const [formData, setFormData] = useState({
    size:'XS',
    cut:'male',
    color: 'black',
    item: 'tshirt',
    quantity: 1
  })


  const handleFormChange = async (e) => {
    console.log(formData)
    // console.log(id)
    let {name, value} = e.target;
    if(name=="quantity"){
        value=parseInt(value);
    }
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
  }



  const handleFormSubmit = () => {
    saveToCart({...formData, design:id, image:data.getDesign.image});
    //redirect to cart page
    window.location.assign('/Cart');
  }

  return (
    <div className="body">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{data.getDesign.user?.username||'unknown user'}&#39;s design</h2>
          <img className="designPhoto" src={data.getDesign.image} alt="Design" />
          <img className="shirtPhoto"  src={shirtPhotos(formData)} alt="Shirt" />
          <form>
            <label htmlFor="size">Size</label>
            <select name="size" id="sizeSelect" value={formData.size} onChange={handleFormChange}>
              <option value="XS">x-small</option>
              <option value="S">small</option>
              <option value="M">medium</option>
              <option value="L">large</option>
              <option value="XL">x-large</option>
            </select>
            <label htmlFor="cut">Cut</label>
            <select name="cut" id="cutSelect" value={formData.cut} onChange={handleFormChange}>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="unisex">unisex</option>
            </select>
            <label htmlFor="color">Color</label>
            <select name="color" id="colorSelect" value={formData.color} onChange={handleFormChange}>
              <option value="black">black</option>
              <option value="white">white</option>
              <option value="grey">grey</option>
              <option value="red">red</option>
              <option value="blue">blue</option>
            </select>
            <label htmlFor="item">item</label>
            <select name="item" id="itemSelect" value={formData.item} onChange={handleFormChange}>
              <option value="tshirt">T-shirt</option>
              <option value="crewneck">Crewneck</option>
              <option value="sweatshirt">Sweatshirt</option>
            </select>
            <label htmlFor="quantity">quantity</label>
            <input name="quantity" type="number" value={formData.quantity} onChange={handleFormChange} />
            <button onClick={handleFormSubmit}>Add To Cart</button>
          </form>
        </div>
       )}
    </div>
  );
};

export default Shirts;
