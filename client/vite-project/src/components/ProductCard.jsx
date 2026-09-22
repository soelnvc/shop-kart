import { Link } from 'react-router-dom';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

function ProductCard({ product }) {
  const stockText = product.stock > 0 ? `${product.stock} units left` : 'Out of stock';

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
      </div>
    </div>
  );
}

export default ProductCard;
