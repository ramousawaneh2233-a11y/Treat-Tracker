"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
  shouldFire?: boolean;
}

export default function ConfettiTrigger({ shouldFire }: ConfettiProps) {
  useEffect(() => {
    // Only fire if shouldFire is true
    if (shouldFire) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff'] // You can customize colors!
      });
    }
  }, [shouldFire]); // This makes it "listen" for changes to shouldFire

  return null;
}
