"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { merge } from "@/lib/utils";
import { span } from "framer-motion/client";
import { memo } from "react";

interface SpacingTextProps {
  text: string;
  duration?: number;
  className?: string;
  framerProps?: Variants;
  delayMultiple?: number;
}

const SpacingText = ({
  text,
  duration = 0.5,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
  delayMultiple = 0.04,
}: SpacingTextProps) => {
  return (
    <div className="flex justify-center space-x-1">
      <AnimatePresence>
        {text.split("").map((char, idx) => (
          <motion.h1
            key={idx}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: idx * delayMultiple }}
            className={merge("drop-shadow-sm", className)}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default memo(SpacingText);
