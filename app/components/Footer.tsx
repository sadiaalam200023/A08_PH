


"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace this with your newsletter API when available.
      toast.success("Thanks for subscribing to StudioSpace!");
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#302820] text-[#F8F5F0]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">
                Studio<span className="text-[#C9A88D]">Space</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#C8BEB3]">
              A creative space for every big idea. Discover and book inspiring
              studios, connect with creators, and bring your next project to life.
            </p>

            <div className="mt-6 flex gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#65594E] text-[#E9DED3] transition hover:border-[#C9A88D] hover:bg-[#98745B]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#65594E] text-[#E9DED3] transition hover:border-[#C9A88D] hover:bg-[#98745B]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.4-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
                </svg>
              </a>

              {/* X - New X logo */}
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#65594E] text-[#E9DED3] transition hover:border-[#C9A88D] hover:bg-[#98745B]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.8 2h6.5l4.5 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#65594E] text-[#E9DED3] transition hover:border-[#C9A88D] hover:bg-[#98745B]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.7V21h-3.8v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.4V9Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-[#C8BEB3]">
              <li><Link href="/" className="transition hover:text-[#C9A88D]">Home</Link></li>
              <li><Link href="/studios" className="transition hover:text-[#C9A88D]">Explore Studios</Link></li>
              <li><Link href="/my-listings" className="transition hover:text-[#C9A88D]">My Listings</Link></li>
              <li><Link href="/my-bookings" className="transition hover:text-[#C9A88D]">My Bookings</Link></li>
              <li><Link href="/about" className="transition hover:text-[#C9A88D]">About Us</Link></li>
              <li><Link href="/contact" className="transition hover:text-[#C9A88D]">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Popular Categories
            </h3>
            <ul className="space-y-3 text-sm text-[#C8BEB3]">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category)}`}
                    className="transition hover:text-[#C9A88D]"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Stay Inspired
            </h3>
            <p className="mb-4 text-sm leading-6 text-[#C8BEB3]">
              Get creative space updates, studio discoveries, and inspiration
              delivered to your inbox.
            </p>

            <form onSubmit={handleNewsletter} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-[#65594E] bg-[#40362D] px-4 py-3 text-sm text-white outline-none placeholder:text-[#A99C8F] focus:border-[#C9A88D]"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full border-0 bg-[#98745B] text-white hover:bg-[#806047]"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-[#51463D] pt-7">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-[#B8ACA0]">
              2026 StudioSpace. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-5 text-xs text-[#B8ACA0]">
              <Link href="/terms" className="transition hover:text-[#C9A88D]">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="transition hover:text-[#C9A88D]">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
