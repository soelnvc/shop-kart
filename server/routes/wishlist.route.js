import express from 'express';
import {
	addProductToWishlist,
	getCurrentWishlist,
	removeProductFromWishlist,
} from '../controllers/wishlist.controller.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const wishlistRoutes = express.Router();

wishlistRoutes.get('/', isAuthenticated, getCurrentWishlist);
wishlistRoutes.post('/:productId', isAuthenticated, addProductToWishlist);
wishlistRoutes.delete('/:productId', isAuthenticated, removeProductFromWishlist);

export default wishlistRoutes;
