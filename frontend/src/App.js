import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import "@/App.css";
import LandingPage from "@/components/landing/LandingPage";

function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    // brief boot to let fonts/CSS settle before reveals fire
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

export default App;
