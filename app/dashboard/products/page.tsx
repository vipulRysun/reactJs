import Link from 'next/link';

// Server component fetching products from dummy API
export default async function ProductsPage() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Product Management</h1>
      <Link
        href="/dashboard/products/add"
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Add New Product
      </Link>
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full bg-white rounded shadow-lg">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/dashboard/products/${product.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/dashboard/products/${product.id}/edit`}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
