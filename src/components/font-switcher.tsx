'use client';
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { adramalech, albemarle, celticsea, durendal, fuse, minima, norumbega, scurlock } from '@/lib/fonts';

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
    <div className="flex flex-col items-center justify-center h-0 drop-shadow-md">
      <p className={cn("text-3xl", currentFont)}>
        {text}
      </p>
    </div>
  );
};

const FONTS = [
  adramalech.className,
  albemarle.className,
  celticsea.className,
  durendal.className,
  fuse.className,
  minima.className,
  norumbega.className,
  scurlock.className,
];

// RandomFontTitle Component
export const RandomFontTitle: React.FC<{ title: string }> = ({ title }) => {
  const [charStyles, setCharStyles] = useState<string[]>([]);
  const [chars] = useState(() => title.split(""));

  const getRandomFontClass = () => {
    const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)];
    const textSizes = ['text-6xl', 'text-7xl', 'text-8xl'];
    const randomSize = textSizes[Math.floor(Math.random() * textSizes.length)];
    return `${randomFont} ${randomSize}`;
  };

  useEffect(() => {
    setCharStyles(chars.map(getRandomFontClass));
    const interval = setInterval(() => {
      setCharStyles(prev => prev.map((_, i) =>
        Math.random() < 0.1 ? getRandomFontClass() : prev[i]
      ));
    }, 300);

    return () => clearInterval(interval);
  }, [chars]);

  return (
    <h1 className="text-white text-left leading-[0.8] my-4">
      {chars.map((char, i) => (
        <span key={i} className={`inline-block ${charStyles[i]}`} aria-hidden="true">
          {char}
        </span>
      ))}
      <span className="sr-only">{title}</span>
    </h1>
  );
};


export default FontSwitcher;

