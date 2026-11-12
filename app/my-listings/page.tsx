
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/app/lib/auth-client";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  hourlyRate: number;
  securityDeposit: number;
  capacity: number;
  ownerName?: string;
  ownerEmail?: string;
  rating?: number;
  reviewCount?: number;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export default function MyListingsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  // Fetch studios belonging to the logged-in user
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const fetchMyStudios = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/all-studios`);

        if (!response.ok) {
          throw new Error("Failed to fetch studio listings");
        }

        const data: Studio[] = await response.json();

        const userEmail = session.user.email?.toLowerCase();

        const myStudios = data.filter(
          (studio) =>
            studio.ownerEmail?.toLowerCase() === userEmail
        );

        setStudios(myStudios);
      } catch (error) {
        console.error("Error fetching listings:", error);
        toast.error("Could not load your studio listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudios();
  }, [session, isPending, router]);

  // Navigate to the edit form
  const handleUpdate = (studioId: string) => {
    router.push(`/upstudios/${studioId}`);
  };

  // Delete selected studio
  const handleDelete = async () => {
    if (!selectedStudio) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `${API_URL}/studios/${selectedStudio._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete studio");
      }

      // Remove deleted studio from the page
      setStudios((current) =>
        current.filter(
          (studio) => studio._id !== selectedStudio._id
        )
      );

      setSelectedStudio(null);

      toast.success("Studio deleted successfully!");
    } catch (error) {
      console.error("Error deleting studio:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting."
      );
    } finally {
      setDeleting(false);
    }
  };

  // Session loading
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6]">
        <span className="loading loading-spinner loading-lg text-[#98745B]" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#98745B]">
              Your spaces
            </p>

            <h1 className="text-3xl font-semibold text-[#302820] md:text-4xl">
              My Studio Listings
            </h1>

            <p className="mt-3 text-[#77716B]">
              Manage the creative spaces you have listed on StudioSpace.
            </p>
          </div>

          <button
            onClick={() => router.push("/add-studio")}
            className="btn border-0 bg-[#98745B] text-white hover:bg-[#806047]"
          >
            + Add New Studio
          </button>
        </div>

        {/* Listings table */}
        {studios.length === 0 ? (
          <div className="rounded-2xl border border-[#EAE4DC] bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-[#302820]">
              No studio listings yet
            </h2>

            <p className="mt-2 text-sm text-[#77716B]">
              You havenot added any studios. Start listing your creative space!
            </p>

            <button
              onClick={() => router.push("/add-studio")}
              className="btn mt-6 border-0 bg-[#98745B] text-white hover:bg-[#806047]"
            >
              Add Your First Studio
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#EAE4DC] bg-white shadow-sm">

            <div className="border-b border-[#EAE4DC] px-6 py-4">
              <p className="text-sm text-[#77716B]">
                Showing{" "}
                <span className="font-semibold text-[#302820]">
                  {studios.length}
                </span>{" "}
                {studios.length === 1 ? "studio" : "studios"}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-[#FAF9F6] text-[#77716B]">
                    <th className="py-5">Studio</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Hourly Rate</th>
                    <th>Capacity</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {studios.map((studio) => (
                    <tr
                      key={studio._id}
                      className="border-b border-[#EAE4DC] last:border-0"
                    >
                      {/* Studio image and title */}
                      <td>
                        <div className="flex min-w-52 items-center gap-3">
                          <img
                            src={studio.image}
                            alt={studio.title}
                            className="h-14 w-16 rounded-lg object-cover"
                          />

                          <div>
                            <p className="font-semibold text-[#302820]">
                              {studio.title}
                            </p>

                            <p className="text-xs text-[#77716B]">
                              ★ {studio.rating ?? 0} (
                              {studio.reviewCount ?? 0} reviews)
                            </p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge border-0 bg-[#EAE1D7] text-[#806047]">
                          {studio.category}
                        </span>
                      </td>

                      <td className="text-sm text-[#77716B]">
                        {studio.location}
                      </td>

                      <td className="font-medium text-[#98745B]">
                        BDT {studio.hourlyRate?.toLocaleString("en-BD")} / hr
                      </td>

                      <td className="text-sm text-[#302820]">
                        {studio.capacity} people
                      </td>

                      {/* Update and Delete buttons */}
                      <td>
                        <div className="flex min-w-40 justify-center gap-2">
                          <button
                            onClick={() => handleUpdate(studio._id)}
                            className="btn btn-sm border-0 bg-[#EAE1D7] text-[#806047] hover:bg-[#DED1C3]"
                          >
                            Update
                          </button>

                          <button
                            onClick={() => setSelectedStudio(studio)}
                            className="btn btn-sm border border-red-200 bg-white text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">

        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-300  text-xl text-red-600">
  !
</div>


            <h2 className="text-xl font-semibold text-[#302820]">
              Delete Studio Listing?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#77716B]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#302820]">
                {selectedStudio.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="btn border border-[#EAE4DC] bg-white text-[#302820] hover:bg-[#FAF9F6]"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn border-0 bg-red-600 text-white hover:bg-red-700"
              >
                {deleting ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
