'use client';

import { useEffect, useState } from "react";

export const useScrollTop = (threshold = 10) => {
    const [scrolled, setScrolled] = useState<boolean>()

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > threshold) {
                setScrolled(true)
            }else (
                setScrolled(false)
            )
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [threshold])

    return scrolled;
}