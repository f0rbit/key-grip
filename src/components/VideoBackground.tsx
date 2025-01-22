import React from 'react';

interface VideoBackgroundProps {
  videoPath?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoPath = '/videos/walkingVid.mp4'  // Default path, update this to match your video location
}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={videoPath} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;