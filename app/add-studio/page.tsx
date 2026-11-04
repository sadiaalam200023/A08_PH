
"use client";

import { useState, type FormEvent } from "react";

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
  const [form, setForm] = useState(initialForm);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:8000/add-studios", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
});

const result = await res.json();
console.log(result);
    setLoading(true);
    setMessage("");

    const studioData = {
      ...form,
      hourlyRate: Number(form.hourlyRate),
      securityDeposit: Number(form.securityDeposit),
      capacity: Number(form.capacity),
      amenities,
    };

    
    console.log("Studio information:", studioData);

    setTimeout(() => {
      setLoading(false);
      setMessage("Studio information submitted successfully!");

      setForm(initialForm);
      setAmenities([]);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12">
      <div className="mx-auto max-w-3xl">

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
      value=""
      placeholder="Will be filled from your account"
      className="input input-bordered w-full"
      readOnly
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium">
      User Email
    </label>
    <input
      type="email"
      value=""
      placeholder="Will be filled from your account"
      className="input input-bordered w-full"
      readOnly
    />
  </div>
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

          {/* Image */}
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
              <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="btn w-full border-0 bg-[#98745B] text-white hover:bg-[#806047]"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add Studio"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}



