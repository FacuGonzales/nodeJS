const FS = require('fs');

class Products {
    
    constructor(file) {
        this.file = file;
    }

    // Devuelve un array con los objetos presentes en el archivo.
    async get(id) {
        try{
            // buscamos el archivo de productos.
            let response = await FS.promises.readFile(`./${this.file}.txt`,'utf-8');

            // lo almacenamos en un listado parseandolo
            let _list = JSON.parse(response);
            console.log('jppaaa')
 
            // Si no recibimos un id, retornamos el listado completo.
            if(!id) return _list;

            // Si tenemos un id, vamos a buscar dentro del archivo.    
            let prodSelected = _list.find(element => element.id === id);

            // Si no encontramos elemento, retornamos error.
            if(!prodSelected) throw new Error();
                
            // Si el producto existe, lo retornamos.
            return prodSelected;
        }catch(err){
            return {
                status: 'Error', 
                message: 'No se encontraron los productos solicitados.',
                error: err
            }
        }
    }

    // recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save( element ){
        try {
            let response = await FS.promises.readFile(`./${this.file}.txt`,'utf-8');

            let _list = JSON.parse(response);

            const newProduct = {
                id: _list[_list.length-1].id + 1,
                timestamp: element.timestamp,
                name: element.name,
                description: element.description,
                price: parseInt(element.price),
                thumbnail: element.thumbnail,
                code: element.code,
                stock: element.stock
            }

            _list.push(newProduct); 

            try {
                await FS.promises.writeFile(`./${this.file}.txt`, JSON.stringify(_list,null,2));
                return newProduct.id 
            }catch(err) {
                return {
                    status: 'Error', 
                    message: 'Error al cargar el producto.', 
                    error: err
                }
            }

        }catch(err) {
            const createProduct = {
                id: 1,
                timestamp: element.timestamp,
                name: element.name,
                description: element.description,
                price: parseInt(element.price),
                thumbnail: element.thumbnail,
                code: element.code,
                stock: element.stock
            }

            try {
                await FS.promises.writeFile(`./${this.file}.txt`,JSON.stringify([createProduct],null,2));
                return createProduct.id;
            } catch (err) {
                return {
                    status: 'Error', 
                    message: 'Error al crear el archivo y producto.', 
                    error: err
                }
            }
        }
    }

    async update(id, object){
        try{
            let response = await FS.promises.readFile(`./${this.file}.txt`,'utf-8');
            let _list = JSON.parse(response);

            if (!_list.find(element => element.id == id)) throw new Error();
 
            for (let i = 0; i < _list.length; i++) {
                if(_list[i].id == id){
                  _list[i].timestamp = producto.timestamp,
                  _list[i].name = producto.name,
                  _list[i].description = producto.description,
                  _list[i].price = parseInt(producto.price),
                  _list[i].thumbnail = producto.thumbnail,
                  _list[i].code = producto.code,
                  _list[i].stock = producto.stock
                };


            };

            save(_list).then( res.send("Producto actualizado"))
    
            this.index()
            .then(async el=>{
                let aux = el
                const index = aux.findIndex(el=>el.id == id)

                aux[index].timestamp = object.timestamp || "",
                aux[index].name = object.name || "",
                aux[index].description = object.description || "",
                aux[index].price = parseInt(object.price) || 0,
                aux[index].thumbnail = object.thumbnail || "",
                aux[index].code = object.code || "",
                aux[index].stock = object.stock || ""

                await FS.promises.writeFile(url, JSON.stringify(aux) )
            
            })
            .catch(error=>{
                console.log("No se pudo eliminar el objeto.",error)
            })



        }catch(err){
            return {
                status: 'Error', 
                message: 'No se encontro el producto solicitado.',
                error: err
            }
        }
    }
    
    // Elimina del archivo el objeto con el id buscado.
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
    
}

module.exports = Products;
