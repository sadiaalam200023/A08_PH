

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#about" },
  ];

  return (
    <div className="navbar sticky top-0 z-50 border-b border-[#E8E4DC] bg-[#F8F7F4]/95 px-5 shadow-sm backdrop-blur-sm lg:px-8">

      {/* Logo */}
      <div className="navbar-start">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight text-[#34332E]"
        >
          <span className="text-2xl text-[#B47A52]">◉</span>
          StudioSpace
        </Link>
      </div>

      
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-2 px-1 text-sm font-medium text-[#55534D]">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-[#B47A52]"
                    : "hover:text-[#B47A52]"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

     
      <div className="navbar-end hidden gap-3 md:flex">
        <Link
          href="/login"
          className="btn btn-ghost btn-sm rounded-full text-[#34332E]"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="btn btn-sm rounded-full border-none bg-[#B47A52] px-5 text-white hover:bg-[#96613F]"
        >
          Register
        </Link>
      </div>

      
      <div className="navbar-end md:hidden">
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-square"
            aria-label="Open navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#34332E]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-[#E8E4DC] bg-[#F8F7F4] p-3 shadow-lg"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}

            <div className="my-2 border-t border-[#E8E4DC]" />

            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link
                href="/register"
                className="bg-[#B47A52] text-white hover:bg-[#96613F]"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
