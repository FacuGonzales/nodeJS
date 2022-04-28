
const EXPRESS = require('express');
const ProductsRoutes = EXPRESS.Router();
const { addProduct, deleteProduct, getProducts, updateProduct } = require('../controllers/product');
const { roleCheck } = require('../middlewares/roleCheck');

ProductsRoutes.get('/:id?', getProducts);
ProductsRoutes.post('/', roleCheck, addProduct);
ProductsRoutes.put('/:id', roleCheck, updateProduct);
ProductsRoutes.delete('/:id', roleCheck, deleteProduct);

module.exports = ProductsRoutes;
