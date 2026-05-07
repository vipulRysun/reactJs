"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProductClientPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const text = await res.text();
      const data = text ? JSON.parse(text) : null;
      setProduct(data);
    };
    if (id) fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    setLoading(false);
    router.push(`/dashboard/products/${id}`);
  };

  if (!product) return <p className="text-center mt-8">Loading...</p>;

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Edit Product</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded shadow-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={product.title || ''}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            value={product.price || ''}
            onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={product.description || ''}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            rows={4}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? 'Saving...' : 'Update Product'}
        </button>
      </form>
      <Link href={`/dashboard/products/${id}`} className="mt-4 text-indigo-600 hover:underline">
        Back to Details
      </Link>
    </main>
  );
}
