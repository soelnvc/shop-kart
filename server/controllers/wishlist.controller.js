import mongoose from 'mongoose';
import Customer from '../models/customer.model.js';
import Product from '../models/product.model.js';

export const getCurrentWishlist = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer._id).populate({
      path: 'wishlist',
      select: 'name price category image stock',
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    const wishlist = customer.wishlist.filter(Boolean);

    return res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to load wishlist',
    });
  }
};

export const addProductToWishlist = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId) || productId.length !== 24) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }

  try {
    const productExists = await Product.exists({ _id: productId });

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const result = await Customer.updateOne(
      {
        _id: req.customer._id,
        wishlist: { $ne: new mongoose.Types.ObjectId(productId) },
      },
      { $addToSet: { wishlist: new mongoose.Types.ObjectId(productId) } }
    );

    if (result.modifiedCount === 0) {
      return res.status(409).json({
        success: false,
        message: 'Already in wishlist',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product added to wishlist',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to add product to wishlist',
    });
  }
};

export const removeProductFromWishlist = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId) || productId.length !== 24) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }

  try {
    const result = await Customer.updateOne(
      { _id: req.customer._id, wishlist: new mongoose.Types.ObjectId(productId) },
      { $pull: { wishlist: new mongoose.Types.ObjectId(productId) } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not in wishlist',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product removed from wishlist',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to remove product from wishlist',
    });
  }
};
