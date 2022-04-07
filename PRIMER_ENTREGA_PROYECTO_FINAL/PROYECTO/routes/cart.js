const EXPRESS = require('express');
const API = EXPRESS.Router();

const controller = require('../controllers/cart');

API.use(EXPRESS.json())
API.use(EXPRESS.urlencoded({extended : true}))

API.post('/carrito', controller.save);
API.get('/carrito/:id', controller.get);
API.delete('/carrito/:id', controller.deleteById);

module.exports = API;
