import Link from 'next/link';

// Server component displaying details of a product fetched from dummy API
export default async function ProductDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const text = await res.text();
  const product = text ? JSON.parse(text) : null;

  if (!product) {
    return (
      <main className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Product Not Found</h1>
        <Link href="/dashboard/products" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
          Back to List
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Product Details</h1>
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-2xl">
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Title:</strong> {product.title}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
        {product.image && (
          <img src={product.image} alt={product.title} className="mt-4 max-w-full h-auto rounded" />
        )}
      </div>
      <div className="mt-4 flex space-x-4">
        <Link href={`/dashboard/products/${product.id}/edit`} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Edit Product
        </Link>
        <Link href="/dashboard/products" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
          Back to List
        </Link>
      </div>
    </main>
  );
}
