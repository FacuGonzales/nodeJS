const EXPRESS = require('express');

const Container = require('./container.js');
const RandomObjeto = require('./functions.js');

const app = EXPRESS();
const allProductos = new Container('./productos.txt');

const PORT = 8080;

const _server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${_server.address().port}`))

_server.on("error", error => console.error(`Error en servidor ${error}`));

app.get('/productos', (req, res) => {
    allProductos.getAll()
        .then((data) => res.send(`PRODUCTOS DISPONIBLES:  ${JSON.stringify(data)}`))
        .catch((err) => {throw err});
})

app.get('/productoRandom', (req, res) => {
    allProducts.getById(RandomObjeto())
        .then((datos) => res.send(`Productos random: ${JSON.stringify(datos)}`))
        .catch((err) =>{throw err});
})