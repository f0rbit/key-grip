"use client";
import React, { useState } from "react";

const WindChimes = () => {
  const chimes = [
    { id: 1, sound: "chime1.mp3" },
    { id: 2, sound: "chime2.mp3" },
    { id: 3, sound: "chime3.mp3" },
    { id: 4, sound: "chime4.mp3" },
  ];

  const [lastMouseX, setLastMouseX] = useState(null);

  const handleHover = (sound, event) => {
    const chime = event.currentTarget;

    // Determine the mouse direction
    const currentMouseX = event.clientX;
    const direction = currentMouseX > (lastMouseX || 0) ? 1 : -1;
    setLastMouseX(currentMouseX);

    // Apply sway based on direction
    chime.style.transform = `rotate(${direction * 15}deg)`;

    // Play the sound
    const audio = new Audio(sound);
    audio.play();

    // Reset after animation
    setTimeout(() => {
      chime.style.transform = "rotate(0deg)";
    }, 300);
  };

  return (
    <div className="flex justify-center items-start space-x-4">
      {chimes.map((chime) => (
        <div
          key={chime.id}
          className="w-2 h-24 bg-gradient-to-b from-blue-300 to-blue-600 rounded hover:cursor-pointer transition-transform duration-300"
          onMouseEnter={(event) => handleHover(chime.sound, event)}
        ></div>
      ))}
    </div>
  );
};

export default WindChimes;


