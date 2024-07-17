const { Schema } = require('mongoose');

const lineItemSchema = new Schema(
  {
    design:{
      type: Schema.Types.ObjectId,
      ref: 'Design'
    },
    item: {
        type: String,
        enum: ['t-shirt', 'crewneck', 'hoodie']
    },
    cut:{
        type: String,
        enum: ['male', 'female', 'unisex']
    },
    size:{
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL']
    },
    color:{
        type: String,
        enum: ['black', 'white', 'grey', 'red', 'blue']
    },
    price: {
        type: Number,
        min: 10.00,
        max: 60.00,
    },
    quantity: {
        type: Number,
        min:1,
        default:1
    }
  }
);

module.exports = lineItemSchema;
