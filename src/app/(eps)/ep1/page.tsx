'use client';

import React from 'react';
import { BurgerBar } from '@/components/burger-bar';
import Ep1CoverArt from "~/public/ep1-cover.jpg";
import Image from "next/image";
import { Bandcamplogo } from '@/app/links/page';
import "../../../components/audio-player.css";
import CubeEffect from '@/components/ep1-cube-background';
import { PlaySection } from '@/components/audio-player';
import AudioPlayer from '@/components/AudioPlayer';
import type { Track } from '@/components/AudioPlayer';
import { RandomFontTitle } from '@/components/font-switcher';
import { AppleMusicLogo, BandcampLogo, SpotifyLogo } from '@/components/socials';
import { getSongURL } from '@/lib/storage';

// Constants
const TRACKS: Track[] = [
  { id: 1, title: "Kalybaba", src: getSongURL("ep1", "kalybaba") },
  { id: 2, title: "Orbit", src: getSongURL("ep1", "orbit") },
  { id: 3, title: "Razed Edge", src: getSongURL("ep1", "razed_edge") },
  { id: 4, title: "Beginning To Forget", src: getSongURL("ep1", "beginning_to_forget") },
  { id: 5, title: "Acoustiic", src: getSongURL("ep1", "acoustiic") },
  { id: 6, title: "No Build", src: getSongURL("ep1", "no_build") }
];

interface PlayLink {
  href: string;
  icon: React.ReactNode;
  text: string;
}

function Spotify() {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"><path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 10.689453 8 C 9.1494531 8 7.696125 8.171625 6.328125 8.515625 C 5.986125 8.600625 5.7285156 8.8561406 5.7285156 9.3691406 C 5.7285156 9.8821406 6.0709844 10.310609 6.5839844 10.224609 C 6.8399844 10.224609 6.9266562 10.138672 7.0976562 10.138672 C 8.2096562 9.8816719 9.4924531 9.7109375 10.689453 9.7109375 C 13.084453 9.7109375 15.564391 10.309 17.275391 11.25 C 17.531391 11.335 17.616109 11.421875 17.787109 11.421875 C 18.301109 11.421875 18.643516 11.079406 18.728516 10.566406 C 18.728516 10.139406 18.473797 9.8819375 18.216797 9.7109375 C 16.078797 8.5989375 13.340453 8 10.689453 8 z M 10.519531 10.994141 C 9.0655312 10.994141 8.0396719 11.250813 7.0136719 11.507812 C 6.5856719 11.678813 6.4140625 11.849344 6.4140625 12.277344 C 6.4140625 12.619344 6.6696563 12.960938 7.0976562 12.960938 C 7.2686562 12.960937 7.3543906 12.961 7.5253906 12.875 C 8.2953906 12.704 9.3215937 12.533203 10.433594 12.533203 C 12.656594 12.533203 14.710062 13.045328 16.164062 13.986328 C 16.335063 14.071328 16.506734 14.158203 16.677734 14.158203 C 17.104734 14.158203 17.360266 13.815672 17.447266 13.388672 C 17.447266 13.132672 17.276531 12.876078 17.019531 12.705078 C 15.137531 11.593078 12.914531 10.994141 10.519531 10.994141 z M 10.775391 14.007812 C 9.5783906 14.007812 8.4655156 14.178547 7.3535156 14.435547 C 7.0115156 14.435547 6.8417969 14.691203 6.8417969 15.033203 C 6.8417969 15.375203 7.0974531 15.632812 7.4394531 15.632812 C 7.5254531 15.632812 7.6961875 15.546875 7.8671875 15.546875 C 8.7221875 15.375875 9.7484531 15.205078 10.689453 15.205078 C 12.399453 15.205078 14.025594 15.632344 15.308594 16.402344 C 15.479594 16.487344 15.565328 16.572266 15.736328 16.572266 C 15.992328 16.572266 16.248922 16.402609 16.419922 15.974609 C 16.419922 15.632609 16.249125 15.546 16.078125 15.375 C 14.538125 14.52 12.742391 14.007812 10.775391 14.007812 z" /></svg>
  }
  
  function AppleMusic() {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"><path d="M 6 3 C 4.3519316 3 3 4.3519316 3 6 L 3 18 C 3 19.648068 4.3519316 21 6 21 L 18 21 C 19.648068 21 21 19.648068 21 18 L 21 6 C 21 4.3519316 19.648068 3 18 3 L 6 3 z M 6 4.5 L 18 4.5 C 18.837932 4.5 19.5 5.1620684 19.5 6 L 19.5 18 C 19.5 18.837932 18.837932 19.5 18 19.5 L 6 19.5 C 5.1620684 19.5 4.5 18.837932 4.5 18 L 4.5 6 C 4.5 5.1620684 5.1620684 4.5 6 4.5 z M 15.072266 6.6816406 L 10.035156 7.6816406 C 9.6601562 7.7566406 9.3877188 8.0887031 9.3867188 8.4707031 C 9.3867188 8.4707031 9.3652344 13.347938 9.3652344 13.710938 C 9.3652344 14.078938 9.0195 14.132812 8.8125 14.132812 C 7.7955 14.132812 6.8691406 14.926828 6.8691406 15.798828 C 6.8691406 16.746828 7.4827344 17.291016 8.5527344 17.291016 C 9.9787344 17.291016 10.496094 16.157484 10.496094 15.396484 L 10.496094 10.740234 C 10.496094 10.709234 10.518828 10.681781 10.548828 10.675781 L 14.779297 9.8046875 C 14.789297 10.643688 14.814453 12.229094 14.814453 12.496094 C 14.814453 12.874094 14.709344 13.078125 14.152344 13.078125 C 12.990344 13.078125 12.296875 13.955688 12.296875 14.804688 C 12.296875 15.741687 13.320531 16.210938 13.894531 16.210938 C 15.550531 16.210938 15.988281 14.833469 15.988281 14.105469 L 15.988281 7.4316406 C 15.987281 7.2016406 15.885031 6.9858437 15.707031 6.8398438 C 15.528031 6.6938438 15.297266 6.6346406 15.072266 6.6816406 z" /></svg>
  }


const PLAY_LINKS: PlayLink[] = [
  { href: "https://open.spotify.com/album/7iYB5p6mfH4fp6VBNc7cNH", icon: <Spotify />, text: "Spotify" },
  { href: "https://music.apple.com/au/album/key-grip-ep/1791267851", icon: <AppleMusic />, text: "Apple Music" },
  { href: "https://keygripmusic.bandcamp.com/album/key-grip", icon: <Bandcamplogo className='w-4 h-4' />, text: "Bandcamp" }
];

// Main EpPage Component
const EpPage: React.FC = () => {

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-neutral-900 pb-24">
      {/* Background Effect */}
      <CubeEffect />

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        <BurgerBar fixed={false} />

        <section className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 pt-12 grid gap-5">
          {/* Album Header Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            {/* Album Cover */}
            <div className="relative w-full max-w-[400px] aspect-square m-auto">
              <Image
                src={Ep1CoverArt}
                alt="Key Grip EP album cover artwork"
                fill
                className="rounded-md object-cover"
                priority
              />
            </div>

            {/* Album Info */}
            <div className="flex flex-col gap-4 w-full h-full">
              <RandomFontTitle title="Key Grip..?" />
              <time
                className="text-neutral-400 text-base"
                dateTime="2023-02-10"
              >
                February 10, 2023
              </time>
              <PlaySection links={PLAY_LINKS} />
            </div>
          </div>

          {/* Audio Player Section */}
          <AudioPlayer 
            tracks={TRACKS} 
          />
          {/* Review Section */}
          <div className="grid grid-cols-1 max-w-4xl mx-auto gap-6 my-8">
            {/* Review Content */}
            <div className="space-y-6">
              <blockquote className="text-neutral-300 space-y-4">
              <p className="text-2xl text-neutral-200 mt-6">★★★★ - duncanreviews March 16 2023 </p>
                <p className="text-xl italic text-neutral-200">
                  {`"Following the map to a grand new frontier"`}
                </p>

                <p>
                  {`The year is still young when it comes to EPs released in 2023, but it seems as though
                  Key Grip have already leapfrogged ahead of the competition to land a spot amid the best
                  of the best. This Australian outfit is still too young to be defined by a single genre,
                  much less a general handful of them, but the duo's first artwork is a highly interesting
                  introduction and an appropriately self-titled gem. Key Grip...? is something to take pride in.`}
                </p>

                <p>
                  {`With the band themselves having claimed influences such as Jockstrap and JPEGMafia,
                  the six-track Key Grip debut is futuristic yet digestible. The initial drums and glitches
                  of Kalybaba set a high standard for production quality, and all twenty-one minutes of
                  the experience keep this energy alive. Deep vocals lead into ethereal synths on this
                  immersive opening tune, securing an intimate yet diverse atmosphere. The song blows up
                  into heavy industrial hip hop territory for a moment before calming down again and
                  shapeshifting into the cool pop-oriented breeze of Orbit. These sparkly quick-paced
                  synths contrast nicely with the chaotic collage at the end of Razed Edge, showing off
                  the layers of Key Grip's range while staying consistent in an overall climate.`}
                </p>

                <p>
                  {`Beginning to Forget is something of an interlude, or at least the odd one out in terms
                  of timespan, but a soaring assembly of classical elements make this much more than a
                  mere jingle. Acoustiic lives up to its name with a sparse unplugged style, but the
                  autotuned singing is surprisingly moving and even avant-garde among the breaks of quiet.
                  No Build comes full circle by recycling almost every little dreamy sound that cropped up before.`}
                </p>

                <p>
                  {`In addition to the musical twosome's cited icons, Key Grip's maiden voyage is reminiscent
                  of acts like Quadeca, whose breakout LP I Didn't Mean to Haunt You featured a comparable
                  array of experiments with soulful R&B and instrumental electronica. If the duo continue
                  in this direction of humble ambition, their talents are sure to spread in a similar
                  fashion to some of the greatest acts of the 2020s.`}
                </p>
              </blockquote>
            </div>
            <div className="md:col-span-2 space-y-6">
              <blockquote className="text-neutral-300 space-y-4">
              <p className="text-2xl text-neutral-200 mt-6">★★ - Themicroscopes Apr 3 2023 </p>
                <p className="text-xl italic text-neutral-200">
                  so much potential
                </p>

                <p>
                  {`the production here is absolutely insane, like it's genuinely hard to fathom how good it sounds, however i believe this ep falls short for a few reasons. it's clear that this duo is full to bursting with ideas, which i can relate to and respect, but i think that they used this EP as more of a showcase of ability and excitement to be creating rather than a homogenized, cohesive experience.`}
                </p>

                <p>
                  {`not a lot of the ideas end up sticking simply because they're washed away in a sonic experience that is worlds different by the next song. i also cannot stand the vocals. it's clear that their vocalist has talent, however, on this project they do not stick the landing with even a single performance, often devolving into seemingly undeserved croon-wailing. this unfortunately takes something that could have been incredible and makes it difficult to return to for me. i really hope this group continues their output though, because i can hear the makings of some life changing.`}
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
