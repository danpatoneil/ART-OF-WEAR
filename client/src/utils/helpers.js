export const saveToCart = (formData) => {
    const cart = JSON.parse(sessionStorage.getItem('cart'))||[];
    cart.push({...formData});
    sessionStorage.setItem('cart', JSON.stringify(cart));
    //redirect users to cart
    window.location.assign("/Cart")
}

export const shirtPhotos = ({...formData}) => {
    //add logic to return shirt image based on cut, item, and color
    //formData has cut, color, item type
    const {cut, color, type} = formData;
    let inputcolor;
    switch (color) {
        case "red":
            inputcolor='ff0000'
            break;

            case "blue":
                inputcolor='0000ff';
            break;

            case "black":
                inputcolor='000000';
            break;

            case "white":
                inputcolor='ffffff';
            break;

            case "grey":
                inputcolor='888888';
            break;

        default:
            return "color invalid";
    }
    // console.log(cut)
    // console.log(color)
    // console.log(type)


    const shirtRepo  = {
        "t-shirt": {
            male: `https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${inputcolor},e_colorize:75/white-mens-t-shirt_kxhuih.png`,
            female:`https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${inputcolor},e_colorize:75/white-mens-t-shirt_kxhuih.png`,
            unisex: `https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${inputcolor},e_colorize:75/white-mens-t-shirt_kxhuih.png`,
        },

        crewneck: {
            male: `https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${inputcolor},e_colorize:75/white-mens-t-shirt_kxhuih.png`,
            female:`https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${inputcolor},e_colorize:75/white-mens-t-shirt_kxhuih.png`,
            unisex: `https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${inputcolor},e_colorize:75/white-mens-t-shirt_kxhuih.png`,
        },

        sweatshirt: {
            male: `https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${inputcolor},e_colorize:75/white-mens-t-shirt_kxhuih.png`,
            female:`https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${inputcolor},e_colorize:75/white-mens-t-shirt_kxhuih.png`,
            unisex: `https://res.cloudinary.com/dhbdcvydg/image/upload/co_rgb:${inputcolor},e_colorize:75/white-mens-t-shirt_kxhuih.png`,
        }
    }
    console.log(shirtRepo[type][cut])
    return shirtRepo[type][cut];
}

export const priceCheck = (type) => {
    if(type=="crewneck") return 35.25;
    else if(type=="t-shirt") return 25.25;
    else return 55.35
}
