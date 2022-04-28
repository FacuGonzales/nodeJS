const { Cart } = require('../daos');
const { Product } = require('../daos');

const createCart = async (req, res) => {
  try {
    const cart = await Cart.createCart();

    return res.status(200).json({ cartId: cart });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    await Cart.delete(req.params.id);

    return res.status(200).json({
      message: `Cart with ID: ${req.params.id} deleted`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const cart = await Cart.getById(req.params.id);

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.products = await Promise.all(
      cart?.products.map(async (id) => {
        const product = await Product.getById(id);
        return product;
      })
    );

    return res.status(200).json({ cart });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const addProductToCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;

  try {
    const product = await Product.getById(productId);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    console.log(id, productId);
    

    const cart = await Cart.addProductToCart(id, productId);

    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const removeProductFromCart = async (req, res) => {
  const { id, productId } = req.params;

  try {
    await Cart.deleteProductFromCart(id, productId);

    return res.status(200).json({
      message: `Product with ID: ${productId} removed from cart with ID: ${id}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

module.exports = {
  createCart,
  deleteCart,
  getCartProducts,
  addProductToCart,
  removeProductFromCart
};
