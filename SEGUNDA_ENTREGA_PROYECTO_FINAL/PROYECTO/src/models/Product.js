
const MONGOOSE = require('mongoose');

const productSchema = new MONGOOSE.Schema(
  {
    name: String,
    price: {
      type: Number,
      required: true,
    },
    description: String,
    image: String,
    code: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

Product = MONGOOSE.model('Product', productSchema);

module.exports = Product;