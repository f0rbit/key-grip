'use client'
import React, { useState, useRef, useEffect } from 'react';
import { BurgerBar } from '@/components/burger-bar';
import Ep1CoverArt from "~/public/ep1-cover.jpg";
import Image from "next/image";
import { AppleMusicLogo, Bandcamplogo, SpotifyLogo } from '@/app/links/page';
import { ExternalLink } from 'lucide-react';
import Lizard from '~/public/lizard.webp';

const AudioPlayer = () => {

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 bg-neutral-900"
    >
      <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden duration-1000 transition-all" />
      <BurgerBar fixed={false} />
      <div className="absolute inset-0 bg-black/40 -z-10"></div>
      <section className="mx-10 sm:mx-20 md:mx-40 pt-24 grid gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Image src={Ep1CoverArt} alt="Episode 1 Cover Art" width={400} height={400} className="rounded-md" />
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-left text-xl sm:text-2xl md:text-3xl ">Key Grip...?</h1>
            <p className="text-neutral-400 text-left text-base mb-5">
              February 10, 2023
            </p>
            <PlaySection />
          </div>
        </div>
        <br />
        <p className="text-neutral-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis aliquam ipsum, vel fringilla nibh tincidunt sed. Vivamus vel massa est. Nunc erat nunc, tempus vel auctor sed, sollicitudin ut turpis. Duis vehicula mi diam, et tincidunt enim volutpat vel. Quisque enim nibh, laoreet in nisi id, dignissim posuere sem. In non diam ut velit maximus suscipit. Integer non elementum dolor. Sed ultricies nisi sit amet lectus faucibus commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque justo magna, faucibus vel sodales in, posuere sed nulla. Pellentesque ut nibh eget diam posuere laoreet. Nullam pretium non ipsum ut venenatis. Nulla blandit hendrerit eros, eu pretium lacus fermentum at. Sed eget maximus libero.
        </p>
        {/* Track List goes here */}
        <p>Track List</p>
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

const PlaySection = () => {
  const SPOTIFY_LINK = `https://open.spotify.com/album/7iYB5p6mfH4fp6VBNc7cNH?si=-JK4Sy72SKy8ucVt_8Q-Jw`;
  const APPLE_MUSIC_LINK = `https://music.apple.com/au/album/key-grip-ep/1791267851`;
  const BANDCAMP_LINK = `https://keygripmusic.bandcamp.com/album/key-grip`;

  // links with icons for each
  return (
    <div className="grid gap-2 text-white">
      <a className="flex row items-center gap-2 border border-neutral-300 rounded-sm p-2" href={SPOTIFY_LINK} target="_blank" rel="noreferrer">
        <SpotifyLogo />
        <span className="w-full">Spotify</span>
        <ExternalLink size={14} />
      </a>
      <a className="flex row items-center gap-2 border border-neutral-300 rounded-sm p-2" href={APPLE_MUSIC_LINK} target="_blank" rel="noreferrer">
        <AppleMusicLogo />
        <span className="w-full">Apple Music</span>
        <ExternalLink size={14} />
      </a>
      <a className="flex row items-center gap-2 border border-neutral-300 rounded-sm p-2" href={BANDCAMP_LINK} target="_blank" rel="noreferrer">
        <Bandcamplogo />
        <span className="w-full">Bandcamp</span>
        <ExternalLink size={14} />
      </a>
    </div>
  );
};

export default AudioPlayer;
