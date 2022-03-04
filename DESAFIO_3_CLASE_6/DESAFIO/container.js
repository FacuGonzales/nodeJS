const fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    // recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save( element ){
        try {
            let _respuesta = await fs.promises.readFile(`./${this.archivo}.txt`,'utf-8');

            let _listadoProductos = JSON.parse(_respuesta);

            const _nuevoProducto = {
                id: _listadoProductos[_listadoProductos.length-1].id + 1,
                title: element.title,
                price: parseInt(element.price),
                thumbnail: element.thumbnail
            }

            _listadoProductos.push(_nuevoProducto); 

            try {
                await fs.promises.writeFile(`./${this.archivo}.txt`, JSON.stringify(_listadoProductos,null,2));
                return _nuevoProducto.id 
            }catch(err) {
                return {
                    status: 'Error', 
                    message: 'Error al cargar el producto.', 
                    error: err
                }
            }

        }catch(err) {
            const producto = {
                id: 1,
                title: element.title,
                price: parseInt(element.price),
                thumbnail: element.thumbnail
            }

            try {
                await fs.promises.writeFile(`./${this.archivo}.txt`,JSON.stringify([producto],null,2));
                return producto.id;
            } catch (err) {
                return {
                    status: 'Error', 
                    message: 'Error al crear el archivo y producto.', 
                    error: err
                }
            }
        }
    }

    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        try{
            let _respuesta = await fs.promises.readFile(`./${this.archivo}.txt`,'utf-8');
            let _listadoProductos = JSON.parse(_respuesta);
            let prodSelected = _listadoProductos.find(el => el.id === id);

            if(!prodSelected) throw new Error();
            
            return prodSelected;

        }catch(err){
            return {
                status: 'Error',
                message: 'No se encontro el producto solicitado.', 
                error: err
            }
        }
    }

    // Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try{
            let _respuesta = await fs.promises.readFile(`./${this.archivo}.txt`,'utf-8');
            let _listado = JSON.parse(_respuesta);

            return _listado;

        }catch(err){
            return {
                status: 'Error', 
                message: 'No se encontraron los productos solicitados.'
            }
        }
    }

    // Elimina del archivo el objeto con el id buscado.
    async deleteById(id) {
        try{
            let _respuesta = await fs.promises.readFile(`./${this.archivo}.txt`,'utf-8');

            let _listado = JSON.parse(_respuesta);

            let siExiste = _listado.find(el=>el.id === id)
            
            if(!siExiste) throw new Error();
            
            let productosActualizados = _listado.filter(el=>el.id !== id);

            try {
                await fs.promises.writeFile(`./${this.archivo}.txt`,JSON.stringify(productosActualizados,null,2))
                return {
                    status: 'Success', 
                    message: 'Producto eliminado con éxito.'
                }
            }catch(err){
                return {
                    status: 'Error', 
                    message: 'Hubo un problema al borrar el producto.'
                }
            } 
        }catch(err){
            return {
                status: 'Error', 
                message: 'No se encontro el producto solicitado.'
            }
        }
    }

    // Elimina todos los objetos presentes en el archivo..
    async deleteAll() {
        try{
            // await fs.promises.unlink(`./${this.archivo}.txt`);

            let archivosBorrados = [];
            await fs.promises.writeFile(`./${this.archivo}.txt`,JSON.stringify(archivosBorrados,null,2))

            return {
                status: 'Success', 
                message: 'Se eliminaron todos los objetos del archivo.'
            }
        }catch(err){
            return {
                status: 'Error', 
                message: 'Hubo un error al intentar borrar los archivos.', 
                error: err
            }
        }
    }


}

const _verListado = new Contenedor('productos');

// // // Prueba de Save
// _verListado.save(
//     {
//         title: 'Instagram',
//         price: 88,
//         thumbnail: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png',
//     }
// )

// // // Prueba de GET BY ID
// _verListado.getById(2).then(data => console.log(data));

// // // Prueba de GET ALL
// _verListado.getAll().then(data => console.log(data))

// // // PRUEBA BORRADO POR ID
// _verListado.deleteById(1).then(data => console.log(data))

// //  Prueba de Borrar todos los productos
// _verListado.deleteAll().then(data => console.log(data))

module.exports = Contenedor;