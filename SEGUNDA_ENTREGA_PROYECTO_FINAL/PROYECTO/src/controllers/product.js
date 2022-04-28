const { Product } = require('../daos');

const getProducts = async (req, res) => {
  try {
    if (req.query.id) {
      const product = await Product.getById(req.query.id);

      return res.status(200).json(product);
    } else {
      const products = await Product.getAll();

      return res.status(200).json(products);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const addProduct = async (req, res) => {
  const { admin, ...data } = req.body;

  try {
    const product = Product.create(data);

    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { admin, ...data } = req.body;
  // console.log(data);
  console.log(id);

  try {
    const products = await Product.update(id, data);

    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    await Product.delete(id);

    return res.status(200).json({ message: `Product with ID: ${id} deleted` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
};

