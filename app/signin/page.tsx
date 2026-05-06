export default function SignInPage() {
    console.log('SignInPage');
    // sign in screen
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
                <p className="mt-2 text-sm text-slate-600">Enter your credentials to continue.</p>

                <form method="post" action="/auth/signin" className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            placeholder="you@example.com"
                        />
                    </div>
                    {/* signin page */}
                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                    >
                        Sign in
                    </button>
                </form>
                <p className="mt-4 text-xs text-slate-500">Demo login: demo@example.com / Passw0rd!</p>
            </section>
        </main>
    );
}
