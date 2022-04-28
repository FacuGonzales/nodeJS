
const EXPRESS = require('express');
const API = EXPRESS.Router();
const ProductsRoutes = require('./products');
const CartRoutes = require('./cart');

API.use('/products', ProductsRoutes);
API.use('/cart', CartRoutes);

module.exports = API;
