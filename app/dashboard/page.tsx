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
        <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <section className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
                <p className="mt-3 text-slate-600">You are signed in successfully using the demo credentials.</p>
            </section>
        </main>
    );
}
