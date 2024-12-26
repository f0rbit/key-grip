"use client";

const WindChimes = () => {
  const chimes = [
    { id: 1, sound: "chime1.mp3" },
    { id: 2, sound: "chime2.mp3" },
    { id: 3, sound: "chime3.mp3" },
    { id: 4, sound: "chime4.mp3" },
  ];
  const handleHover = (sound: string, event: any) => {
    const chime = event.currentTarget;

    console.log(event.movementX, event.movementY);

    // Determine the mouse direction
    const direction = event.movementX >= 0 ? -1 : 1;

    const sway = Math.random() * 15 + 10;

    // Apply sway based on direction
    chime.style.transform = `rotate(${direction * sway}deg)`;

    // Play the sound
    // const audio = new Audio(sound);
    // audio.play();

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
          onMouseMove={(event) => handleHover(chime.sound, event)}
        ></div>
      ))}
    </div>
  );
};

export default WindChimes;


