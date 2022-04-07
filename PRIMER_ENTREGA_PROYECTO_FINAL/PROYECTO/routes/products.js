const EXPRESS = require('express');
const API = EXPRESS.Router();

const controller = require('../controllers/products');

let isAdmi = false;

API.use(EXPRESS.json())
API.use(EXPRESS.urlencoded({extended : true}))

API.get('/productos/:id', controller.get);
API.get('/productos', controller.get);
API.post('/productos', controller.save);
API.put('/productos/:id', controller.update);
API.delete('/productos/:id', controller.deleteById);

module.exports = API;
