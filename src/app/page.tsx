"use client";
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import LandingPage from "@/components/landing/LandingPage";

export default function Home() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="App" data-booted={booted}>
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(10,15,20,0.92)",
            border: "1px solid rgba(212,175,55,0.35)",
            color: "#F0E6D2",
            fontFamily: "Spectral, serif",
          },
        }}
      />
      <LandingPage />
    </div>
  );
}
