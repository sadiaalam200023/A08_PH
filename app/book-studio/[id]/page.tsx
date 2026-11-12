
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  hourlyRate: number;
  securityDeposit: number;
  capacity: number;
  ownerEmail: string;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const studioId = params.id as string;

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [bookingDate, setBookingDate] = useState(
    searchParams.get("date") || ""
  );
  const [hours, setHours] = useState(
    Number(searchParams.get("hours")) || 1
  );

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const rentalCost = studio ? studio.hourlyRate * hours : 0;
  const securityDeposit = studio?.securityDeposit || 0;
  const totalAmount = rentalCost + securityDeposit;

  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // Check login and fetch studio information
  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    const fetchStudio = async () => {
      try {
        const response = await fetch(
          `${API_URL}/studios/${studioId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch studio");
        }

        setStudio(data);
      } catch (error) {
        console.error(error);
        toast.error("Could not load studio information.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [studioId, user, isPending, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studio || !user?.email) {
      toast.error("Please sign in before booking.");
      return;
    }

    if (!bookingDate || bookingDate < minDate) {
      toast.error("Please select a valid booking date.");
      return;
    }

    if (hours < 1 || hours > 24) {
      toast.error("Please select between 1 and 24 hours.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/add-bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studioId: studio._id,
          customerEmail: user.email,
          bookingDate,
          hours,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error("The server returned an invalid response.");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed.");
      }

      toast.success("Your booking request has been submitted!");

      router.push("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit booking."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6]">
        <span className="loading loading-spinner loading-lg text-[#98745B]" />
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6] text-[#302820]">
        Studio not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 text-sm font-medium text-[#98745B] hover:text-[#806047]"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-semibold text-[#302820]">
          Complete Your Booking
        </h1>

        <p className="mt-2 text-[#77716B]">
          Review your studio details and confirm your booking information.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Studio Information */}
          <section className="rounded-2xl border border-[#EAE4DC] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-[#302820]">
              Studio Information
            </h2>

            <div className="flex flex-col gap-5 sm:flex-row">
              <img
                src={studio.image}
                alt={studio.title}
                className="h-48 w-full rounded-xl object-cover sm:w-56"
              />

              <div className="space-y-2">
                <span className="badge border-0 bg-[#EAE1D7] text-[#806047]">
                  {studio.category}
                </span>

                <h3 className="text-xl font-semibold text-[#302820]">
                  {studio.title}
                </h3>

                <p className="text-sm text-[#77716B]">
                  📍 {studio.location}
                </p>

                <p className="text-sm text-[#77716B]">
                  Capacity: Up to {studio.capacity} people
                </p>

                <p className="font-semibold text-[#98745B]">
                  BDT {studio.hourlyRate.toLocaleString("en-BD")} / hour
                </p>
              </div>
            </div>
          </section>

          {/* Customer Information */}
          <section className="rounded-2xl border border-[#EAE4DC] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-[#302820]">
              Your Information
            </h2>

            <label className="mb-2 block text-sm font-medium text-[#302820]">
              Email Address
            </label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input w-full border-[#EAE4DC] bg-[#FAF9F6] text-[#77716B]"
            />

            <p className="mt-2 text-xs text-[#77716B]">
              This is the email associated with your account.
            </p>
          </section>

          {/* Booking Date and Hours */}
          <section className="rounded-2xl border border-[#EAE4DC] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-[#302820]">
              Booking Details
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#302820]">
                  Booking Date
                </label>

                <input
                  type="date"
                  required
                  min={minDate}
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
                  required
                  min="1"
                  max="24"
                  value={hours}
                  onChange={(e) =>
                    setHours(
                      Math.max(1, Math.min(24, Number(e.target.value)))
                    )
                  }
                  className="input w-full border-[#EAE4DC] bg-[#FAF9F6] text-[#302820] focus:border-[#98745B] focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Price Summary */}
          <section className="rounded-2xl border border-[#EAE4DC] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-[#302820]">
              Booking Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-[#77716B]">
                <span>
                  Rental ({hours} {hours === 1 ? "hour" : "hours"})
                </span>
                <span>BDT {rentalCost.toLocaleString("en-BD")}</span>
              </div>

              <div className="flex justify-between text-[#77716B]">
                <span>Security Deposit</span>
                <span>
                  BDT {securityDeposit.toLocaleString("en-BD")}
                </span>
              </div>

              <div className="h-px bg-[#EAE4DC]" />

              <div className="flex justify-between text-base font-semibold text-[#302820]">
                <span>Estimated Total</span>
                <span>BDT {totalAmount.toLocaleString("en-BD")}</span>
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn border border-[#EAE4DC] bg-white text-[#806047] hover:bg-[#FAF9F6]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="btn border-0 bg-[#98745B] px-8 text-white hover:bg-[#806047]"
            >
              {submitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Submit Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
