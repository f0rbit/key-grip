"use client";
import React, { useState } from "react";

const WindChimes = () => {
  const chimes = [
    { id: 1, sound: "chime1.mp3" },
    { id: 2, sound: "chime2.mp3" },
    { id: 3, sound: "chime3.mp3" },
    { id: 4, sound: "chime4.mp3" },
  ];

  const [lastMouseX, setLastMouseX] = useState<number>(0);

  const updateMousePosition = (event: any) => {
    setLastMouseX(event.clientX);
  };

  const handleHover = (sound: string, event: any) => {
    const chime = event.currentTarget;

    // Determine the mouse direction
    const currentMouseX = event.clientX;
    const direction = currentMouseX > (lastMouseX || 0) ? -1 : 1;

    const sway = Math.random() * 15 + 5;

    // Apply sway based on direction
    chime.style.transform = `rotate(${direction * sway}deg)`;

    // Play the sound
    const audio = new Audio(sound);
    audio.play();

    // Reset after animation
    setTimeout(() => {
      chime.style.transform = "rotate(0deg)";
    }, Math.random() * 100 + 100);
  };

  return (
    <div className="flex justify-center items-start gap-3">
      {chimes.map((chime) => (
        <div
          key={chime.id}
          className="w-2 h-24 bg-neutral-600 rounded hover:cursor-pointer transition-transform duration-300"
          onMouseEnter={(event) => handleHover(chime.sound, event)}
          onMouseMove={(event) => updateMousePosition(event)}
        ></div>
      ))}
    </div>
  );
};

export default WindChimes;


