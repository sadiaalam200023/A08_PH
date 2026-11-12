"use client";


import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  capacity: number;
  location: string;
  image: string;
  overview: string;
  amenities?: string[];
  rating?: number;
  reviewCount?: number;
  ownerName?: string;
  ownerEmail?: string;
}

export default function StudioDetailsPage() {
  const params = useParams<{ id: string }>();

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [hours, setHours] = useState(1);

  
  useEffect(() => {
    async function fetchStudio() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:8000/studios/${params.id}`,
          { cache: "no-store" }
        );

        if (res.status === 404) {
          throw new Error("Studio not found.");
        }

        if (!res.ok) {
          throw new Error("Failed to load studio details.");
        }

        const data: Studio = await res.json();
        setStudio(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchStudio();
    }
  }, [params.id]);

  const hourlyRate = Number(studio?.hourlyRate ?? 0);
  const securityDeposit = Number(studio?.securityDeposit ?? 0);
  const rentalCost = hourlyRate * hours;
  const totalEstimate = rentalCost + securityDeposit;
const router = useRouter();
  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] px-5 py-20">
        <div className="mx-auto max-w-6xl animate-pulse space-y-8">
          <div className="h-4 w-32 rounded bg-[#EAE4DC]" />
          <div className="h-10 w-2/3 rounded bg-[#EAE4DC]" />
          <div className="h-100 rounded-2xl bg-[#EAE4DC]" />
          <div className="grid gap-8 md:grid-cols-3">
            <div className="h-48 rounded-2xl bg-[#EAE4DC] md:col-span-2" />
            <div className="h-48 rounded-2xl bg-[#EAE4DC]" />
          </div>
        </div>
      </main>
    );
  }

  // Error / not found state
  if (error || !studio) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-5">
        <div className="max-w-md text-center">
          <p className="mb-3 text-5xl">📷</p>
          <h1 className="text-2xl font-semibold text-[#302820]">
            Studio unavailable
          </h1>
          <p className="mt-3 text-[#77716B]">
            {error || "We couldn't find this studio."}
          </p>
          <Link
            href="/studios"
            className="btn mt-6 border-0 bg-[#98745B] text-white hover:bg-[#806047]"
          >
            Explore Studios
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-10">
      <div className="mx-auto max-w-7xl">

       

        {/* Studio Heading */}
        <div className="mb-7">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="badge border-0 bg-[#EAE1D7] px-3 py-3 text-[#806047]">
              {studio.category}
            </span>

            {studio.rating !== undefined && (
              <span className="text-sm text-[#806047]">
                ★ {studio.rating}
                {studio.reviewCount !== undefined &&
                  ` (${studio.reviewCount} reviews)`}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#302820] sm:text-4xl">
            {studio.title}
          </h1>

          <p className="mt-3 flex items-center gap-2 text-[#77716B]">
            <span>📍</span>
            {studio.location}
          </p>
        </div>

        {/* Studio Image */}
        <div className="mb-12 overflow-hidden rounded-2xl">
          {studio.image ? (
            <img
              src={studio.image}
              alt={studio.title}
              className="h-70 w-full object-cover sm:h-105 lg:h-125"
            />
          ) : (
            <div className="flex h-70 items-center justify-center bg-[#EAE4DC] text-[#806047] sm:h-105">
              No studio image available
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-10 lg:col-span-2">

            {/* Overview */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-[#302820]">
                About This Space
              </h2>

              <p className="whitespace-pre-line leading-8 text-[#77716B]">
                {studio.overview || "No description available yet."}
              </p>
               <p className="mt-3 flex items-center gap-2 text-[#77716B]">
            <span className="badge border-0 bg-[#EAE1D7] px-3 py-3 text-[#806047]">Host Info</span>
           
            {studio.ownerEmail} 
          </p>
            </section>


            <div className="h-px bg-[#EAE4DC]" />

            {/* Workspace Details */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold text-[#302820]">
                Workspace Details
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#EAE4DC] bg-white p-5">
                  <p className="text-sm text-[#98745B]">Category</p>
                  <p className="mt-2 font-semibold text-[#302820]">
                    {studio.category}
                  </p>
                </div>

                <div className="rounded-xl border border-[#EAE4DC] bg-white p-5">
                  <p className="text-sm text-[#98745B]">Location</p>
                  <p className="mt-2 font-semibold text-[#302820]">
                    {studio.location}
                  </p>
                </div>

                <div className="rounded-xl border border-[#EAE4DC] bg-white p-5">
                  <p className="text-sm text-[#98745B]">Guest Capacity</p>
                  <p className="mt-2 font-semibold text-[#302820]">
                    {studio.capacity} people
                  </p>
                </div>

                <div className="rounded-xl border border-[#EAE4DC] bg-white p-5">
                  <p className="text-sm text-[#98745B]">Hourly Rate</p>
                  <p className="mt-2 font-semibold text-[#302820]">
                    BDT {hourlyRate.toLocaleString("en-BD")} / hr
                  </p>
                </div>

                <div className="rounded-xl border border-[#EAE4DC] bg-white p-5 sm:col-span-2">
                  <p className="text-sm text-[#98745B]">
                    Security Deposit
                  </p>
                  <p className="mt-2 font-semibold text-[#302820]">
                    BDT {securityDeposit.toLocaleString("en-BD")}
                  </p>
                  <p className="mt-1 text-xs text-[#77716B]">
                    Deposit amount required for a booking.
                  </p>
                </div>
              </div>
            </section>

            <div className="h-px bg-[#EAE4DC]" />

            {/* Amenities */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold text-[#302820]">
                Amenities & Facilities
              </h2>

              {studio.amenities && studio.amenities.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {studio.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-[#77716B]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAE1D7] text-sm text-[#806047]">
                        ✓
                      </span>
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#77716B]">
                  No amenities have been listed for this studio yet.
                </p>
              )}
            </section>

          </div>

          {/* Right Booking Card */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-[#EAE4DC] bg-white p-6 shadow-sm">
              <p className="text-sm text-[#77716B]">
                Starting from
              </p>

              <p className="mt-2 text-3xl font-semibold text-[#302820]">
                BDT {hourlyRate.toLocaleString("en-BD")}
                <span className="text-base font-normal text-[#77716B]">
                  {" "} / hour
                </span>
              </p>

              <div className="my-6 h-px bg-[#EAE4DC]" />

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm text-[#77716B]">
                    Capacity
                  </p>
                  <p className="font-medium text-[#302820]">
                    Up to {studio.capacity} people
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-[#77716B]">
                    Security Deposit
                  </p>
                  <p className="font-medium text-[#302820]">
                    BDT {securityDeposit.toLocaleString("en-BD")}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-[#77716B]">
                    Location
                  </p>
                  <p className="font-medium text-[#302820]">
                    {studio.location}
                  </p>
                </div>
              </div>

              <button
  onClick={() => {
    setShowBookingModal(false);

    router.push(
      `/book-studio/${studio._id}?date=${bookingDate}&hours=${hours}`
    );
  }}
  className="btn w-full border-0 bg-[#98745B] text-white hover:bg-[#806047]"
>
  Continue to Booking
</button>

             
            </div>
          </aside>
        </div>

        {/* Booking Estimate Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#302820]">
                  Booking Estimate
                </h2>

                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-2xl text-[#77716B] hover:text-[#302820]"
                  aria-label="Close booking estimate"
                >
                  ×
                </button>
              </div>

              <p className="mb-5 text-sm text-[#77716B]">
                Select a date and the number of hours to estimate your cost.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#302820]">
                    Booking Date
                  </label>

                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="input w-full border-[#EAE4DC] bg-[#FAF9F6] text-[#302820] focus:border-[#98745B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#302820]">
                    Number of Hours
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={hours}
                    onChange={(e) =>
                      setHours(Math.max(1, Math.min(24, Number(e.target.value))))
                    }
                    className="input w-full border-[#EAE4DC] bg-[#FAF9F6] text-[#302820] focus:border-[#98745B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="my-6 space-y-3 rounded-xl bg-[#FAF9F6] p-4">
                <div className="flex justify-between text-sm text-[#77716B]">
                  <span>
                    Rental ({hours} {hours === 1 ? "hour" : "hours"})
                  </span>
                  <span>
                    BDT {rentalCost.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-[#77716B]">
                  <span>Security Deposit</span>
                  <span>
                    BDT {securityDeposit.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="h-px bg-[#EAE4DC]" />

                <div className="flex justify-between font-semibold text-[#302820]">
                  <span>Estimated Total</span>
                  <span>
                    BDT {totalEstimate.toLocaleString("en-BD")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowBookingModal(false)}
                className="btn w-full border-0 bg-[#98745B] text-white hover:bg-[#806047]"
              >
              Make a Booking
              </button>

              
            </div>
          </div>
        )}

      </div>
    </main>
  );
}