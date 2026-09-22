import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const categoryOptions = ['All Categories', 'Electronics', 'Fashion', 'Books', 'Home'];

function Products() {
  const navigate = useNavigate();
  const { customer, loading: authLoading, error: authError } = useAuth();

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authError?.response?.status === 401 || authError?.response?.status === 404) {
      navigate('/login', { replace: true });
    }
  }, [authError, navigate]);

  useEffect(() => {
    if (authLoading || !customer) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const params = {};

        if (search.trim()) {
          params.search = search.trim();
        }

        if (selectedCategory !== 'All Categories') {
          params.category = selectedCategory;
        }

        const response = await api.get('/products', { params });
        setProducts(response.data.products || []);
      } catch (requestError) {
        setError('Something went wrong while loading products.');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 250);
    return () => clearTimeout(timer);
  }, [authLoading, customer, search, selectedCategory]);

  if (authLoading || !customer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <p className="text-sm text-gray-500">Loading your account...</p>
      </main>
    );
  }

  const handleSearchSubmit = () => {
    setSearch(searchInput.trim());
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
      <Navbar />

      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">ShopKart</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">Products</h1>
            </div>

            <button
              type="button"
              onClick={() => navigate('/home')}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-black hover:text-black"
            >
              Back to Home
            </button>
          </div>

          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex w-full gap-3 md:flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-black focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Search
              </button>
            </div>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-black focus:outline-none md:w-56"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Products;
