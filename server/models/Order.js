const mongoose = require('mongoose');
const LineItems = require('./LineItem')
const totalPriceUtil = require('../utils/totalPrice')

const { Schema } = mongoose;

const orderSchema = new Schema({
    user:
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  orderDate: {
    type: Date,
    default: Date.now
  },
  lineItems: [LineItems],
  status:{
    type: String,
    enum: ['Pending', 'Received', 'Shipped', 'Delivered', 'Cancelled', 'Company Error'],
    default: 'Pending'
  },
},
{
    toJSON: {
        virtuals: true,
      },
});

orderSchema.virtual('totalPrice').get(function () {
    return totalPriceUtil(this.lineItems);
  });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
