"use client";

import { memo } from "react";
import { Marquee } from "../ui/marquee";
import { merge } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

const latestNews = [
  {
    news: "Anifire v2 on Early stage",
    author: "@zeddxx 👋",
  },
  {
    news: "Watch anime not 🌽",
    author: "random old man",
  },
] as const;

const framerProps = {
  hidden: { height: 0, paddingTop: 0, paddingBottom: 0 },
  visible: { height: 40 },
} as Variants;

const Banner = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.8,
        delay: 1,
      }}
      variants={framerProps}
      className="relative flex h-10 w-full items-center bg-muted py-3 justify-center overflow-hidden"
    >
      <Marquee repeat={6} pauseOnHover className="[--duration:20s]">
        {latestNews.map(({ news, author }, idx) => (
          <p
            key={idx}
            className={merge("text-sm text-black/50", idx % 2 && "text-black")}
          >
            {news} - {" " + author}
          </p>
        ))}
      </Marquee>
    </motion.div>
  );
};

export default memo(Banner);
