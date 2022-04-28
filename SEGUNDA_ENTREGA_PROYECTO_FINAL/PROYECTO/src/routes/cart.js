const EXPRESS = require('express');
const CartRoutes = EXPRESS.Router();
const { addProductToCart, createCart, deleteCart, getCartProducts, removeProductFromCart } = require('../controllers/cart');

API.post('/', createCart);

API.delete('/:id', deleteCart);

API.get('/:id/products', getCartProducts);

API.post('/:id/products', addProductToCart);

API.delete('/:id/products/:productId', removeProductFromCart);

module.exports = CartRoutes;
