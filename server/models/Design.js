const mongoose = require('mongoose');

const { Schema } = mongoose;

const DesignSchema = new Schema({
  user:
  {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  hidden: {
    type: Boolean,
    default: false
  },
  tags:[{
    type: String
  }]
});

const Design = mongoose.model('Design', DesignSchema);

module.exports = Design;
