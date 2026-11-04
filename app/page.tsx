


import HomeHero from "@/app/components/HomeHero";
import FeaturedStudios from "./components/FeaturedStudios";
import CategorySection from "./components/CategorySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      <HomeHero />
      <FeaturedStudios/>
      <CategorySection/>
    </main>
  );
}

