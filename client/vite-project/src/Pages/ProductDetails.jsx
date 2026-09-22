import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import api from '../services/api';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (requestError) {
        setError('Something went wrong while loading the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-500">Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <Link to="/products" className="mt-4 inline-block text-sm font-medium text-black underline">
            Go back to products
          </Link>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-500">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
      <Navbar />

      <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link to="/products" className="mb-6 inline-block text-sm font-medium text-gray-700 underline hover:text-black">
            ← Back to Products
          </Link>

          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm md:grid md:grid-cols-2">
            <img src={product.image} alt={product.name} className="h-full max-h-[500px] w-full object-cover" />

            <div className="p-6 sm:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">{product.category}</p>
              <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">{product.name}</h1>

              <p className="mt-5 text-2xl font-bold text-gray-900">{currencyFormatter.format(product.price)}</p>

              <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                <span>{product.stock > 0 ? `${product.stock} units left` : 'Out of stock'}</span>
              </div>

              <p className="mt-6 text-base leading-7 text-gray-700">{product.description}</p>

              <button
                type="button"
                className="mt-8 rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
