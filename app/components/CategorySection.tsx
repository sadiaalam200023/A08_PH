import Link from "next/link";
import Image from "next/image";
const categories = [
  {
    name: "Photo Studios",
    image: "https://plus.unsplash.com/premium_photo-1691223714387-a74006933ffb?q=80&w=923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Perfect spaces for photography and portraits.",
  },
  {
    name: "Sound Stages",
    image: "https://images.unsplash.com/photo-1618609377864-68609b857e90?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Professional spaces for film and video production.",
  },
  {
    name: "Podcast Rooms",
    image: "https://plus.unsplash.com/premium_photo-1679079455767-1bbb40492d6a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Create your next podcast in a studio.",
  },
  {
    name: "Music Suites",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Spaces for recording and making music.",
  },
  {
    name: "Art Workshops",
    image: "https://images.unsplash.com/photo-1773499129465-4eda9cfd1147?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Creative spaces to bring your ideas to life.",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-[#F0EBE4] px-5 py-10 mb-2 mt-2">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
           <h2 className="text-3xl font-semibold text-[#302820]">
            Browse by Category
          </h2>

        </div>

        {/* Category Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/studios?category=${encodeURIComponent(category.name)}`}
              className="group overflow-hidden rounded-2xl border border-[#EAE4DC] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Information */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#302820]">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-[#77716B]">
                  {category.description}
                </p>

                <p className="mt-4 text-sm font-medium text-[#98745B]">
                  Explore spaces →
                </p>
              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}