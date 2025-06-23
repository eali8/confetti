"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [message, setMessage] = useState("Click a button or choose your vibe!");

  const affirmations = [
    "You are glowing 🌟",
    "Confidence looks good on you 💅",
    "You're more than enough 💖",
    "Keep shining, queen 👑",
    "Your energy is radiant ✨",
  ];

  const handleSurprise = () => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setMessage(random);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-pink-100 to-white min-h-screen">
      <div className="container">
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-xl text-center">
          <Image
            src="/author2.JPG"
            alt="Emmy Ali"
            width={200}
            height={200}
            className="rounded-full mx-auto mb-6 shadow-lg"
          />
          <h1 className="text-3xl font-bold text-red-400 mb-6">
            This is Emmy Ali! <br /> Designing with heart <br /> coding with purpose.
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
          </div>

          {/* DROPDOWN */}
          <div className="mb-4">
            <select
              onChange={(e) => {
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

          {/* MESSAGE BOX */}
          <div className="p-4 bg-pink-100 rounded-xl text-pink-700 font-semibold">
            {message}
          </div>
        </div>
      </div>
    </section>
  );
}
