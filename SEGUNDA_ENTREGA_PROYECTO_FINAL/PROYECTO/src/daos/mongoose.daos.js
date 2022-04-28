const MongoDB = require('../contenedores/MongoDB');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

class CartDao extends MongoDB {
  constructor() {
    super(Cart);
  }

  async createCart() {
    try {
      const cart = await this.create({ products: [], timestamp: Date.now() });

      return cart?.id;
    } catch (err) {
      console.log(err);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      return this.model
        .updateOne(
          {
            _id: cartId,
          },
          {
            $push: {
              products: productId,
            },
          }
        )
        .exec();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      return this.model
        .updateOne(
          {
            _id: cartId,
          },
          {
            $pull: {
              products: productId,
            },
          }
        )
        .exec();
    } catch (err) {
      console.log(err);
    }
  }
}

class ProductDao extends MongoDB {
  constructor() {
    super(Product);
  }
}

module.exports = {
  CartDao,
  ProductDao
}