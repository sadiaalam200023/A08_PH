
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

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

const initialForm = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  capacity: "",
  location: "",
  image: "",
  overview: "",
};

export default function AddStudioPage() {
  const router = useRouter();

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [form, setForm] = useState(initialForm);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  // Redirect users who are not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  // Updates the value of a form field
  const update = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // Adds or removes an amenity
  const handleAmenityChange = (amenity: string) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  };

  // Handles form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const studioData = {
        ...form,
        hourlyRate: Number(form.hourlyRate),
        securityDeposit: Number(form.securityDeposit),
        capacity: Number(form.capacity),
        amenities,

        // Logged-in host information
        ownerName: user.name,
        ownerEmail: user.email,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/add-studios`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studioData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add studio");
      }

      setMessage("Studio added successfully!");
      setMessageType("success");

      setForm(initialForm);
      setAmenities([]);

    } catch (error) {
      console.error("Error adding studio:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Loading while checking session
  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6]">
        <span className="loading loading-spinner loading-lg text-[#98745B]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Page Heading */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#98745B]">
            Host your space
          </p>

          <h1 className="text-3xl font-semibold text-[#302820] md:text-4xl">
            Add a New Studio
          </h1>

          <p className="mt-3 text-[#77716B]">
            Share your creative space with creators and professionals.
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
              <label className="mb-2 block text-sm font-medium">
                Studio Name
              </label>

              <input
                type="text"
                placeholder="e.g. The Creative Space"
                className="input input-bordered w-full"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                className="select select-bordered w-full"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
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
              <label className="mb-2 block text-sm font-medium">
                Studio Overview
              </label>

              <textarea
                placeholder="Describe your studio and what makes it special..."
                className="textarea textarea-bordered min-h-32 w-full"
                value={form.overview}
                onChange={(e) => update("overview", e.target.value)}
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
              <label className="mb-2 block text-sm font-medium">
                User Name
              </label>

              <input
                type="text"
                value={user?.name || ""}
                placeholder="Your account name"
                className="input input-bordered w-full bg-[#FAF9F6]"
                readOnly
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                User Email
              </label>

              <input
                type="email"
                value={user?.email || ""}
                placeholder="Your account email"
                className="input input-bordered w-full bg-[#FAF9F6]"
                readOnly
              />
            </div>

            <p className="text-xs text-[#77716B]">
              Host information is automatically taken from your logged-in account.
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
                <label className="mb-2 block text-sm font-medium">
                  Hourly Rate (BDT)
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 1500"
                  className="input input-bordered w-full"
                  value={form.hourlyRate}
                  onChange={(e) => update("hourlyRate", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Security Deposit (BDT)
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 2000"
                  className="input input-bordered w-full"
                  value={form.securityDeposit}
                  onChange={(e) =>
                    update("securityDeposit", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Maximum Capacity
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder="Number of people"
                  className="input input-bordered w-full"
                  value={form.capacity}
                  onChange={(e) => update("capacity", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Location
                </label>

                <input
                  type="text"
                  placeholder="e.g. Banani, Dhaka"
                  className="input input-bordered w-full"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          <div className="divider" />

          {/* Studio Image */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#302820]">
              Studio Image
            </h2>

            <label className="block text-sm font-medium">
              Image URL
            </label>

            <input
              type="url"
              placeholder="https://example.com/studio-image.jpg"
              className="input input-bordered w-full"
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              required
            />
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
                  className="flex cursor-pointer items-center gap-3 text-sm"
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

          {/* Submit */}
          <div className="space-y-4 pt-4">

            {message && (
              <p
                className={`rounded-lg p-3 text-sm ${
                  messageType === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="btn w-full border-0 bg-[#98745B] text-white hover:bg-[#806047]"
              disabled={loading || !user}
            >
              {loading ? "Submitting..." : "Add Studio"}
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}



