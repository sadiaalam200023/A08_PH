


"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Studios", href: "/allstudios" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Unable to sign out.");
        return;
      }

      toast.success("Signed out successfully!");
      setIsMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong while signing out.");
    }
  };

  return (
    <nav className="bg-[#F8F7F4] border-b border-[#E5DED4]">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* Logo */}
        <div className="navbar-start">
          <Link
            href="/"
            className="text-2xl font-bold text-[#96613F]"
          >
            StudioSpace
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#5B5148] hover:text-[#B47A52]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Authentication */}
        <div className="navbar-end hidden lg:flex gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-[#B47A52]" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full bg-[#EDE7DE] flex items-center justify-center">
                  {user.image ? (
                    <img src={user.image} alt="Profile" />
                  ) : (
                    <span className="text-[#96613F] font-semibold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content bg-[#FFFEFC] rounded-xl z-50 mt-3 w-60 p-3 shadow-lg border border-[#E5DED4]"
              >
                <li className="menu-title">
                  <span className="text-[#96613F]">
                    {user.name}
                  </span>
                  <span className="text-xs font-normal text-[#8B8178]">
                    {user.email}
                  </span>
                </li>

                <li>
                  <Link href="/profile">
                    Update Profile Information
                  </Link>
                </li>
               
                  <li>
  <Link href="/my-listings">
    My Listings
  </Link>
</li>
                

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="btn btn-ghost text-[#96613F]"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="btn bg-[#B47A52] hover:bg-[#96613F] text-white border-none"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-end lg:hidden">
          <button
            type="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#96613F]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#FFFEFC] border-t border-[#E5DED4] px-4 py-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-[#5B5148] hover:text-[#B47A52]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="divider my-2" />

          {isPending ? (
            <span className="loading loading-spinner loading-sm text-[#B47A52]" />
          ) : user ? (
            <div className="flex flex-col gap-3">
              {/* Mobile User Information */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EDE7DE] flex items-center justify-center overflow-hidden">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[#96613F] font-semibold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold text-[#96613F]">
                    {user.name}
                  </span>
                  <span className="text-xs text-[#8B8178]">
                    {user.email}
                  </span>
                </div>
              </div>

              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-[#5B5148] hover:text-[#B47A52]"
              >
                Update Profile Information
              </Link>

  <li>
  <Link href="/my-listings">
    My Listings
  </Link>
</li>

              <button
                type="button"
                onClick={handleLogout}
                className="text-left py-2 text-red-600 hover:text-red-700"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/sign-in"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#96613F] py-2"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setIsMenuOpen(false)}
                className="btn bg-[#B47A52] hover:bg-[#96613F] text-white border-none"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
