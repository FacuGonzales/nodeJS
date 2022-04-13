const FS = require('fs');

const Listado = require('../productos.txt')
class Cart {
    
    constructor(file) {
        this.file = file;
    }


    // recibimos el objeto a comprar.
    async save( element ){
        const createCart = {
            id: Math.random(),
            timestamp: Date.now(),
            products: [{
                id: Math.random(),
                timestamp: element.timestamp,
                name: element.name,
                description: element.description,
                price: parseInt(element.price),
                thumbnail: element.thumbnail,
                code: element.code,
                stock: element.stock
            }]
        }

        try {
            await FS.promises.writeFile(`./${this.file}.txt`,JSON.stringify([createCart],null,2));
            return createCart.id;
        } catch (err) {
            return {
                status: 'Error', 
                message: 'Error al crear el archivo y producto.', 
                error: err
            }
        }
        
    }

    async get(id) {
        try{

            // buscamos el archivo de carrito.
            let response = await FS.promises.readFile(`./${this.file}.txt`,'utf-8');

            // lo almacenamos en un listado parseandolo
            let _list = JSON.parse(response);
 
            // Si tenemos un id, vamos a buscar dentro del archivo.    
            let cart = _list.find(element => element.id === id);

            // Si no encontramos elemento, retornamos error.
            if(!cart) throw new Error();
                
            // Si el carrito existe, lo retornamos.
            return cart;
        }catch(err){
            return {
                status: 'Error', 
                message: 'No se encontraron los productos solicitados.',
                error: err
            }
        }
    }
       
    // Elimina del archivo el carrito con el id buscado.
    async deleteById(id) {
        try{
            let response = await FS.promises.readFile(`./${this.archivo}.txt`,'utf-8');
     
            let _list = JSON.parse(response);
     
            if(!_list.find(element=>element.id === id)) throw new Error();
            
            let _updateProd = _list.filter(el=>el.id !== id);
     
            try {
                await FS.promises.writeFile(`./${this.file}.txt`,JSON.stringify(_updateProd,null,2))
                return {
                    status: 'Success', 
                    message: 'Carrito eliminado con éxito.'
                }
            }catch(err){
                return {
                    status: 'Error', 
                    message: 'Hubo un problema al borrar el carrito.'
                }
            } 
        }catch(err){
            return {
                status: 'Error', 
                message: 'No se encontro el carrito solicitado.'
            }
        }
    }
      
    
}

module.exports = Cart;
