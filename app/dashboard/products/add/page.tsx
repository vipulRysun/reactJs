"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function AddProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price: Number(price), description }),
    });
    setLoading(false);
    // redirect back to list
    window.location.href = '/dashboard/products';
  };

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Add New Product</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded shadow-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          {loading ? 'Saving...' : 'Create Product'}
        </button>
      </form>
      <Link href="/dashboard/products" className="mt-4 text-indigo-600 hover:underline">
        Back to Products List
      </Link>
    </main>
  );
}
