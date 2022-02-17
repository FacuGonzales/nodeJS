class Libro {
    constructor( titulo, autor){
        this.titulo = titulo,
        this.autor = autor
    }
}

class Usuario {
    constructor( nombre, apellido, libros, mascotas){
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }

    getFullName(){
        let titulosLibros = this.libros.map( libro  => libro.titulo);

        return `El usuario es:
                    Nombre: ${this.nombre}, ${this.apellido},
                    Mascotas: ${this.mascotas},
                    Libros: ${titulosLibros}
                `;
    };

    addMascota( nombreMascota ){
        this.mascotas.push(nombreMascota);
    }

    countMascotas(){
        return `La cantidad de mascotas es: ${this.mascotas.length}`;
    }

    addBook(nombreLibro, nombreAutor){
        let libro = new Libro();

        libro.titulo = nombreLibro;
        libro.autor = nombreAutor;
    
        this.libros.push(libro);
    }

    getBookNames(){
        return this.libros.map( libro  => libro.titulo);
    }
    
}

const nuevoUsuario = new Usuario(
    'Facundo', 
    'Gonzales',
    [
        {
            'titulo': 'Harry Potter', 
            'autor': 'J.K Rowlling',
        },
        {
            'titulo': 'The Chronicles of Narnia', 
            'autor': 'C.S Lewis',
        },
        {
            'titulo': 'El Camino de Steve Jobs', 
            'autor': 'Jay Elliot',
        }
    ],
    [
        'Olivia',
        'Roña'
    ]
    
    
)


nuevoUsuario.getFullName();
nuevoUsuario.countMascotas();
nuevoUsuario.getBookNames();
