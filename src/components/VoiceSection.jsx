import React from 'react';
import VoiceCard from './VoiceCard';
import { getAudioPath } from '../data/voices';

const VoiceSection = ({ title, voices, icon }) => {
  return (
    <div className="flex flex-col gap-xl">
      {/* Section Header */}
      <div className="flex items-center gap-md pb-md border-b-2 border-border">
        <span className="text-3xl" role="img" aria-label={title}>
          {icon}
        </span>
        <h2 className="text-text-primary font-semibold text-2xl">
          {title}
        </h2>
        <span className="ml-auto text-text-tertiary text-sm font-medium">
          {voices.length} {voices.length === 1 ? 'voice' : 'voices'}
        </span>
      </div>

      {/* Voice Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
        {voices.map((voice) => (
          <VoiceCard
            key={voice}
            voiceName={voice}
            audioPath={getAudioPath(voice)}
          />
        ))}
      </div>
    </div>
  );
};

export default VoiceSection;
