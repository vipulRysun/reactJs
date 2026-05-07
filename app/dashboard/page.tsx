import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_VALUE = 'authenticated';

export default async function DashboardPage() {
    console.log('DashboardPage Testing for logs');

    const name = 'vipul';
    // Dashboard screen new test log added
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (session?.value !== SESSION_VALUE) {
        console.log('tested new file new test comment added');
        redirect('/signin');
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6 space-y-6">
            <nav className="w-full max-w-4xl flex justify-around mb-4">
                <a href="/dashboard/users" className="text-lg font-medium text-indigo-700 hover:underline">User Management</a>
                <a href="/dashboard/products" className="text-lg font-medium text-indigo-700 hover:underline">Product Management</a>
            </nav>
            <section className="w-full max-w-4xl bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-indigo-200">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-fade-in">Welcome to the Dashboard</h1>
                <p className="text-lg text-gray-600 animate-fade-in delay-200">Manage users and products using the dummy API.</p>
            </section>
        </main>
    );
}
