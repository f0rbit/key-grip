import React, { useState, useRef, useEffect } from 'react';
import { Download, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, X } from 'lucide-react';

// Types
export interface Track {
  id: number;
  title: string;
  src: string;
}

interface AudioPlayerProps {
  tracks: Track[];
}

const formatTime = (time: number): string => {
  if (isNaN(time)) return '--:--';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedTracks, setLoadedTracks] = useState<Set<number>>(() => new Set<number>());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

  // Only show loading if we haven't loaded this track before
  const shouldShowLoading = isLoading && currentTrackIndex !== null && !loadedTracks.has(currentTrackIndex);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-play next track if available
      if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
        setCurrentTime(0);
        setCurrentTrackIndex(currentTrackIndex + 1);
        setIsPlaying(true);
      }
    };
    const handleCanPlay = () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      setIsLoading(false);
      setError(null);
      if (currentTrackIndex !== null) {
        setLoadedTracks(prev => new Set([...prev, currentTrackIndex]));
      }
    };
    const handleWaiting = () => {
      // Only set loading after a small delay to avoid flicker
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(true);
      }, 150);
    };
    const handleError = (e: any) => {
      console.error('Audio error:', e);

      let error_message = 'failed to load audio. please try again.';
      let error_code = e.target.error?.code;

      switch (error_code) {
        case MediaError.MEDIA_ERR_ABORTED:
          error_message = 'playback aborted by user.';
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          error_message = 'network error occurred.';
          break;
        case MediaError.MEDIA_ERR_DECODE:
          error_message = 'audio decoding error. the file might be corrupted.';
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          error_message = 'audio format not supported.';
          break;
        default:
          error_message = 'an unexpected error occurred.';
          break;
      }

      //log to console for further inspection
      console.error("mediaerror code:", error_code);
      console.error("full mediaerror object", e.target.error);
      setError(error_message);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrackIndex, tracks.length]);

  useEffect(() => {
    if (!audioRef.current || currentTrackIndex === null) return;

    const loadTrack = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Only set src and load if it's a new track
        const newSrc = tracks[currentTrackIndex].src;
        if (audioRef.current!.src !== new URL(newSrc, window.location.href).href) {
          audioRef.current!.src = newSrc;
          audioRef.current!.load();
          // Don't reset playing state here anymore
        }
      } catch (error) {
        console.error("Error loading track:", error);
        setError("Failed to load audio. Please try again.");
        setIsPlaying(false);
      }
    };

    loadTrack();
  }, [currentTrackIndex, tracks]);

  // Handle play state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        if (isPlaying) {
          // Only attempt to play if the audio is ready
          if (audio.readyState >= 2) { // HAVE_CURRENT_DATA or better
            await audio.play();
          }
        } else {
          audio.pause();
        }
      } catch (error) {
        console.error("Playback error:", error);
        setIsPlaying(false);
      }
    };

    playAudio();
  }, [isPlaying]);

  // Handle play when audio becomes ready
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = async () => {
      if (isPlaying) {
        try {
          await audio.play();
        } catch (error) {
          console.error("Error playing audio after load:", error);
          setIsPlaying(false);
        }
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    return () => audio.removeEventListener('canplay', handleCanPlay);
  }, [isPlaying]);

  const controls = {
    togglePlay: (index: number) => {
      if (currentTrackIndex === index) {
        setIsPlaying(!isPlaying);
      } else {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
      }
    },

    toggleMute: () => {
      if (!audioRef.current) return;
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    },

    handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!audioRef.current) return;
      let time = Number(e.target.value);
      if (time >= duration) time = duration - 0.1;
      audioRef.current.currentTime = Math.min(time, duration);
      setCurrentTime(time);
    },

    playPrevious: () => {
      if (currentTrackIndex !== null && currentTrackIndex > 0) {
        setCurrentTrackIndex(currentTrackIndex - 1);
        setCurrentTime(0);
        setIsPlaying(true);
      }
    },

    playNext: () => {
      if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
        setCurrentTime(0);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="audio-player" role="region" aria-label="Audio player">
      <div className="song-list-container">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="song-item"
            role="listitem"
          >
            <span className="song-title">{track.title}</span>
            <div className="song-controls">
              <button
                onClick={() => controls.togglePlay(index)}
                className="control-button"
                disabled={isLoading}
                aria-label={`${isPlaying && currentTrackIndex === index ? 'Pause' : 'Play'} ${track.title}`}
              >
                {shouldShowLoading && currentTrackIndex === index ? (
                  <span className="loading-spinner animate-fade-in" aria-label="Loading" />
                ) : isPlaying && currentTrackIndex === index ? (
                  <Pause size={20} className="animate-fade-in" />
                ) : (
                  <Play size={20} className="animate-fade-in" />
                )}
              </button>
              <a
                href={track.src}
                download
                className="control-button"
                aria-label={`Download ${track.title}`}
              >
                <Download size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div role="alert" className="text-red-500 p-2 text-center">
          {error}
        </div>
      )}

      {currentTrack && currentTrackIndex !== null && (
        <div className="bottom-player" role="complementary" aria-label="Now playing">
          <div className="player-container">
            <div className="player-header">
              <span className="current-track-title">
                Now playing: {currentTrack.title}
              </span>
              <span className="time-display" role="timer" aria-label="Time">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                  }
                  setIsPlaying(false);
                  setCurrentTrackIndex(null);
                }}
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors ml-4"
                aria-label="Close audio player"
              >
                <X size={20} />
              </button>
            </div>

            <input
              type="range"
              value={Math.min(currentTime, duration ?? 0)}
              max={duration ?? 0}
              onChange={controls.handleSeek}
              className="seek-slider"
              aria-label="Seek"
              style={{ '--progress-width': `${(currentTime / (duration || 1)) * 100}%` } as React.CSSProperties}
              min="0"
              step="0.1"
            />

            <div className="player-controls">
              <button
                onClick={() => controls.playPrevious()}
                className="player-control-button"
                aria-label="Previous track"
                disabled={currentTrackIndex === 0}
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={() => controls.togglePlay(currentTrackIndex)}
                className="play-pause-button"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner" aria-label="Loading" />
                ) : isPlaying ? (
                  <Pause size={24} />
                ) : (
                  <Play size={24} />
                )}
              </button>
              <button
                onClick={() => controls.playNext()}
                className="player-control-button"
                aria-label="Next track"
                disabled={currentTrackIndex === tracks.length - 1}
              >
                <SkipForward size={20} />
              </button>
              <button
                onClick={controls.toggleMute}
                className="player-control-button"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
