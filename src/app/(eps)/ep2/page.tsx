'use client'
import React, { useState, useEffect } from 'react';
import { BurgerBar } from '@/components/burger-bar';
import Ep1CoverArt from "~/public/ep1-cover.jpg";
import Image from "next/image";
import { AppleMusicLogo, Bandcamplogo, SpotifyLogo } from '@/app/links/page';
import Lizard from '~/public/lizard.webp';
import { adramalech, albemarle, celticsea, durendal, fuse, minima, norumbega, scurlock } from '@/lib/fonts';
import { AudioPlayer, PlaySection } from '@/components/audio-player';


// TODO: add remix .wavs
const tracks = [
  { id: 1, title: "Kalybaba", src: "/music/Kalybaba.wav" },
  { id: 2, title: "Orbit", src: "/music/Orbit.wav" },
  { id: 3, title: "Razed Edge", src: "/music/Razed_Edge.wav" },
  { id: 4, title: "Beginning To Forget", src: "/music/beginning_to_forget.wav" },
  { id: 5, title: "Acoustiic", src: "/music/Acoustiic.wav" },
  { id: 6, title: "No Build", src: "/music/No_Build.wav" }
];

// TODO: replace play links
const play_links = [
  { href: "https://open.spotify.com/album/7iYB5p6mfH4fp6VBNc7cNH?si=-JK4Sy72SKy8ucVt_8Q-Jw", icon: <SpotifyLogo />, text: "Spotify" },
  { href: "https://music.apple.com/au/album/key-grip-ep/1791267851", icon: <AppleMusicLogo />, text: "Apple Music" },
  { href: "https://keygripmusic.bandcamp.com/album/key-grip", icon: <Bandcamplogo />, text: "Bandcamp" },
];

const EpPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 bg-neutral-900 pb-24"
    >
      <BurgerBar fixed={false} />
      <section className="mx-10 sm:mx-20 md:mx-40 pt-24 grid gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Image src={Ep1CoverArt} alt="Episode 1 Cover Art" width={400} height={400} className="rounded-md" />
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-left text-[7pt] leading-[0] h-[20px] mt-[20px]">
              <RandomFontTitle title="Key Grip...!" />
            </h1>
            <p className="text-neutral-400 text-left text-base mb-5">
              February 10, 2023
            </p>
            <PlaySection links={play_links} />
          </div>
        </div>
        <br />
        <p className="text-neutral-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis aliquam ipsum, vel fringilla nibh tincidunt sed. Vivamus vel massa est. Nunc erat nunc, tempus vel auctor sed, sollicitudin ut turpis. Duis vehicula mi diam, et tincidunt enim volutpat vel. Quisque enim nibh, laoreet in nisi id, dignissim posuere sem. In non diam ut velit maximus suscipit. Integer non elementum dolor. Sed ultricies nisi sit amet lectus faucibus commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque justo magna, faucibus vel sodales in, posuere sed nulla. Pellentesque ut nibh eget diam posuere laoreet. Nullam pretium non ipsum ut venenatis. Nulla blandit hendrerit eros, eu pretium lacus fermentum at. Sed eget maximus libero.
        </p>
        <AudioPlayer tracks={tracks} />
        {/* Lore Section */}
        <div className="grid grid-cols-3 gap-5">
          <div className="relative">
            <Image src={Lizard} fill={true} alt={"lizard"} className="object-contain" />
          </div>
          <p className="col-span-2 text-neutral-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis aliquam ipsum, vel fringilla nibh tincidunt sed. Vivamus vel massa est. Nunc erat nunc, tempus vel auctor sed, sollicitudin ut turpis. Duis vehicula mi diam, et tincidunt enim volutpat vel. Quisque enim nibh, laoreet in nisi id, dignissim posuere sem. In non diam ut velit maximus suscipit. Integer non elementum dolor.
          </p>
          <p className="col-span-2 text-neutral-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis aliquam ipsum, vel fringilla nibh tincidunt sed. Vivamus vel massa est. Nunc erat nunc, tempus vel auctor sed, sollicitudin ut turpis. Duis vehicula mi diam, et tincidunt enim volutpat vel. Quisque enim nibh, laoreet in nisi id, dignissim posuere sem. In non diam ut velit maximus suscipit. Integer non elementum dolor.
          </p>
          <div className="relative">
            <Image src={Lizard} fill={true} alt={"lizard"} className="object-contain" />
          </div>
        </div>
      </section>

    </div>
  );
};


export default EpPage;

const fonts = [
  adramalech.className + " text-[4em]",
  albemarle.className + " text-[4.6em]",
  celticsea.className + " text-[5.4em]",
  durendal.className + " text-[3.4em]",
  fuse.className + " text-[4.8em]",
  minima.className + " text-[6.2em]",
  norumbega.className + " text-[4em]",
  scurlock.className + " text-[4.6em]",
];



const RandomFontTitle = ({ title }: { title: string }) => {
  const [charStyles, setCharStyles] = useState<string[]>([]);
  const [chars, setChars] = useState<string[]>([]);

  const getRandomFontClass = () => {
    return fonts[Math.floor(Math.random() * fonts.length)];
  };

  useEffect(() => {
    // Initialize the characters and their styles when the title changes
    const initialChars = title.split("");
    const initialStyles = initialChars.map(() => getRandomFontClass());

    setChars(initialChars);
    setCharStyles(initialStyles);
  }, [title]); // This effect runs only when the title changes

  useEffect(() => {
    // Update character styles every 100ms
    const interval = setInterval(() => {
      setCharStyles((prevStyles) =>
        prevStyles.map((style) =>
          Math.random() < 0.1 // 1/10 chance to change font
            ? getRandomFontClass()
            : "text-[4em]"
        )
      );
    }, 150);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [chars]);

  return (
    <>
      {chars.map((char, index) => (
        <span key={index} className={charStyles[index]}>
          {char}
        </span>
      ))}
    </>
  );

};

