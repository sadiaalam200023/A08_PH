
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#EDE7DE] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-[#FFFEFC] border border-[#E5DED4] shadow-sm rounded-2xl">
        <div className="card-body p-8">

          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Sign in to your StudioSpace account.
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="btn btn-outline border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
              Google
            </button>

            <button type="button" className="btn btn-outline border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
              GitHub
            </button>
          </div>

          <div className="divider text-xs text-gray-400">
            OR CONTINUE WITH EMAIL
          </div>

          {/* Email and Password */}
          <form className="space-y-4">

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Email address
                </span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full bg-white"
                required
              />
            </div>

            <div className="form-control">
              <div className="flex justify-between items-center">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Password
                  </span>
                </label>

                <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-gray-900">
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-gray-900 text-white hover:bg-gray-700 border-none"
            >
              Sign In
            </button>

          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Do not have an account?{" "}
            <Link href="/sign-up" className="font-medium text-gray-900 hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}