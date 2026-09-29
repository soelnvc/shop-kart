import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { getWishlist, removeWishlistProduct } from '../services/wishlist';

function Wishlist() {
  const navigate = useNavigate();
  const { customer, loading: authLoading } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (authLoading) return undefined;

    if (!customer) {
      navigate('/login', { replace: true });
      return undefined;
    }

    let cancelled = false;

    const fetchWishlist = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getWishlist();
        if (!cancelled) setWishlist(data.wishlist || []);
      } catch (requestError) {
        if (requestError.response?.status === 401 || requestError.response?.status === 404) {
          navigate('/login', { replace: true });
          return;
        }
        if (!cancelled) setError('Unable to load wishlist.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWishlist();
    return () => {
      cancelled = true;
    };
  }, [authLoading, customer, navigate, retryCount]);

  const handleRemove = async (productId) => {
    await removeWishlistProduct(productId);
    setWishlist((currentWishlist) => currentWishlist.filter((product) => product._id !== productId));
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
      <Navbar />

      <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">ShopKart</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">My Wishlist</h1>
              {!loading && !error && (
                <p className="mt-2 text-sm text-gray-600">{wishlist.length} {wishlist.length === 1 ? 'product' : 'products'} saved</p>
              )}
            </div>
            <Link
              to="/products"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-black hover:text-black"
            >
              Continue Shopping
            </Link>
          </header>

          {loading ? (
            <p className="py-16 text-center text-gray-600" role="status">Loading your wishlist...</p>
          ) : error ? (
            <div className="py-16 text-center" role="alert">
              <p className="text-gray-900">Unable to load wishlist.</p>
              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
                className="mt-5 rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Try Again
              </button>
            </div>
          ) : wishlist.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-4xl" aria-hidden="true">♡</p>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Your wishlist is empty</h2>
              <p className="mt-2 text-gray-600">Start saving products you love.</p>
              <Link
                to="/products"
                className="mt-5 inline-flex rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {wishlist.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  variant="wishlist"
                  onRemove={handleRemove}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Wishlist;
