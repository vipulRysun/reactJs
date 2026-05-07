import Link from 'next/link';

// Server component fetching users from dummy API
export default async function UsersPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">User Management</h1>
      <Link
        href="/dashboard/users/add"
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Add New User
      </Link>
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full bg-white rounded shadow-lg">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/dashboard/users/${user.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/dashboard/users/${user.id}/edit`}
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
