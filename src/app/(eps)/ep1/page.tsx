'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BurgerBar } from '@/components/burger-bar';
import Ep1CoverArt from "~/public/ep1-cover.jpg";
import Image from "next/image";
import { AppleMusicLogo, Bandcamplogo, SpotifyLogo } from '@/app/links/page';
import Lizard from '~/public/lizard.webp';
import "../../../components/audio-player.css";
import GlitchEffect from '@/components/ps2WaterShader';
import { Download, ExternalLink, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { adramalech, albemarle, celticsea, durendal, fuse, minima, norumbega, scurlock } from '@/lib/fonts';
import { PlaySection } from '@/components/audio-player';

// Types
interface Track {
  id: number;
  title: string;
  src: string;
}

interface PlayLink {
  href: string;
  icon: React.ReactNode;
  text: string;
}

// Constants
const TRACKS: Track[] = [
  { id: 1, title: "Kalybaba", src: "/music/Kalybaba.wav" },
  { id: 2, title: "Orbit", src: "/music/Orbit.wav" },
  { id: 3, title: "Razed Edge", src: "/music/Razed_Edge.wav" },
  { id: 4, title: "Beginning To Forget", src: "/music/beginning_to_forget.wav" },
  { id: 5, title: "Acoustiic", src: "/music/Acoustiic.wav" },
  { id: 6, title: "No Build", src: "/music/No_Build.wav" }
];

const PLAY_LINKS: PlayLink[] = [
  { href: "https://open.spotify.com/album/7iYB5p6mfH4fp6VBNc7cNH", icon: <SpotifyLogo />, text: "Spotify" },
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

// Utility functions
const formatTime = (time: number): string => {
  if (isNaN(time)) return '--:--';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// RandomFontTitle Component
const RandomFontTitle: React.FC<{ title: string }> = ({ title }) => {
  const [charStyles, setCharStyles] = useState<string[]>([]);
  const [chars] = useState(() => title.split(""));

  const getRandomFontClass = () =>
    FONTS[Math.floor(Math.random() * FONTS.length)] +
    ` text-[${Math.random() * 100 + 110}rem]`;

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

// AudioPlayer Component
const AudioPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('audioMuted') === 'true';
    }
    return false;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isUnmountingRef = useRef(false);

  const currentTrack = currentTrackIndex !== null ? TRACKS[currentTrackIndex] : null;

  // Clean up function to handle audio state
  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
    }
  };

  useEffect(() => {
    // Set up unmounting flag
    return () => {
      isUnmountingRef.current = true;
      cleanupAudio();
    };
  }, []);

  useEffect(() => {
    const handlePlay = async () => {
      if (!audioRef.current || isUnmountingRef.current) return;

      try {
        setIsLoading(true);
        // Create a new Audio element if needed
        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.muted = isMuted;
        }

        // Set the source if it's changed
        if (currentTrack && audioRef.current.src !== currentTrack.src) {
          audioRef.current.src = currentTrack.src;
        }

        await audioRef.current.play();
      } catch (error) {
        // Only log error and update state if not unmounting
        if (!isUnmountingRef.current) {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        }
      } finally {
        if (!isUnmountingRef.current) {
          setIsLoading(false);
        }
      }
    };

    const handlePause = () => {
      if (!audioRef.current || isUnmountingRef.current) return;
      audioRef.current.pause();
    };

    if (isPlaying) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [isPlaying, currentTrack, isMuted]);

  const handleDownload = async (trackSrc: string, trackTitle: string) => {
    try {
      const link = document.createElement('a');
      link.href = trackSrc;
      link.download = `${trackTitle}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const controls = {
    togglePlay: (index: number | null) => {
      if (index === null) return;

      // If selecting a different track while one is playing
      if (currentTrackIndex !== index && isPlaying) {
        cleanupAudio();
      }

      setCurrentTrackIndex(prev => prev === index ? null : index);
      setIsPlaying(prev => prev && currentTrackIndex === index ? false : true);
    },

    toggleMute: () => {
      if (!audioRef.current) return;
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
      localStorage.setItem('audioMuted', String(newMuted));
    },

    handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!audioRef.current) return;
      const time = Number(e.target.value);
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Set up audio event listeners
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (!isUnmountingRef.current) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (!isUnmountingRef.current) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (!isUnmountingRef.current) {
        setIsPlaying(false);
      }
    };

    const handleError = () => {
      if (!isUnmountingRef.current) {
        setIsLoading(false);
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="audio-player" role="region" aria-label="Audio player">
      <div className="song-list-container">
        {TRACKS.map((track, index) => (
          <div key={track.id} className="song-item">
            <span className="song-title">{track.title}</span>
            <div className="song-controls">
              <button
                onClick={() => controls.togglePlay(index)}
                className="control-button"
                disabled={isLoading}
                aria-live="polite"
              >
                {isLoading && currentTrackIndex === index ? (
                  <span className="loading-dots" aria-label="Loading" />
                ) : isPlaying && currentTrackIndex === index ? (
                  <Pause size={20} aria-hidden />
                ) : (
                  <Play size={20} aria-hidden />
                )}
              </button>
              <button
                onClick={() => handleDownload(track.src, track.title)}
                className="control-button"
              >
                <Download size={20} aria-hidden />
                <span className="sr-only">Download {track.title}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {currentTrack && (
        <div className="bottom-player">
          <div className="player-container">
            <div className="player-header">
              <span className="current-track-title">{currentTrack.title}</span>
              <span className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <input
              type="range"
              value={currentTime}
              max={duration || 0}
              onChange={controls.handleSeek}
              aria-label="Track progress"
              className="seek-slider"
            />

            <div className="player-controls">
              <button
                onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)}
                className="player-control-button"
              >
                <SkipBack size={20} aria-hidden />
                <span className="sr-only">Rewind 10 seconds</span>
              </button>
              <button
                onClick={() => controls.togglePlay(currentTrackIndex)}
                className="play-pause-button"
              >
                {isPlaying ? (
                  <Pause size={24} aria-hidden />
                ) : (
                  <Play size={24} aria-hidden />
                )}
                <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button
                onClick={() => audioRef.current && (audioRef.current.currentTime += 10)}
                className="player-control-button"
              >
                <SkipForward size={20} aria-hidden />
                <span className="sr-only">Fast forward 10 seconds</span>
              </button>
              <button
                onClick={controls.toggleMute}
                className="player-control-button"
              >
                {isMuted ? (
                  <VolumeX size={20} aria-hidden />
                ) : (
                  <Volume2 size={20} aria-hidden />
                )}
                <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={currentTrack.src}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

// Main EpPage Component
const EpPage: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-neutral-900">
      {/* Background Effect */}
      <GlitchEffect />

      {/* Main Content */}
      <div className="relative z-10">
        <BurgerBar fixed={false} />

        <section className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 pt-12 grid gap-5">
          {/* Album Header Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            {/* Album Cover */}
            <div className="relative w-full max-w-[400px] aspect-square">
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
              <RandomFontTitle title="Key Grip...?" />
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
          <AudioPlayer />

          {/* Review Section */}
          <div className="grid grid-cols-1 max-w-4xl mx-auto gap-6 my-8">


            {/* Review Content */}
            <div className="space-y-6">


              <blockquote className="text-neutral-300 space-y-4">
                <p className="text-xl italic text-neutral-200">
                  "Following the map to a grand new frontier"
                </p>

                <p>
                  The year is still young when it comes to EPs released in 2023, but it seems as though
                  Key Grip have already leapfrogged ahead of the competition to land a spot amid the best
                  of the best. This Australian outfit is still too young to be defined by a single genre,
                  much less a general handful of them, but the duo's first artwork is a highly interesting
                  introduction and an appropriately self-titled gem. Key Grip...? is something to take pride in.
                </p>

                <p>
                  With the band themselves having claimed influences such as Jockstrap and JPEGMafia,
                  the six-track Key Grip debut is futuristic yet digestible. The initial drums and glitches
                  of Kalybaba set a high standard for production quality, and all twenty-one minutes of
                  the experience keep this energy alive. Deep vocals lead into ethereal synths on this
                  immersive opening tune, securing an intimate yet diverse atmosphere. The song blows up
                  into heavy industrial hip hop territory for a moment before calming down again and
                  shapeshifting into the cool pop-oriented breeze of Orbit. These sparkly quick-paced
                  synths contrast nicely with the chaotic collage at the end of Razed Edge, showing off
                  the layers of Key Grip's range while staying consistent in an overall climate.
                </p>

                <p>
                  Beginning to Forget is something of an interlude, or at least the odd one out in terms
                  of timespan, but a soaring assembly of classical elements make this much more than a
                  mere jingle. Acoustiic lives up to its name with a sparse unplugged style, but the
                  autotuned singing is surprisingly moving and even avant-garde among the breaks of quiet.
                  No Build comes full circle by recycling almost every little dreamy sound that cropped up before.
                </p>

                <p>
                  In addition to the musical twosome's cited icons, Key Grip's maiden voyage is reminiscent
                  of acts like Quadeca, whose breakout LP I Didn't Mean to Haunt You featured a comparable
                  array of experiments with soulful R&B and instrumental electronica. If the duo continue
                  in this direction of humble ambition, their talents are sure to spread in a similar
                  fashion to some of the greatest acts of the 2020s.
                </p>

                <p className="text-2xl text-neutral-200 mt-6">★★★★ - duncanreviews March 16 2023 </p>
              </blockquote>
            </div>
            <div className="md:col-span-2 space-y-6">


              <blockquote className="text-neutral-300 space-y-4">
                <p className="text-xl italic text-neutral-200">
                  so much potential
                </p>

                <p>
                  the production here is absolutely insane, like it’s genuinely hard to fathom how good it sounds, however i believe this ep falls short for a few reasons. it’s clear that this duo is full to bursting with ideas, which i can relate to and respect, but i think that they used this EP as more of a showcase of ability and excitement to be creating rather than a homogenized, cohesive experience.
                </p>

                <p>
                  not a lot of the ideas end up sticking simply because they’re washed away in a sonic experience that is worlds different by the next song. i also cannot stand the vocals. it’s clear that their vocalist has talent, however, on this project they do not stick the landing with even a single performance, often devolving into seemingly undeserved croon-wailing. this unfortunately takes something that could have been incredible and makes it difficult to return to for me. i really hope this group continues their output though, because i can hear the makings of some life changing.
                </p>

                <p className="text-2xl text-neutral-200 mt-6">★★ - Themicroscopes Apr 3 2023 </p>
              </blockquote>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EpPage;