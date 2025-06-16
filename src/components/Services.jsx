"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import servicesData from "../lib/servicesData";
import {
  Lightning,
  PuzzlePiece,
  Code,
  Cpu,
  Briefcase,
  Robot,
  BookOpen,
} from "@phosphor-icons/react";
import CursorFollower from "./CursorFollower";

const icons = [Lightning, PuzzlePiece, Code, Cpu, Briefcase, Robot, BookOpen];

export default function Services() {
  const sectionRef = useRef(null);
  const fillRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!fillRef.current || !sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollY = window.scrollY + window.innerHeight / 2;

      const progress = Math.min(
        1,
        Math.max(0, (scrollY - sectionTop) / sectionHeight)
      );
      fillRef.current.style.height = `${progress * 100}%`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxIntersectionRatio = 0;
        let mostVisibleIndex = null;

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > maxIntersectionRatio
          ) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleIndex = Number(entry.target.getAttribute("data-index"));
          }
        });

        if (mostVisibleIndex !== null) {
          setActiveIndex(mostVisibleIndex);
        }
      },
      { rootMargin: "0px 0px -30% 0px", threshold: [0.1, 0.5, 0.9] }
    );

    const elements = document.querySelectorAll(".service-block");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0D0F20] text-white py-24 px-6 md:px-12 relative"
    >
      <CursorFollower />
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          We build solutions that scale with you
        </h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          From powerful APIs and automations to full-stack development and
          consulting, Actinova delivers tech solutions for every stage of your
          business.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col space-y-24 relative">
        {/* Vertical Line - Hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800">
          <div
            ref={fillRef}
            className="absolute top-0 w-[4px] bg-[#7B68EE] transition-all duration-300 ease-in-out"
          />
        </div>

        {servicesData.map((service, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div
              key={service.title}
              data-index={index}
              className={`service-block relative flex flex-col-reverse md:flex-row items-center justify-between gap-12 z-10 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Icon at vertical line - Hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Icon
                  size={28}
                  weight="fill"
                  className="text-[#7B68EE] transition-colors duration-300"
                />
              </div>

              <div className="md:w-1/2 text-center md:text-left space-y-4">
                <h3 className="text-2xl font-semibold text-[#b2a4ff]">
                  {service.title}
                </h3>
                <p className="text-zinc-300 text-base md:text-lg">
                  {service.description}
                </p>
              </div>
              <div className="md:w-1/2 flex items-center justify-center">
                <Image
                  src={`/${service.image}`}
                  alt={service.title}
                  width={500}
                  height={300}
                  className="rounded-lg border border-zinc-800 shadow-xl"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
