
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#EDE7DE] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-[#FFFEFC] border border-[#E5DED4] shadow-sm rounded-2xl">
        <div className="card-body p-8">

          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Create an account
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Join StudioSpace and discover creative spaces.
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
            OR SIGN UP WITH EMAIL
          </div>

          {/* Registration Form */}
          <form className="space-y-4">

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Full name
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-white"
                required
              />
            </div>

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
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="input input-bordered w-full bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-gray-900 text-white hover:bg-gray-700 border-none"
            >
              Create Account
            </button>

          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-gray-900 hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}
