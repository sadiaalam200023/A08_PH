import Link from "next/link";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  image: string;
  location: string;
  rating: number;
}

async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(
      "http://localhost:8000/featured-studios",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch studios");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="bg-[#FAF9F6] px-5 py-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
         
          <h2 className="mt-2 text-3xl text-center font-semibold text-[#302820]">
            Featured Studios
          </h2>

          <p className="mt-3 text-[#77716B] text-center">
            Discover creative spaces for your next project.
          </p>
        </div>

        {studios.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No studios available yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
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

                  <Link
                    href={`/studios/${studio._id}`}
                    className="btn w-full border-0 bg-[#98745B] text-white hover:bg-[#806047]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        

      </div>
    </section>
  );
}