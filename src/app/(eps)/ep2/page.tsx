'use client';

import React, { useState } from 'react';
import { BurgerBar } from '@/components/burger-bar';
import Ep2CoverArt from "~/public/ep2-cover.png";
import Image from "next/image";
import { AppleMusicLogo, Bandcamplogo, SpotifyLogo } from '@/app/links/page';
import "../../../components/audio-player.css";
import VideoBackground from '@/components/VideoBackground';
import { PlaySection } from '@/components/audio-player';
import AudioPlayer from '@/components/AudioPlayer';
import type { Track } from '@/components/AudioPlayer';
import { RandomFontTitle } from '@/components/font-switcher';

// Constants
const TRACKS: Track[] = [
  { id: 1, title: "This", src: "/music/This.wav" },
  { id: 2, title: "is", src: "/music/is.wav" },
  { id: 3, title: "just", src: "/music/just.wav" },
  { id: 4, title: "the", src: "/music/the.wav" },
  { id: 5, title: "first", src: "/music/first.wav" },
  { id: 6, title: "EP", src: "/music/EP.wav" }
];

interface PlayLink {
  href: string;
  icon: React.ReactNode;
  text: string;
}

const PLAY_LINKS: PlayLink[] = [
  { href: "https://open.spotify.com/album/5zutq2A3LBhTqHwewMxjsg?si=mRo3ZLT7Q_uHKItod-Q-jA", icon: <SpotifyLogo />, text: "Spotify" },
  { href: "https://music.apple.com/au/album/key-grip-ep/1794459240", icon: <AppleMusicLogo />, text: "Apple Music" },
  { href: "https://keygripmusic.bandcamp.com/album/key-grip-2", icon: <Bandcamplogo />, text: "Bandcamp" }
];

// Main EpPage Component
const EpPage: React.FC = () => {

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden pb-24">
      <VideoBackground videoPath="/videos/walking_in_circles.mp4" />
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1] top-0 left-0" />

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
                width={400}
                height={400}
                className="rounded-md object-cover"
                priority
              />
            </div>

            {/* Album Info */}
            <div className="flex flex-col gap-4 w-full h-full">
              <RandomFontTitle title="Key Grip..!" />
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
          <AudioPlayer tracks={TRACKS} />

          {/* Description Section */}
          <div className="grid grid-cols-1 max-w-4xl mx-auto gap-6 my-8">
            <div className="space-y-6">
              <blockquote className="text-neutral-300 space-y-4">
                <p>
                  This Ep is made entirely from the first EP's final masters. 
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
