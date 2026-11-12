
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  category: string;
  location: string;
  customerEmail: string;
  bookingDate: string;
  hours: number;
  hourlyRate: number;
  securityDeposit: number;
  rentalCost: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export default function MyBookingsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  // Fetch bookings belonging to the logged-in user
  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      router.push("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/my-bookings?email=${encodeURIComponent(user.email)}`
        );

        const contentType = response.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          throw new Error("Server returned an invalid response.");
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }

        setBookings(data);
      } catch (error) {
        console.error("Fetch bookings error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Could not load your bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.email, isPending, router]);

  // Cancel booking
  const handleCancelBooking = async () => {
    if (!selectedBooking || !user?.email) return;

    setCancelling(true);

    try {
      const response = await fetch(
        `${API_URL}/bookings/${selectedBooking._id}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerEmail: user.email,
          }),
        }
      );

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error("Server returned an invalid response.");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to cancel booking");
      }

      // Update the booking status in the UI
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );

      toast.success("Booking cancelled successfully!");
      setSelectedBooking(null);
    } catch (error) {
      console.error("Cancel booking error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not cancel booking."
      );
    } finally {
      setCancelling(false);
    }
  };

  const getStatusStyle = (status: Booking["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6]">
        <span className="loading loading-spinner loading-lg text-[#98745B]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-[#98745B]">
            Your Reservations
          </p>

          <h1 className="text-3xl font-semibold text-[#302820] sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-[#77716B]">
            View and manage all the studio spaces you have booked.
          </p>
        </div>

        {/* Booking Count */}
        <div className="mb-6 flex flex-wrap gap-3">
          <span className="badge border-0 bg-[#EAE1D7] px-4 py-3 text-[#806047]">
            {bookings.length} Total Bookings
          </span>

          <span className="badge border-0 bg-yellow-100 px-4 py-3 text-yellow-800">
            {bookings.filter((b) => b.status === "Pending").length} Pending
          </span>

          <span className="badge border-0 bg-green-100 px-4 py-3 text-green-800">
            {bookings.filter((b) => b.status === "Confirmed").length} Confirmed
          </span>
        </div>

        {/* No Bookings */}
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-[#EAE4DC] bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-[#302820]">
              No bookings yet
            </h2>

            <p className="mt-2 text-sm text-[#77716B]">
              You havenot booked any studio spaces yet.
            </p>

            <button
              onClick={() => router.push("/studios")}
              className="btn mt-6 border-0 bg-[#98745B] text-white hover:bg-[#806047]"
            >
              Explore Studios
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#EAE4DC] bg-white shadow-sm">
            <table className="table min-w-262.5">
              <thead>
                <tr className="border-b border-[#EAE4DC] bg-[#FAF9F6] text-[#77716B]">
                  <th>Studio</th>
                  <th>Booking Date</th>
                  <th>Hours</th>
                  <th>Rental Cost</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-[#EAE4DC] text-[#302820] last:border-0"
                  >
                    {/* Studio Information */}
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.studioImage}
                          alt={booking.studioTitle}
                          className="h-16 w-20 rounded-lg object-cover"
                        />

                        <div>
                          <p className="font-semibold">
                            {booking.studioTitle}
                          </p>

                          <p className="mt-1 text-xs text-[#77716B]">
                            {booking.category}
                          </p>

                          <p className="mt-1 text-xs text-[#77716B]">
                            {booking.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Booking Date */}
                    <td className="text-sm">
                      {formatDate(booking.bookingDate)}
                    </td>

                    {/* Hours */}
                    <td className="text-sm">
                      {booking.hours}{" "}
                      {booking.hours === 1 ? "hour" : "hours"}
                    </td>

                    {/* Rental Cost */}
                    <td className="text-sm font-medium">
                      BDT {booking.rentalCost.toLocaleString("en-BD")}
                    </td>

                    {/* Total */}
                    <td className="text-sm font-semibold text-[#98745B]">
                      BDT {booking.totalAmount.toLocaleString("en-BD")}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge border-0 px-3 py-3 ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td>
                      {booking.status === "Pending" ? (
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="btn btn-sm border border-red-200 bg-white text-red-600 hover:bg-red-50"
                        >
                          Cancel Booking
                        </button>
                      ) : (
                        <span className="text-xs text-[#77716B]">
                          No action available
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="text-xl font-semibold text-[#302820]">
              Cancel Booking?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#77716B]">
              Are you sure you want to cancel your booking for{" "}
              <span className="font-semibold text-[#302820]">
                {selectedBooking.studioTitle}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-[#77716B]">
              Your booking status will change to Cancelled.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                disabled={cancelling}
                className="btn border border-[#EAE4DC] bg-white text-[#806047] hover:bg-[#FAF9F6]"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={handleCancelBooking}
                disabled={cancelling}
                className="btn border-0 bg-red-600 text-white hover:bg-red-700"
              >
                {cancelling ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
