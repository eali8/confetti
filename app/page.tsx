"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import confetti from "canvas-confetti";

export default function Home() {
  const [message, setMessage] = useState("Click a button or choose your vibe!");
  const [selectedMood, setSelectedMood] = useState("");
  const [isConfettiRunning, setIsConfettiRunning] = useState(false);
  const confettiIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const affirmations = [
    "You are glowing 🌟",
    "Confidence looks good on you 💅",
    "You're more than enough 💖",
    "Keep shining, queen 👑",
    "Your energy is radiant ✨",
  ];

  const handleSurprise = () => {
    const random =
      affirmations[Math.floor(Math.random() * affirmations.length)];
    setMessage(random);
  };

  // Function to fire confetti once
  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.7 },
    });
  };

  // Toggle confetti on/off
  const toggleConfetti = () => {
    if (isConfettiRunning) {
      // Stop confetti
      if (confettiIntervalRef.current) {
        clearInterval(confettiIntervalRef.current);
        confettiIntervalRef.current = null;
      }
      setIsConfettiRunning(false);
      setMessage("Confetti stopped! 🎉");
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      // Start confetti
      fireConfetti();
      confettiIntervalRef.current = setInterval(fireConfetti, 1000); // fire every 1 sec
      setIsConfettiRunning(true);
      setMessage("Woohoo! 🎉 Let’s celebrate!");
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.error("Audio playback failed:", err);
        });
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (confettiIntervalRef.current) {
        clearInterval(confettiIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-pink-100 to-white min-h-screen">
      <div className="container">
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-xl text-center">
          <Image
            src="/author2.JPG"
            alt="Emmy Ali"
            width={200}
            height={200}
            className="rounded-l-xl mx-auto mb-8 shadow-lg"
          />
          <h1 className="text-3xl font-bold text-red-400 mb-6">
            This is Emmy Ali! <br /> Designing with heart <br /> coding with
            purpose.
          </h1>

          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={() => setMessage("Hello Beautiful 👋")}
              className="bg-red-400 text-white px-4 py-2 rounded-xl shadow hover:bg-red-500 transition"
            >
              Say Hello
            </button>
            <button
              onClick={() => setMessage("Time to glow ✨")}
              className="bg-pink-500 text-white px-4 py-2 rounded-xl shadow hover:bg-pink-600 transition"
            >
              Glow Up
            </button>
            <button
              onClick={handleSurprise}
              className="bg-orange-400 text-white px-4 py-2 rounded-xl shadow hover:bg-orange-500 transition"
            >
              Surprise Me
            </button>
            <Button
              onClick={toggleConfetti}
              className="bg-purple-500 text-white px-6 py-2 rounded-xl shadow hover:bg-purple-600 transition"
            >
              {isConfettiRunning ? "Stop Confetti." : "Confetti 🎉"}
            </Button>
          </div>

          {/* DROPDOWN */}
          <div className="mb-4">
            <select
              value={selectedMood}
              onChange={(e) => {
                setSelectedMood(e.target.value);
                setMessage(`You're feeling ${e.target.value} today 💫`);
              }}
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none"
            >
              <option value="">Choose your vibe</option>
              <option value="Radiant">Radiant</option>
              <option value="Empowered">Empowered</option>
              <option value="Chill">Chill</option>
              <option value="Energized">Energized</option>
            </select>
          </div>
          <div className="p-4 bg-pink-100 rounded-xl text-pink-700 font-semibold">
            {message}
          </div>

          <audio ref={audioRef} src="/fireworks.mp3" />
        </div>
      </div>
    </section>
  );
}
