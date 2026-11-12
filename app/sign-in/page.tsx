

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (error) {
        toast.error(error.message || "Sign in failed!");
        return;
      }

      if (data) {
        toast.success("Signed in successfully!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Social sign-in failed!");
      }
    } catch {
      toast.error("Unable to sign in with this provider.");
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE7DE] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-[#FFFEFC] rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-8">
         

          <h1 className="text-2xl font-semibold text-gray-800 mt-6">
            Welcome back!
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue to StudioSpace.
          </p>
        </div>

        {/* Sign-in Form */}
        <form
          onSubmit={handleEmailSignIn}
          className="space-y-4"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Email address
              </span>
            </label>

            <input
              type="email"
              name="email"
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
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-gray-900 text-white hover:bg-gray-700 border-none"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-gray-400 text-sm">
          OR SIGN IN WITH
        </div>

        {/* Social Sign-in */}
        <div className="flex flex-col gap-3">

          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="btn btn-outline w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          >
            Continue with Google
          </button>

          {/* <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="btn btn-outline w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          >
            Continue with GitHub
          </button> */}

        </div>

        {/* Sign-up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Donot have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[#96613F] hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
