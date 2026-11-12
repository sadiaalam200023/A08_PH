
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/app/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const availableAmenities = [
  "Wi-Fi",
  "Air Conditioning",
  "Lighting Equipment",
  "Soundproofing",
  "Parking",
  "Projector",
  "Changing Room",
  "Restroom",
];

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
  amenities: string[];
  ownerName?: string;
  ownerEmail?: string;
}

interface StudioForm {
  title: string;
  category: string;
  hourlyRate: string;
  securityDeposit: string;
  capacity: string;
  location: string;
  image: string;
  overview: string;
}

const initialForm: StudioForm = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  capacity: "",
  location: "",
  image: "",
  overview: "",
};

export default function EditStudioPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const studioId = params.id;

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [form, setForm] = useState<StudioForm>(initialForm);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [studio, setStudio] = useState<Studio | null>(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Redirect users who are not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  // Fetch existing studio information
  useEffect(() => {
    if (isPending || !session || !studioId) return;

    const fetchStudio = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/studios/${studioId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load studio");
        }

        const fetchedStudio: Studio = data;

        // Check whether the logged-in user owns this studio
        if (
          fetchedStudio.ownerEmail?.toLowerCase() !==
          session.user.email?.toLowerCase()
        ) {
          toast.error("You are not authorized to edit this studio.");
          router.replace("/my-listings");
          return;
        }

        setStudio(fetchedStudio);

        // Fill the form with existing information
        setForm({
          title: fetchedStudio.title || "",
          category: fetchedStudio.category || "",
          hourlyRate: String(fetchedStudio.hourlyRate ?? ""),
          securityDeposit: String(
            fetchedStudio.securityDeposit ?? ""
          ),
          capacity: String(fetchedStudio.capacity ?? ""),
          location: fetchedStudio.location || "",
          image: fetchedStudio.image || "",
          overview: fetchedStudio.overview || "",
        });

        setAmenities(fetchedStudio.amenities || []);
      } catch (error) {
        console.error("Error fetching studio:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Could not load studio information."
        );

        router.replace("/my-listings");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [session, isPending, studioId, router]);

  // Update form fields
  const updateField = (field: keyof StudioForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // Add or remove amenities
  const handleAmenityChange = (amenity: string) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  };

  // Cancel editing
  const handleCancel = () => {
    router.push("/my-listings");
  };

  // Confirm update
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studio || !user) {
      toast.error("Unable to update studio.");
      return;
    }

    try {
      setUpdating(true);

      const updatedStudio = {
        ...form,
        hourlyRate: Number(form.hourlyRate),
        securityDeposit: Number(form.securityDeposit),
        capacity: Number(form.capacity),
        amenities,
      };

      const response = await fetch(
        `${API_URL}/studios/${studioId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudio),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update studio");
      }

      toast.success("Studio updated successfully!");

      router.push("/my-listings");
    } catch (error) {
      console.error("Error updating studio:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setUpdating(false);
    }
  };

  // Loading state
  if (isPending || loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6]">
        <span className="loading loading-spinner loading-lg text-[#98745B]" />
      </div>
    );
  }

  if (!studio) return null;

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#98745B]">
            Manage your space
          </p>

          <h1 className="text-3xl font-semibold text-[#302820] md:text-4xl">
            Update Studio
          </h1>

          <p className="mt-3 text-[#77716B]">
            Make changes to your studio listing and confirm when you are done.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-[#EAE4DC] bg-white p-6 shadow-sm md:p-9"
        >

          {/* Basic Information */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-[#302820]">
              Basic Information
            </h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#302820]">
                Studio Name
              </label>

              <input
                type="text"
                className="input input-bordered w-full"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#302820]">
                Category
              </label>

              <select
                className="select select-bordered w-full"
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#302820]">
                Studio Overview
              </label>

              <textarea
                className="textarea textarea-bordered min-h-32 w-full"
                value={form.overview}
                onChange={(e) => updateField("overview", e.target.value)}
                required
              />
            </div>
          </section>

          <div className="divider" />

          {/* Host Information */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-[#302820]">
              Host Information
            </h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#302820]">
                Host Name
              </label>

              <input
                type="text"
                value={studio.ownerName || user?.name || ""}
                className="input input-bordered w-full bg-[#FAF9F6]"
                readOnly
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#302820]">
                Host Email
              </label>

              <input
                type="email"
                value={studio.ownerEmail || user?.email || ""}
                className="input input-bordered w-full bg-[#FAF9F6]"
                readOnly
              />
            </div>

            <p className="text-xs text-[#77716B]">
              Host information cannot be changed from this form.
            </p>
          </section>

          <div className="divider" />

          {/* Pricing and Capacity */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-[#302820]">
              Pricing & Capacity
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#302820]">
                  Hourly Rate (BDT)
                </label>

                <input
                  type="number"
                  min="1"
                  className="input input-bordered w-full"
                  value={form.hourlyRate}
                  onChange={(e) =>
                    updateField("hourlyRate", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#302820]">
                  Security Deposit (BDT)
                </label>

                <input
                  type="number"
                  min="0"
                  className="input input-bordered w-full"
                  value={form.securityDeposit}
                  onChange={(e) =>
                    updateField("securityDeposit", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#302820]">
                  Maximum Capacity
                </label>

                <input
                  type="number"
                  min="1"
                  className="input input-bordered w-full"
                  value={form.capacity}
                  onChange={(e) =>
                    updateField("capacity", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#302820]">
                  Location
                </label>

                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={form.location}
                  onChange={(e) =>
                    updateField("location", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </section>

          <div className="divider" />

          {/* Image */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#302820]">
              Studio Image
            </h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#302820]">
                Image URL
              </label>

              <input
                type="url"
                className="input input-bordered w-full"
                value={form.image}
                onChange={(e) => updateField("image", e.target.value)}
                required
              />
            </div>

            {form.image && (
              <div>
                <p className="mb-2 text-sm text-[#77716B]">
                  Image Preview
                </p>

                <img
                  src={form.image}
                  alt="Studio preview"
                  className="h-52 w-full rounded-xl border border-[#EAE4DC] object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </section>

          <div className="divider" />

          {/* Amenities */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#302820]">
              Available Amenities
            </h2>

            <p className="text-sm text-[#77716B]">
              Select all amenities available in your studio.
            </p>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-3 text-sm text-[#302820]"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                  />

                  {amenity}
                </label>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#EAE4DC] pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={updating}
              className="btn border border-[#EAE4DC] bg-white text-[#302820] hover:bg-[#FAF9F6]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="btn border-0 bg-[#98745B] text-white hover:bg-[#806047]"
            >
              {updating ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Updating...
                </>
              ) : (
                "Confirm Update"
              )}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
