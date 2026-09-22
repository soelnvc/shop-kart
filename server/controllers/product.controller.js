import Product from '../models/product.model.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    if (!name || !description || !price || !category || !image || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All required fields are required',
      });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be greater than 0',
      });
    }

    if (Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock cannot be negative',
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      image,
      stock,
    });

    return res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search && search.trim()) {
      query.name = { $regex: search.trim(), $options: 'i' };
    }

    if (category && category.trim()) {
      query.category = category.trim();
    }

    const products = await Product.find(query).select('name price category image stock');

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }
};
