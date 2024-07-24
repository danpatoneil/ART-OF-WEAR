export const saveToCart = (formData) => {
    const cart = JSON.parse(sessionStorage.getItem('cart'))||[];
    cart.push({...formData});
    sessionStorage.setItem('cart', JSON.stringify(cart));
    //redirect users to cart
    window.location.assign("/Cart")
}

export const shirtPhotos = ({...formData}) => {
    //add logic to return shirt image based on cut, item, and color
    //formData has cut, color, item item
    const {cut, color, item} = formData;
    let hexCode;
    switch (color) {
        case "red":
            hexCode='ff0000'
            break;

            case "blue":
                hexCode='0000ff';
            break;

            case "black":
                hexCode='000000';
            break;

            case "white":
                hexCode='ffffff';
            break;

            case "grey":
                hexCode='888888';
            break;

        default:
            return "color invalid";
    }
    console.log(cut)
    console.log(color)
    console.log(item)
    console.log(`https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${hexCode},e_colorize:75/${cut}_${item}.png`)
    return `https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${hexCode},e_colorize:75/${cut}_${item}.png`;

}

export const priceCheck = (item) => {
    if(item=="crewneck") return 35.25;
    else if(item=="tshirt") return 25.25;
    else return 55.35
}
