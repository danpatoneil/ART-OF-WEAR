const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  routingNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[0-9]{9}$/.test(v);
      },
      message: 'Routing number must be exactly 9 digits long'
    }
  },
  accountNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[0-9]{8,17}$/.test(v);
      },
      message: 'Account number must be between 8 and 17 digits long'
    }
  },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  designs: [{ type: Schema.Types.ObjectId, ref: 'Design' }],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
