import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addWishlistProduct } from '../services/wishlist';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

function ProductCard({ product, isWishlisted = false, onWishlistChange, variant = 'catalog', onRemove }) {
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [actionError, setActionError] = useState('');
  const stockText = product.stock > 0 ? `${product.stock} units left` : 'Out of stock';

  const handleAddToWishlist = async () => {
    setSaving(true);
    setActionError('');

    try {
      await addWishlistProduct(product._id);
      onWishlistChange?.(product._id);
    } catch (requestError) {
      if (requestError.response?.status === 409) {
        onWishlistChange?.(product._id);
      } else {
        setActionError('Unable to save product. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    setActionError('');

    try {
      await onRemove(product._id);
    } catch {
      setActionError('Unable to remove product. Please try again.');
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.category}</p>
        <p className="mt-3 text-lg font-bold text-gray-900">{currencyFormatter.format(product.price)}</p>
        <p className="mt-2 text-sm text-gray-600">{stockText}</p>

        <Link
          to={`/products/${product._id}`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          View Details
        </Link>

        {variant === 'wishlist' ? (
          <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-red-600 hover:text-red-700 disabled:cursor-wait disabled:opacity-60"
          >
            {removing ? 'Removing...' : 'Remove from Wishlist'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddToWishlist}
            disabled={saving || isWishlisted}
            className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-black hover:text-black disabled:cursor-default disabled:opacity-70"
          >
            {saving ? 'Saving...' : isWishlisted ? '♥ Added to Wishlist' : '♡ Add to Wishlist'}
          </button>
        )}
        {actionError && <p className="mt-2 text-sm text-red-600" role="alert">{actionError}</p>}
      </div>
    </div>
  );
}

export default ProductCard;
