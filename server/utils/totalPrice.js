module.exports = (lineItems) => {
        let total = 0;
        //iterate through line items.price, add it all up, return total
        lineItems.forEach(item => {
            total += item.price*item.quantity;
        });
        return total;
    }
