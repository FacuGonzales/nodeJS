const model = require('../models/products');

const productsModel = new model('productos');

function get(req, res){
    const id = parseInt(req.params.id);
    productsModel.get(id).then(data => res.json(data));
}

function save(req, res){
    const body = req.body;
    productsModel.save(body).then((data)=>res.redirect("/api/productos"));
}

function update(req, res){
    const id = parseInt(req.params.id);
    const { title, price, thumbnail } = req.body;
    const _prod = { title, price, thumbnail };

    productsModel.update(id, _prod).then((data)=>res.redirect("/api/productos"));
}

function deleteById(req, res){
    const id = parseInt(req.params.id);
    productsModel.deleteById(id).then(res.send("Producto eliminado"))
}

module.exports = {
    get,
    save,
    update,
    deleteById
}