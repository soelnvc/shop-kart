import api from './api';

export const getWishlist = async () => {
  const response = await api.get('/wishlist');
  return response.data;
};

export const addWishlistProduct = async (productId) => {
  const response = await api.post(`/wishlist/${productId}`);
  return response.data;
};

export const removeWishlistProduct = async (productId) => {
  const response = await api.delete(`/wishlist/${productId}`);
  return response.data;
};
