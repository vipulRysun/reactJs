import Link from 'next/link';

// Server component displaying details of a user fetched from dummy API
export default async function UserDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const user = await res.json();

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">User Details</h1>
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-2xl">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Company:</strong> {user.company?.name}</p>
        <p><strong>Address:</strong> {user.address?.street}, {user.address?.city}</p>
      </div>
      <div className="mt-4 flex space-x-4">
        <Link href={`/dashboard/users/${user.id}/edit`} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Edit User
        </Link>
        <Link href="/dashboard/users" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
          Back to List
        </Link>
      </div>
    </main>
  );
}
