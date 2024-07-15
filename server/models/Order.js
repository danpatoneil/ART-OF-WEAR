const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  orderDate: {
    type: Date,
    default: Date.now
  },
  lineItems: [LineItems],
  status:{

  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
