

"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    subtitle: "YOUR CREATIVE SPACE AWAITS",
    title: "Find the perfect space for your next big idea.",
    description:
      "Discover inspiring photography studios, creative workspaces and production spaces designed to bring your vision to life.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
  {
    subtitle: "MAKE ROOM FOR CREATIVITY",
    title: "Where every great story finds its setting.",
    description:
      "From professional podcast rooms to cinematic production studios, find a space that fits your creative needs.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
  },
  {
    subtitle: "CREATE WITHOUT LIMITS",
    title: "Your vision deserves the right environment.",
    description:
      "Explore unique creative spaces, connect with studio hosts and make your next project happen.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
  },
];

const HomeHero = () => {
  return (
    <section className="mx-auto max-w-7xl px-3 pt-4 sm:px-5 sm:pt-6 lg:px-8">

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="overflow-hidden rounded-xl sm:rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex min-h-[440px] items-center bg-cover bg-center px-5 py-12 sm:min-h-[500px] sm:px-10 md:min-h-[550px] md:px-16 lg:px-20"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.25)), url(${slide.image})`,
              }}
            >
              <div className="max-w-2xl text-white">

                {/* Subtitle */}
                <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-[#E6C5A8] sm:mb-4 sm:text-xs sm:tracking-[0.25em]">
                  {slide.subtitle}
                </p>

                {/* Heading */}
                <h1 className="mb-4 text-3xl font-semibold leading-tight tracking-tight sm:mb-5 sm:text-4xl md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="mb-6 max-w-xl text-xs leading-6 text-white/85 sm:mb-8 sm:text-sm sm:leading-7 md:text-base">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 min-[400px]:flex-row sm:gap-4">

                  <Link
                    href="/studios"
                    className="btn min-h-11 rounded-md border-none bg-[#F8F7F4] px-5 text-sm font-semibold text-[#34332E] shadow-none hover:bg-[#B47A52] hover:text-white sm:px-6"
                  >
                    Explore Studios
                  </Link>

                  <Link
                    href="/studios"
                    className="btn min-h-11 rounded-md border border-white/70 bg-transparent px-5 text-sm font-semibold text-white shadow-none hover:border-white hover:bg-white hover:text-[#34332E] sm:px-6"
                  >
                    Host Your Space
                  </Link>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
};

export default HomeHero;
