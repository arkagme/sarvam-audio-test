import React, { useState } from 'react';

const VoiceCard = ({ voiceName, audioPath }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);

  // Capitalize voice name for display
  const displayName = voiceName.charAt(0).toUpperCase() + voiceName.slice(1);

  return (
    <div className="bg-background-secondary border border-border rounded-xl p-lg hover:bg-background-tertiary transition-smooth group">
      <div className="flex flex-col gap-md">
        {/* Voice Name */}
        <div className="flex items-center gap-sm">
          <div className={`w-2 h-2 rounded-full transition-smooth ${
            isPlaying ? 'bg-accent-primary animate-pulse' : 'bg-border'
          }`} />
          <h3 className="text-text-primary font-semibold text-base">
            {displayName}
          </h3>
        </div>

        {/* Audio Player */}
        <div className="relative">
          <audio
            controls
            preload="metadata"
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            className="w-full"
          >
            <source src={audioPath} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
};

export default VoiceCard;
