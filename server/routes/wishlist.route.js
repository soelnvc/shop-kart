import express from 'express';
import { addProductToWishlist } from '../controllers/wishlist.controller.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const wishlistRoutes = express.Router();

wishlistRoutes.post('/:productId', isAuthenticated, addProductToWishlist);

export default wishlistRoutes;
