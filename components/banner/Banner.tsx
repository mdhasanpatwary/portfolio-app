"use client";

import React from "react";
import { Banner as BannerType } from "@/types/data";
import SocialLinks from "../global/SocialLinks";
import BannerButtons from "./BannerButtons";
import { CustomImage } from "@/components/global";
import { StaggerContainer, StaggerItem, AnimateIn } from "@/components/global/AnimateIn";
import { m as motion } from "framer-motion";

type BannerProps = {
  readonly banner: BannerType;
};

/** Stats displayed under the CTA buttons */
const STATS = [
  { label: "Years", value: "6+" },
  { label: "Projects", value: "50+" },
  { label: "Users", value: "50K+" },
];

const Banner: React.FC<BannerProps> = ({ banner }) => {
  const { name, title, summary, image } = banner;

  return (
    <section
      id="banner"
      className="relative w-full overflow-hidden py-24 md:py-40 px-6"
    >
      {/* ── Background: animated gradient (light) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[length:400%_400%] animate-[heroGradient_12s_ease_infinite]"
        style={{
          backgroundImage:
            "linear-gradient(135deg," +
            "#f0f9ff 0%," +
            "#e0f2fe 20%," +
            "#bae6fd 40%," +
            "#ffffff 60%," +
            "#f0f9ff 80%," +
            "#e0f2fe 100%)",
        }}
      />
      {/* ── Background: animated gradient (dark) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden dark:block bg-[length:400%_400%] animate-[heroGradient_12s_ease_infinite]"
        style={{
          backgroundImage:
            "linear-gradient(135deg," +
            "#0f172a 0%," +
            "#1e293b 25%," +
            "#0f172a 50%," +
            "#162032 75%," +
            "#0f172a 100%)",
        }}
      />

      {/* ── Subtle dot-grid pattern ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Glow orb — top-right ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl -z-10 bg-primary-400 dark:opacity-[0.12]"
      />
      {/* ── Glow orb — bottom-left ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl -z-10 bg-cyan-400 dark:opacity-[0.08]"
      />
      {/* ── Glow orb — mid-center (subtle accent) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl -z-10 bg-violet-400"
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-20">

        {/* ── Text Content — staggered ── */}
        <StaggerContainer className="max-w-2xl flex-1" delayChildren={0.02} stagger={0.06}>

          {/* Availability badge */}
          <StaggerItem>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 text-sm font-medium mb-8 select-none">
              <span
                className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                aria-hidden="true"
              />
              Available for Remote Work
            </div>
          </StaggerItem>

          {/* Headline */}
          <StaggerItem>
            <h1 className="text-6xl sm:text-7xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-5 leading-[1.05] tracking-tight">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-primary-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                {name.split(" ")[1]}
              </span>
            </h1>
          </StaggerItem>

          {/* Role / title */}
          <StaggerItem>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              {title}
            </h2>
          </StaggerItem>

          {/* Summary */}
          <StaggerItem>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-xl">
              {summary}
            </p>
          </StaggerItem>

          {/* CTA Buttons */}
          <StaggerItem>
            <BannerButtons />
          </StaggerItem>

          {/* Stat row */}
          <StaggerItem>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {STATS.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <div className="text-center">
                    <span className="block text-2xl font-black bg-gradient-to-r from-primary-500 to-cyan-500 bg-clip-text text-transparent leading-none">
                      {stat.value}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase mt-0.5 block">
                      {stat.label}
                    </span>
                  </div>
                  {i < STATS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden sm:block w-px h-8 bg-gray-300 dark:bg-gray-600"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </StaggerItem>

          {/* Social Links */}
          <StaggerItem>
            <div className="mt-7">
              <SocialLinks />
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* ── Profile Image — floats in, then continuously floats ── */}
        <AnimateIn
          className="flex-shrink-0 w-full md:w-auto flex justify-center"
          delay={0.1}
          duration={0.6}
          yOffset={30}
        >
          {/* Floating wrapper */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-400/40 via-cyan-400/20 to-violet-400/30 blur-2xl -z-10"
            />
            {/* Chrome ring (animated gradient border) */}
            <div className="p-[3px] rounded-3xl bg-gradient-to-br from-primary-400 via-cyan-400 to-violet-400 shadow-2xl shadow-primary-500/30 dark:shadow-primary-500/20">
              <div
                className="
                  relative
                  w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96
                  aspect-[2/3]
                  rounded-[22px]
                  overflow-hidden
                  bg-gray-100 dark:bg-gray-800
                "
              >
                <CustomImage
                  src={image}
                  alt={`Profile picture of ${name}`}
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  fill
                  priority
                  fetchPriority="high"
                  blurType="profile"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
            </div>

            {/* Small decorative accent dot — top-right corner */}
            <span
              aria-hidden="true"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-primary-500 shadow-lg"
            />
            {/* Small decorative accent dot — bottom-left corner */}
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-primary-500 shadow-lg opacity-80"
            />
          </motion.div>
        </AnimateIn>
      </div>
    </section>
  );
};

export default Banner;
