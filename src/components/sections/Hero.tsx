"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import gsap from "gsap";
import { heroBanners } from "@/data/heroBanners";

const AUTOPLAY_MS = 6000;
const SLIDE_DURATION = 1.6;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const total = heroBanners.length;

  const animateSlideContent = useCallback((index: number) => {
    const slide = slideRefs.current[index];
    if (!slide) return;

    const parts = slide.querySelectorAll(
      ".slide-badge, .slide-title, .slide-highlight, .slide-subtitle, .slide-cta"
    );

    gsap.fromTo(
      parts,
      { opacity: 0, y: 28, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      }
    );

    const image = slide.querySelector(".slide-image");
    if (image) {
      gsap.fromTo(
        image,
        { scale: 1.06, transformOrigin: "top center" },
        {
          scale: 1,
          transformOrigin: "top center",
          duration: SLIDE_DURATION + 0.4,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const animateToSlide = useCallback(
    (index: number) => {
      const normalized = ((index % total) + total) % total;
      const prevSlide = slideRefs.current[activeIndexRef.current];

      if (prevSlide) {
        const prevParts = prevSlide.querySelectorAll(
          ".slide-badge, .slide-title, .slide-highlight, .slide-subtitle, .slide-cta"
        );
        gsap.to(prevParts, {
          opacity: 0,
          y: -16,
          duration: 0.35,
          ease: "power2.in",
        });
      }

      gsap.to(trackRef.current, {
        xPercent: -(normalized * 100) / total,
        duration: SLIDE_DURATION,
        ease: "expo.inOut",
        onComplete: () => {
          activeIndexRef.current = normalized;
          setActiveIndex(normalized);
          isAnimatingRef.current = false;
          animateSlideContent(normalized);
        },
      });
    },
    [animateSlideContent, total]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimatingRef.current || index === activeIndexRef.current) return;
      isAnimatingRef.current = true;
      animateToSlide(index);
    },
    [animateToSlide]
  );

  const nextSlide = useCallback(() => {
    goToSlide(activeIndexRef.current + 1);
  }, [goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(activeIndexRef.current - 1);
  }, [goToSlide]);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      animateToSlide(activeIndexRef.current + 1);
    }, AUTOPLAY_MS);
  }, [animateToSlide]);

  useEffect(() => {
    gsap.set(trackRef.current, { xPercent: 0 });
    animateSlideContent(0);
    resetAutoplay();

    if (window.location.hash === "#hero") {
      requestAnimationFrame(() => {
        document.getElementById("hero")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [animateSlideContent, resetAutoplay]);

  const handleManualNav = (index: number) => {
    goToSlide(index);
    resetAutoplay();
  };

  const handlePrev = () => {
    prevSlide();
    resetAutoplay();
  };

  const handleNext = () => {
    nextSlide();
    resetAutoplay();
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-foreground scroll-mt-0"
      aria-label="Hero banner slider"
    >
      <div className="relative h-[75vh] min-h-[500px] sm:h-[85vh] sm:min-h-[580px] lg:h-[92vh] lg:min-h-[680px]">
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${total * 100}%` }}
        >
          {heroBanners.map((banner, index) => (
            <article
              key={banner.id}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="relative h-full shrink-0 overflow-hidden"
              style={{ width: `${100 / total}%` }}
            >
              <AppImage
                src={banner.image}
                alt={`${banner.title} — ${banner.highlight}`}
                fill
                priority={banner.id <= 2}
                className="slide-image object-cover object-top will-change-transform"
                style={{ objectPosition: "top center" }}
                sizes="100vw"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />

              <div className="absolute inset-0 flex items-center pt-20 sm:pt-24 lg:pt-28">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
                  <div className="max-w-xl lg:max-w-2xl">
                    <span className="slide-badge inline-block px-4 py-1.5 rounded-full bg-lime/90 text-foreground text-xs sm:text-sm font-semibold mb-4 sm:mb-5">
                      {banner.badge}
                    </span>

                    <h1 className="slide-title font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-off-white leading-[1.08] mb-2 sm:mb-3">
                      {banner.title}
                    </h1>

                    <p className="slide-highlight text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-lime mb-3 sm:mb-4">
                      {banner.highlight}
                    </p>

                    <p className="slide-subtitle text-sm sm:text-base lg:text-lg text-off-white/85 leading-relaxed mb-6 sm:mb-8 max-w-md lg:max-w-lg">
                      {banner.subtitle}
                    </p>

                    <div className="slide-cta flex flex-wrap gap-3 sm:gap-4">
                      <Link
                        href={banner.primaryCta.href}
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-lime text-foreground rounded-full text-sm sm:text-base font-semibold hover:bg-lime-dark transition-all duration-300 shadow-lg shadow-lime/25 hover:scale-[1.03]"
                      >
                        {banner.primaryCta.label}
                        <HiArrowRight className="w-4 h-4" />
                      </Link>
                      {banner.secondaryCta && (
                        <Link
                          href={banner.secondaryCta.href}
                          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-off-white/10 backdrop-blur-sm border border-off-white/30 text-off-white rounded-full text-sm sm:text-base font-semibold hover:bg-off-white/20 transition-all duration-300 hover:scale-[1.03]"
                        >
                          {banner.secondaryCta.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-off-white/15 backdrop-blur-md border border-off-white/25 flex items-center justify-center text-off-white hover:bg-lime hover:text-foreground transition-all duration-300 hover:scale-105"
          aria-label="Previous slide"
        >
          <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-off-white/15 backdrop-blur-md border border-off-white/25 flex items-center justify-center text-off-white hover:bg-lime hover:text-foreground transition-all duration-300 hover:scale-105"
          aria-label="Next slide"
        >
          <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 sm:gap-2.5">
          {heroBanners.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => handleManualNav(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-500 ease-out ${
                index === activeIndex
                  ? "w-8 sm:w-10 h-2.5 bg-lime"
                  : "w-2.5 h-2.5 bg-off-white/40 hover:bg-off-white/70"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-off-white/10 z-10 overflow-hidden">
          <div
            key={activeIndex}
            className="h-full bg-lime origin-left animate-[bannerProgress_6s_ease-out_forwards]"
          />
        </div>
      </div>
    </section>
  );
}
