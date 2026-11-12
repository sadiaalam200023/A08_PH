


"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  image?: string;
  hourlyRate?: number;
  securityDeposit?: number;
  rating?: number;
  reviewCount?: number;
  capacity?: number;
}

const categories = [
  "All Studios",
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

export default function AllStudiosPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All Studios");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/all-studios`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch studios");
        }

        const data = await response.json();
        setStudios(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load studios. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  const filteredStudios = useMemo(() => {
    if (selectedCategory === "All Studios") {
      return studios;
    }

    return studios.filter(
      (studio) =>
        studio.category?.trim().toLowerCase() ===
        selectedCategory.toLowerCase()
    );
  }, [studios, selectedCategory]);

  const handleViewDetails = (id: string) => {
    if (isPending) return;
//
    if (!session) {
      router.push(
        `/sign-in`
      );
      return;
    }

    router.push(`/studios/${id}`);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-5 mt-0">
        
          <h1 className="text-3xl text-center font-semibold tracking-tight text-[#302820] sm:text-4xl">
            All Studio Spaces
          </h1>
        </div>

        {/* Category Filters */}
        <section className="mb-5">
          <h2 className="mb-4 text-lg font-semibold text-[#302820]">
            Browse by Category
          </h2>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                  selectedCategory === category
                    ? "border-[#98745B] bg-[#98745B] text-white"
                    : "border-[#EAE4DC] bg-white text-[#806047] hover:border-[#98745B] hover:bg-[#EAE1D7]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Studio Count */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-[#302820]">
            {selectedCategory === "All Studios"
              ? "Available Studios"
              : selectedCategory}
          </h2>

          <p className="text-sm text-[#77716B]">
            {filteredStudios.length}{" "}
            {filteredStudios.length === 1 ? "studio" : "studios"} found
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <span className="loading loading-spinner loading-lg text-[#98745B]"></span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-[#EAE4DC] bg-white p-8 text-center">
            <p className="text-[#77716B]">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-[#98745B] px-5 py-2 text-white hover:bg-[#806047]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredStudios.length === 0 && (
          <div className="rounded-2xl border border-[#EAE4DC] bg-white px-5 py-20 text-center">
            <h3 className="text-xl font-semibold text-[#302820]">
              No studios found
            </h3>

            <p className="mt-2 text-[#77716B]">
              There are currently no studios in this category.
            </p>

            <button
              onClick={() => setSelectedCategory("All Studios")}
              className="mt-5 rounded-lg bg-[#98745B] px-5 py-2.5 text-white hover:bg-[#806047]"
            >
              View All Studios
            </button>
          </div>
        )}

        {/* Studio Cards */}
     
{/* Studio Cards */}
{!loading && !error && filteredStudios.length > 0 && (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {filteredStudios.map((studio) => (
      <div
        key={studio._id}
        className="overflow-hidden rounded-2xl border border-[#EAE4DC] bg-white shadow-sm"
      >
        <div className="relative">
          <img
            src={studio.image}
            alt={studio.title}
            className="h-56 w-full object-cover"
          />

          <span className="badge absolute left-4 top-4 border-0 bg-white text-[#806047]">
            {studio.category}
          </span>

          <span className="badge absolute right-4 top-4 border-0 bg-white text-[#302820]">
            ★ {studio.rating ?? 0}
          </span>
        </div>

        <div className="space-y-3 p-5">
          <h3 className="text-xl font-semibold text-[#302820]">
            {studio.title}
          </h3>

          <p className="text-sm text-[#77716B]">
            {studio.location}
          </p>

          <p className="font-semibold text-[#98745B]">
            BDT {studio.hourlyRate} / hr
          </p>

          <button
            onClick={() => handleViewDetails(studio._id)}
            disabled={isPending}
            className="btn w-full border-0 bg-[#98745B] text-white hover:bg-[#806047]"
          >
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>
)}

      </div>
    </main>
  );
}
