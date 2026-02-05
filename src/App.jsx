import React from 'react';
import VoiceSection from './components/VoiceSection';
import { maleVoices, femaleVoices } from './data/voices';

function App() {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="border-b border-border bg-background-secondary/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1280px] mx-auto px-xl py-lg">
          <div className="flex items-center gap-md">
            <div className="flex items-center gap-sm">
              <svg
                className="w-8 h-8 text-accent-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
              <h1 className="text-text-primary font-bold text-2xl">
                Sarvam Voice Samples
              </h1>
            </div>
            <div className="ml-auto text-text-secondary text-sm">
              {maleVoices.length + femaleVoices.length} voices available
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-xl py-4xl">
        <div className="flex flex-col gap-5xl">
          {/* Male Voices Section */}
          <VoiceSection
            title="Male Voices"
            voices={maleVoices}
            icon="👨"
          />

          {/* Female Voices Section */}
          <VoiceSection
            title="Female Voices"
            voices={femaleVoices}
            icon="👩"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background-secondary mt-5xl">
        <div className="max-w-[1280px] mx-auto px-xl py-lg">
          <p className="text-text-tertiary text-sm text-center">
            Audio Player powered by Sarvam AI • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
