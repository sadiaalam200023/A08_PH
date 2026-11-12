
import Link from "next/link";

const bookingSteps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore a curated collection of creative studios and find the perfect space for your next project.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5M10.5 7.5v6M7.5 10.5h6" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date and the number of hours that work best for your creative schedule.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M8 14h3M8 17h6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Submit your booking request with a clear price estimate and keep track of your reservation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
        <path d="M5 12.5 10 17l9-10" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Show up, bring your ideas to life, and make something extraordinary in your chosen space.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
        <path d="M4 20h16M6 16l9-9 3 3-9 9H6v-3Z" />
        <path d="m14 8 2-2 3 3-2 2" />
      </svg>
    ),
  },
];

const guarantees = [
  {
    title: "Liability Protection",
    description:
      "Clear booking information and platform guidelines help creators and hosts understand their responsibilities.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Verified Profiles",
    description:
      "Profile information helps creators learn more about the hosts and spaces before making a booking.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2M16 11l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Equipment Safety",
    description:
      "Studio details and equipment information help creators understand the facilities available at each location.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V4h8v3M12 11v5M9.5 13.5h5" />
      </svg>
    ),
  },
  {
    title: "Host Support",
    description:
      "Reach out to your studio host for booking-related questions and assistance with your visit.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
        <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
        <rect x="3" y="12" width="4" height="7" rx="2" />
        <rect x="17" y="12" width="4" height="7" rx="2" />
        <path d="M17 19a5 5 0 0 1-5 3h-2" />
      </svg>
    ),
  },
];

export default function HomeSections() {
  return (
    <>
      {/* Section 1: How Booking Works */}
      <section className="bg-[#FAF9F6] px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="rounded-full bg-[#EAE1D7] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#806047]">
              Simple & Seamless
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#302820] sm:text-4xl">
              How Booking Works
            </h2>

            <p className="mt-4 text-base leading-7 text-[#77716B]">
              Your next creative project is just a few steps away. Find your
              space, book your time, and get ready to create.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bookingSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-[#EAE4DC] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAE1D7] text-[#98745B]">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-bold text-[#EAE4DC]">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-semibold text-[#302820]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#77716B]">
                  {step.description}
                </p>

                {index !== 3 && (
                  <div className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-[#EAE4DC] bg-[#FAF9F6] text-[#98745B] lg:flex">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/allstudios"
              className="btn border-0 bg-[#98745B] px-8 text-white hover:bg-[#806047]"
            >
              Explore Studios
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Host Guarantee & Creator Support */}
      <section className="bg-[#F0EBE4] px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#806047]">
                Your Creativity Matters
              </span>

              <h2 className="mt-6 max-w-lg text-3xl font-bold leading-tight tracking-tight text-[#302820] sm:text-4xl">
                A Better Experience for Hosts & Creators
              </h2>

              <p className="mt-5 max-w-lg text-base leading-8 text-[#77716B]">
                We believe great creative work starts with a space where
                everyone feels informed and supported. StudioSpace brings
                creators and studio hosts together with clear information and
                helpful booking resources.
              </p>

              <Link
                href="/studios"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-[#806047] transition hover:gap-3"
              >
                Find Your Creative Space <span>→</span>
              </Link>
            </div>

            {/* Guarantee Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {guarantees.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E5DED4] bg-[#FFFEFC] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAE1D7] text-[#98745B]">
                    {item.icon}
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-[#302820]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#77716B]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-[#302820] px-7 py-10 text-center sm:px-12">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Have a space worth sharing?
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#C8BEB3]">
              Join our creative community and let other creators discover your
              studio.
            </p>

            <Link
              href="/add-studio"
              className="btn mt-6 border-0 bg-[#98745B] px-8 text-white hover:bg-[#806047]"
            >
              List Your Studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
