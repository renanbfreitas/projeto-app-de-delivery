const productService = require('../services/ProductService');

const getAll = async (_req, res) => {
    const products = await productService.getAll();
    return res.status(200).json(products);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const product = await productService.getById(+id);
    return res.status(201).json(product);
};

module.exports = {
  getAll,
  getById,
};
