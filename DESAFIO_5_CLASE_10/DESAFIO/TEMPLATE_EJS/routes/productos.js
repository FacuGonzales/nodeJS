const EXPRESS = require('express');

const ProductosContoller = require('../controllers/productos');

const api = EXPRESS.Router();

api.use(EXPRESS.json())
api.use(EXPRESS.urlencoded({extended : true}))

api.get('/productos/:id', ProductosContoller.get);
api.get('/productos', ProductosContoller.get);
api.post('/productos', ProductosContoller.save);
api.put('/update/:id', ProductosContoller.update);
api.delete('/eliminar/:id', ProductosContoller.deleteById);

module.exports = api;
