
const Firestore = require('../contenedores/Firestore');

class CartDao extends Firestore {
  constructor() {
    super('carts');
  }

  async createCart() {
    try {
      const cart = await this.create({ products: [], timestamp: Date.now()});

      return cart?.id;
    } catch (err) {
      console.log(err);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const updated = await this.collection.doc(cartId).update({
        products: this.firestore.FieldValue.arrayUnion(productId),
      });

      return updated;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const deleted = await this.collection.doc(cartId).update({
        products: this.firestore.FieldValue.arrayRemove(productId),
      });

      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}

class ProductDao extends Firestore {
  constructor() {
    super('products');
  }
}

module.exports = {
  CartDao,
  ProductDao
}