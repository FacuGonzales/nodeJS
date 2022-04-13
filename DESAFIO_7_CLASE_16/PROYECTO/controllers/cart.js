const model = require('../models/cart');

const cartModel = new model('carrito');


function save(req, res){
    const body = req.body;
    cartModel.save(body).then((data)=>res.redirect("/api/tuCompra/carrito"));
}

function get(req, res){
    const id = parseInt(req.params.id);
    productsModel.get(id).then(data => res.json(data));
}

function deleteById(req, res){
    const id = parseInt(req.params.id);
    productsModel.deleteById(id).then(res.send("Carrito Eliminado"))
}

module.exports = {
    save
}