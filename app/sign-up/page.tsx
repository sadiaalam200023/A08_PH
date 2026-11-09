


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEmailSignUp = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  const user = Object.fromEntries(formData.entries()) as {
    name: string;
    email: string;
    password: string;
  };

  // Password validation
  const password = user.password;

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return;
  }

  if (!/[A-Z]/.test(password)) {
    toast.error("Password must contain at least one uppercase letter.");
    return;
  }

  if (!/[a-z]/.test(password)) {
    toast.error("Password must contain at least one lowercase letter.");
    return;
  }

  setLoading(true);

  try {
    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    if (error) {
      toast.error(error.message || "Registration failed!");
      return;
    }

    if (data) {
      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    }
  } catch {
    toast.error("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleSocialSignUp = async (
    provider: "google" | "github"
  ) => {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Social sign-up failed!");
      }
    } catch {
      toast.error("Unable to continue with social sign-up.");
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE7DE] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-[#FFFEFC] rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-3xl font-bold text-[#96613F]"
          >
            StudioSpace
          </Link>

          <h1 className="text-2xl font-semibold text-gray-800 mt-6">
            Create your account
          </h1>

          <p className="text-gray-500 mt-2">
            Sign up to discover and book your ideal workspace.
          </p>
        </div>

        {/* Sign-up Form */}
        <form
          onSubmit={handleEmailSignUp}
          className="space-y-4"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Full name
              </span>
            </label>

            <input
              type="text"
              name="name"
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
  placeholder="Create a password"
  className="input input-bordered w-full bg-white"
  minLength={6}
  required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-gray-900 text-white hover:bg-gray-700 border-none"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-gray-400 text-sm">
          OR SIGN UP WITH
        </div>

        {/* Social Sign-up */}
        <div className="flex flex-col gap-3">

          <button
            type="button"
            onClick={() => handleSocialSignUp("google")}
            className="btn btn-outline w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          >
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignUp("github")}
            className="btn btn-outline w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          >
            Continue with GitHub
          </button>

        </div>

        {/* Sign-in Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[#96613F] hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
