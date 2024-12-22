'use client';
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FontSwitcherProps {
  text: string;
  fonts: string[];
  interval: number; // ms
}

const FontSwitcher = ({ text, fonts, interval }: FontSwitcherProps) => {
  const [currentFont, setCurrentFont] = useState<string>(fonts[0]);

  useEffect(() => {
    const switchFontRandomly = () => {
      const randomIndex = Math.floor(Math.random() * fonts.length);
      setCurrentFont(fonts[randomIndex]);
    };

    const intervalId = setInterval(switchFontRandomly, interval);

    return () => clearInterval(intervalId);
  }, [fonts, interval]);

  return (
    <div className="flex flex-col items-center justify-center h-0">
      <p
        className={cn("text-xl transition-all duration-300 ease-in-out", currentFont)}

      >
        {text}
      </p>
    </div>
  );
};

export default FontSwitcher;

