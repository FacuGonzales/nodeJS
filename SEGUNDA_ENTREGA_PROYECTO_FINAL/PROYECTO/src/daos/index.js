let Product;

let Cart;

let path = 'firestore';

// En esta linea se debe colocar la variable de entorno para definir que base de datos usar
path = 'something' === 'something' ? 'mongoose' : ''

(() => {
  const res = import(`./${path}.daos`).then(({ CartDao, ProductDao }) => {
    Cart = new CartDao();
    Product = new ProductDao();
  });

  return res;
})();

module.exports = {
  Product,
  Cart
}

