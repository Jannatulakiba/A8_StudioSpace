"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    kicker: "For photographers & film crews",
    title: "Shoot in a space built for the shot.",
    text: "Cyc walls, sound stages and podcast rooms from verified hosts — priced by the hour, not the day.",
    img: "/studios/1.jpg",
    alt: "Photo studio with a vinyl record wall and a white cyc",
  },
  {
    kicker: "For podcasters & musicians",
    title: "Record clean audio, first take.",
    text: "Treated rooms with real mics and monitors. Walk in, plug in, press record.",
    img: "/studios/2.jpg",
    alt: "White cyc wall with two softbox lights",
  },
  {
    kicker: "For space owners",
    title: "Got a space that sits empty? List it.",
    text: "Set your hourly rate and open hours. Creators book and pay you directly.",
    img: "/studios/4.jpg",
    alt: "Production space with camera gear ready for a shoot",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a111c] text-[#eaf0f8]">
      <Swiper
        modules={[Autoplay, EffectFade, Keyboard, Navigation, Pagination]}
        effect="fade"
        loop
        navigation
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        speed={900}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="hero-swiper"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.img}>
            <div className="relative min-h-[540px] overflow-hidden sm:min-h-[580px] md:min-h-[620px]">
              {/* slide-specific full-bleed visual */}
              <Image
                src={s.img}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="hero-bg object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-[#0a111c]/95 via-[#0a111c]/80 to-[#0a111c]/55"
              />

              <div className="wrap relative z-10 grid min-h-[540px] items-center pb-28 pt-14 sm:min-h-[580px] md:min-h-[620px]">
                <div className="hero-text max-w-[62ch]">
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                    {s.kicker}
                  </p>
                  <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
                    {s.title}
                  </h1>
                  <p className="my-5 max-w-[48ch] text-lg text-[#b4c0d2]">{s.text}</p>
                  <div className="cta flex flex-wrap gap-3">
                    <Link href="/studios" className="btn">
                      Explore Studios
                    </Link>
                    <Link
                      href="/add-studio"
                      className="btn btn-outline !border-white/40 !text-white"
                    >
                      Host Your Space
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
