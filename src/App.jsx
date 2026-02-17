import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import VoiceSection from './components/VoiceSection';
import TestPage from './components/TestPage';
import { maleVoices, femaleVoices } from './data/voices';

function HomePage() {
  return (
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
  );
}

function App() {
  const location = useLocation();
  const isTestPage = location.pathname === '/test';

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background-secondary/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1280px] mx-auto px-xl py-lg">
          <div className="flex items-center gap-md">
            <Link to="/" className="flex items-center gap-sm group">
              <svg
                className="w-8 h-8 text-accent-primary group-hover:text-accent-hover transition-smooth"
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
              <h1 className="text-text-primary font-bold text-2xl group-hover:text-accent-primary transition-smooth">
                Sarvam Voice Samples
              </h1>
            </Link>
            <div className="ml-auto flex items-center gap-md">
              {!isTestPage && (
                <span className="text-text-secondary text-sm">
                  {maleVoices.length + femaleVoices.length} voices available
                </span>
              )}
              <Link
                to={isTestPage ? '/' : '/test'}
                className="inline-flex items-center gap-xs px-md py-xs bg-accent-primary hover:bg-accent-hover active:bg-accent-active text-white font-medium text-sm rounded-md transition-smooth"
              >
                {isTestPage ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Voices
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    Test Voice
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Routes */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-background-secondary mt-auto">
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
