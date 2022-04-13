const FS = require('fs');
const knex = require("../dataBase/mysql");

class Products {
    
    constructor(file) {
        this.file = file;
    }

    // Devuelve un array con los objetos presentes en el archivo.
    async get(id) {
        try{
            let resp;

            if(!id) return resp = await knex.select("*").from("productos");
            
            resp = await knex.select("*").from("productos").where({ id });

            if (resp.length > 0) return resp[0];
              
            return (`No existe el producto con id: ${id}`);
              

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

            const resp = await knex("productos").insert(newProduct);

            return resp;

        }catch(err) {
            return {
                status: 'Error', 
                message: 'Error al crear el archivo y producto.', 
                error: err
            }
            
        }
    }

    async update(id, element){
        try{
            const productUpdate = {
                timestamp: element.timestamp,
                name: element.name,
                description: element.description,
                price: parseInt(element.price),
                thumbnail: element.thumbnail,
                code: element.code,
                stock: element.stock
            }
              
            const resp = await knex("productos").where({ id: id }).update(productUpdate);
            return resp;

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
            const resp = await knex("productos").where({ id }).del();
            return resp;
        }catch(err){
            return {
                status: 'Error', 
                message: 'No se encontro el producto solicitado.'
            }
        }
    }
    
}

module.exports = Products;
