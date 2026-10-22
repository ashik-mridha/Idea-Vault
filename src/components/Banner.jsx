"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Validate Your Next Big Idea",
    description:
      "Share startup concepts with founders, mentors, and innovators who help refine your vision through real feedback.",
    image: "/assets/banner-1.webp",
  },
  {
    title: "Collaborate With the Community",
    description:
      "Explore ideas across Tech, Health, AI, and more. Comment, discuss, and build momentum together.",
    image: "/assets/banner-2.jpg",
  },
  {
    title: "Turn Inspiration Into Action",
    description:
      "From problem statements to proposed solutions, IdeaVault helps you structure and showcase your startup pitch.",
    image: "/assets/banner-3.jpg",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-label="Welcome" className="w-11/12 max-w-7xl mx-auto mt-6">
      <div className="relative h-[60vh] min-h-96 md:h-[70vh] overflow-hidden rounded-2xl">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => {
            const Heading = index === 0 ? "h1" : "h2";
            return (
              <div key={slide.title} className="relative h-full w-full shrink-0" aria-hidden={index !== current}>
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1280px) 92vw, 1280px"
                  className="object-cover"
                />
                <div className="relative flex h-full flex-col justify-center bg-black/55 px-6 md:px-16">
                  <Heading className="mb-4 max-w-2xl text-3xl font-bold text-white md:text-5xl">
                    {slide.title}
                  </Heading>
                  <p className="mb-8 max-w-xl text-base text-white/90 md:text-lg">{slide.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/items" className="btn-primary" tabIndex={index === current ? 0 : -1}>
                      Explore Ideas
                    </Link>
                    <Link
                      href="/items/add"
                      className="btn border border-white/70 text-white hover:bg-white/15"
                      tabIndex={index === current ? 0 : -1}
                    >
                      Share Your Idea
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Show slide ${i + 1}: ${slide.title}`}
              aria-current={i === current}
              onClick={() => setCurrent(i)}
              className={`h-3 w-3 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                i === current ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
