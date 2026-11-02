import HeroSlider from "@/components/home/HeroSlider";
import Marquee from "@/components/home/Marquee";
import StatsBand from "@/components/home/StatsBand";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import Categories from "@/components/home/Categories";
import HowItWorks from "@/components/home/HowItWorks";
import Guarantee from "@/components/home/Guarantee";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Marquee />
      <StatsBand />
      <FeaturedStudios />
      <Categories />
      <HowItWorks />
      <Guarantee />
    </>
  );
}
