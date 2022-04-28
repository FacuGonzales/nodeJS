const MONGOOSE = require('mongoose');

const cartSchema = new MONGOOSE.Schema(
  {
    products: [
      {
        type: MONGOOSE.Schema.Types.ObjectId, 
        ref: 'Product'
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = MONGOOSE.model('Cart', cartSchema);

module.exports = Cart;
