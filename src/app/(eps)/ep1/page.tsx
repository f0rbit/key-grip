'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download } from 'lucide-react';
import "../../../components/audio-player.css"

const AudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

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

  // Add this function inside your AudioPlayer component:
  const handleDownload = async (trackSrc, trackTitle) => {
    try {
      // Get the file
      const response = await fetch(trackSrc);
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);

      // Set the download filename
      link.download = `${trackTitle}.wav`;

      // Append to document, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };


  const togglePlay = (index) => {
    if (currentTrackIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  return (
    <div className="audio-player">
      {/* Song List */}
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

      {/* Fixed Bottom Player */}
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
              <button
                onClick={() => skip(-10)}
                className="player-control-button"
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={() => togglePlay(currentTrackIndex)}
                className="play-pause-button"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button
                onClick={() => skip(10)}
                className="player-control-button"
              >
                <SkipForward size={20} />
              </button>

              <button
                onClick={toggleMute}
                className="player-control-button"
              >
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

export default AudioPlayer;