const mongoose = require('mongoose');
const LineItems = require('./LineItem')

const { Schema } = mongoose;

const orderSchema = new Schema({
  orderDate: {
    type: Date,
    default: Date.now
  },
  lineItems: [LineItems],
  status:{
    type: String,
    enum: ['Received', 'Shipped', 'Delivered', 'Cancelled'],
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
