'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BurgerBar } from '@/components/burger-bar';
import Ep1CoverArt from "~/public/ep1-cover.jpg";
import Image from "next/image";
import { AppleMusicLogo, Bandcamplogo, SpotifyLogo } from '@/app/links/page';
import { ExternalLink, Download, SkipBack, Pause, Play, SkipForward, VolumeX, Volume2 } from 'lucide-react';
import Lizard from '~/public/lizard.webp';
import "../../../components/audio-player.css";
import * as THREE from 'three';
import PS2WaterBackground from '@/components/ps2WaterShader';


// Audio Player Component
const AudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { id: 1, title: "Kalybaba", src: "/music/Kalybaba.wav" },
    { id: 2, title: "Orbit", src: "/music/Orbit.wav" },
    { id: 3, title: "Razed Edge", src: "/music/Razed_Edge.wav" },
    { id: 4, title: "Beginning To Forget", src: "/music/beginning_to_forget.wav" },
    { id: 5, title: "Acoustiic", src: "/music/Acoustiic.wav" },
    { id: 6, title: "No Build", src: "/music/No_Build.wav" }
  ];

  const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
          .catch(error => console.log("Playback failed:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleDownload = async (trackSrc: string, trackTitle: string) => {
    try {
      const response = await fetch(trackSrc);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${trackTitle}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const togglePlay = (index: number | null) => {
    if (index == null) {
      setIsPlaying(false);
      return;
    }
    if (currentTrackIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  return (
    <div className="audio-player">
      <div className="song-list-container">
        {tracks.map((track, index) => (
          <div key={track.id} className="song-item">
            <span className="song-title">{track.title}</span>
            <div className="song-controls">
              <button
                onClick={() => togglePlay(index)}
                className="control-button"
                aria-label={isPlaying && currentTrackIndex === index ? "Pause" : "Play"}
              >
                {isPlaying && currentTrackIndex === index ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )}
              </button>
              <button
                onClick={() => handleDownload(track.src, track.title)}
                className="control-button"
                aria-label="Download track"
              >
                <Download size={20} />
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
              max={duration}
              onChange={handleSeek}
            />

            <div className="player-controls">
              <button onClick={() => skip(-10)} className="player-control-button">
                <SkipBack size={20} />
              </button>
              <button onClick={() => togglePlay(currentTrackIndex)} className="play-pause-button">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button onClick={() => skip(10)} className="player-control-button">
                <SkipForward size={20} />
              </button>
              <button onClick={toggleMute} className="player-control-button">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={currentTrack.src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

// Play Section Component
const PlaySection = () => {
  const SPOTIFY_LINK = `https://open.spotify.com/album/7iYB5p6mfH4fp6VBNc7cNH?si=-JK4Sy72SKy8ucVt_8Q-Jw`;
  const APPLE_MUSIC_LINK = `https://music.apple.com/au/album/key-grip-ep/1791267851`;
  const BANDCAMP_LINK = `https://keygripmusic.bandcamp.com/album/key-grip`;

  return (
    <div className="grid gap-2 text-white">
      <a className="flex row items-center gap-2 border border-neutral-300 rounded-sm p-2" 
         href={SPOTIFY_LINK} target="_blank" rel="noreferrer">
        <SpotifyLogo />
        <span className="w-full">Spotify</span>
        <ExternalLink size={14} />
      </a>
      <a className="flex row items-center gap-2 border border-neutral-300 rounded-sm p-2" 
         href={APPLE_MUSIC_LINK} target="_blank" rel="noreferrer">
        <AppleMusicLogo />
        <span className="w-full">Apple Music</span>
        <ExternalLink size={14} />
      </a>
      <a className="flex row items-center gap-2 border border-neutral-300 rounded-sm p-2" 
         href={BANDCAMP_LINK} target="_blank" rel="noreferrer">
        <Bandcamplogo />
        <span className="w-full">Bandcamp</span>
        <ExternalLink size={14} />
      </a>
    </div>
  );
};

// Main Page Component
const EpPage = () => {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-neutral-900">
      <PS2WaterBackground />
      <div className="relative z-10"> {/* Content wrapper */}
        <BurgerBar fixed={false} />
        <section className="mx-10 sm:mx-20 md:mx-40 pt-24 grid gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Image 
              src={Ep1CoverArt} 
              alt="Episode 1 Cover Art" 
              width={400} 
              height={400} 
              className="rounded-md"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-white text-left text-xl sm:text-2xl md:text-3xl">
                Key Grip...?
              </h1>
              <p className="text-neutral-400 text-left text-base mb-5">
                February 10, 2023
              </p>
              <PlaySection />
            </div>
          </div>
          <br />
          <p className="text-neutral-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis aliquam ipsum, 
            vel fringilla nibh tincidunt sed. Vivamus vel massa est. Nunc erat nunc, tempus 
            vel auctor sed, sollicitudin ut turpis.
          </p>
          <AudioPlayer />
          <div className="grid grid-cols-3 gap-5">
            <div className="relative">
              <Image src={Lizard} fill={true} alt={"lizard"} className="object-contain" />
            </div>
            <p className="col-span-2 text-neutral-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis aliquam ipsum, 
              vel fringilla nibh tincidunt sed. Vivamus vel massa est. Nunc erat nunc, tempus 
              vel auctor sed, sollicitudin ut turpis.
            </p>
            <p className="col-span-2 text-neutral-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis aliquam ipsum, 
              vel fringilla nibh tincidunt sed. Vivamus vel massa est. Nunc erat nunc, tempus 
              vel auctor sed, sollicitudin ut turpis.
            </p>
            <div className="relative">
              <Image src={Lizard} fill={true} alt={"lizard"} className="object-contain" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EpPage;