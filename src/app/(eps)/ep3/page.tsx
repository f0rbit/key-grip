'use client';

import React, { useState, useEffect } from 'react';
import { BurgerBar } from '@/components/burger-bar';
import Ep2CoverArt from "~/public/ep2-cover.png";
import Image from "next/image";
import { AppleMusicLogo, Bandcamplogo, SpotifyLogo } from '@/app/links/page';
import "../../../components/audio-player.css";
import VideoBackground from '@/components/VideoBackground';
import { adramalech, albemarle, celticsea, durendal, fuse, minima, norumbega, scurlock } from '@/lib/fonts';
import { PlaySection } from '@/components/audio-player';
import AudioPlayer from '@/components/AudioPlayer';
import type { Track } from '@/components/AudioPlayer';

// Constants
const TRACKS: Track[] = [
  { id: 1, title: "New", src: "/music/This.wav" },
  { id: 2, title: "New", src: "/music/is.wav" },
  { id: 3, title: "New", src: "/music/just.wav" },
  { id: 4, title: "New", src: "/music/the.wav" },
  { id: 5, title: "the", src: "/music/first.wav" },
  { id: 6, title: "EP", src: "/music/EP.wav" }
];

interface PlayLink {
  href: string;
  icon: React.ReactNode;
  text: string;
}

const PLAY_LINKS: PlayLink[] = [
  { href: "https://open.spotify.com/album/7iYB5p6mfH4fp6VBNc7cNH?si=-JK4Sy72SKy8ucVt_8Q-Jw", icon: <SpotifyLogo />, text: "Spotify" },
  { href: "https://music.apple.com/au/album/key-grip-ep/1791267851", icon: <AppleMusicLogo />, text: "Apple Music" },
  { href: "https://keygripmusic.bandcamp.com/album/key-grip", icon: <Bandcamplogo />, text: "Bandcamp" }
];

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
const RandomFontTitle: React.FC<{ title: string }> = ({ title }) => {
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

// Main EpPage Component
const EpPage: React.FC = () => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden pb-24">
      <VideoBackground videoPath="/videos/walking_in_circles.mp4" />
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1]" />

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        <BurgerBar fixed={false} />

        <section className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 pt-12 grid gap-5">
          {/* Album Header Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            {/* Album Cover */}
            <div className="relative w-full max-w-[400px] aspect-square">
              <Image
                src={Ep2CoverArt}
                alt="Key Grip EP 2 album cover artwork"
                fill
                className="rounded-md object-cover"
                priority
              />
            </div>

            {/* Album Info */}
            <div className="flex flex-col gap-4 w-full h-full">
              <RandomFontTitle title="Key Grip Presents..." />
              <time
                className="text-neutral-400 text-base"
                dateTime="2025-02-10"
              >
                February 10, 2025
              </time>
              <PlaySection links={PLAY_LINKS} />
            </div>
          </div>

          {/* Audio Player Section */}
          <AudioPlayer 
            tracks={TRACKS} 
            onClosePlayer={() => setIsPlayerVisible(false)} 
          />

          {/* Description Section */}
          <div className="grid grid-cols-1 max-w-4xl mx-auto gap-6 my-8">
            <div className="space-y-6">
              <blockquote className="text-neutral-300 space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis aliquam ipsum, vel fringilla nibh tincidunt sed. Vivamus vel massa est. Nunc erat nunc, tempus vel auctor sed, sollicitudin ut turpis. Duis vehicula mi diam, et tincidunt enim volutpat vel.
                </p>
                <p>
                  Quisque enim nibh, laoreet in nisi id, dignissim posuere sem. In non diam ut velit maximus suscipit. Integer non elementum dolor. Sed ultricies nisi sit amet lectus faucibus commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </p>
                <p>
                  Pellentesque justo magna, faucibus vel sodales in, posuere sed nulla. Pellentesque ut nibh eget diam posuere laoreet. Nullam pretium non ipsum ut venenatis. Nulla blandit hendrerit eros, eu pretium lacus fermentum at. Sed eget maximus libero.
                </p>
              </blockquote>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EpPage;
