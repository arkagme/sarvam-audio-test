import React, { useState, useRef } from 'react';
import { maleVoices, femaleVoices } from '../data/voices';

const SARVAM_API_KEY = 'sk_qu5u1tky_OjrijIs7LPyNXSiFLzOpZ2Pi';
const TTS_API_URL = 'https://api.sarvam.ai/text-to-speech';

const allVoices = [
  ...maleVoices.map((v) => ({ name: v, gender: 'Male' })),
  ...femaleVoices.map((v) => ({ name: v, gender: 'Female' })),
];

const TestPage = () => {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(allVoices[0]?.name || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter some text to generate voice.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setAudioUrl(null);

    try {
      const response = await fetch(TTS_API_URL, {
        method: 'POST',
        headers: {
          'api-subscription-key': SARVAM_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: [text.trim()],
          target_language_code: 'en-IN',
          speaker: selectedVoice,
          pace: 1.0,
          speech_sample_rate: 22050,
          enable_preprocessing: true,
          model: 'bulbul:v3',
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API error (${response.status}): ${errText}`);
      }

      const data = await response.json();

      let audioContent = null;
      if (data.audios) {
        if (Array.isArray(data.audios) && data.audios.length > 0) {
          audioContent = data.audios[0];
        } else if (typeof data.audios === 'string') {
          audioContent = data.audios;
        }
      }

      if (!audioContent) {
        throw new Error('No audio content returned from API.');
      }

      // Remove data URI prefix if present
      if (audioContent.startsWith('data:audio')) {
        audioContent = audioContent.split(',')[1];
      }

      // Decode base64 to blob
      const byteCharacters = atob(audioContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);

      setAudioUrl(url);
    } catch (err) {
      setError(err.message || 'Failed to generate voice. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <main className="max-w-[1280px] mx-auto px-xl py-4xl">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-primary/10 mb-lg">
            <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h2 className="text-text-primary font-bold text-3xl mb-sm">
            Test Voice Generation
          </h2>
          <p className="text-text-secondary text-base">
            Enter any text and select a voice to generate speech using Sarvam Bulbul v3
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-background-secondary border border-border rounded-xl p-xl">
          <div className="flex flex-col gap-lg">
            {/* Text Input */}
            <div>
              <label
                htmlFor="tts-text"
                className="block text-text-primary font-medium text-sm mb-xs"
              >
                Text to synthesize
              </label>
              <textarea
                id="tts-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to speech..."
                rows={5}
                className="w-full px-sm py-[10px] bg-background-primary border border-border rounded-md text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary resize-y transition-smooth"
              />
              <p className="mt-xxs text-text-tertiary text-xs">
                {text.length} characters
              </p>
            </div>

            {/* Voice Dropdown */}
            <div>
              <label
                htmlFor="tts-voice"
                className="block text-text-primary font-medium text-sm mb-xs"
              >
                Select voice
              </label>
              <div className="relative">
                <select
                  id="tts-voice"
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full appearance-none px-sm py-[10px] pr-[36px] bg-background-primary border border-border rounded-md text-text-primary text-sm focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary cursor-pointer transition-smooth"
                >
                  <optgroup label="👨 Male Voices">
                    {allVoices
                      .filter((v) => v.gender === 'Male')
                      .map((v) => (
                        <option key={v.name} value={v.name}>
                          {capitalize(v.name)}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="👩 Female Voices">
                    {allVoices
                      .filter((v) => v.gender === 'Female')
                      .map((v) => (
                        <option key={v.name} value={v.name}>
                          {capitalize(v.name)}
                        </option>
                      ))}
                  </optgroup>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-sm">
                  <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              id="generate-voice-btn"
              onClick={handleGenerate}
              disabled={isGenerating || !text.trim()}
              className={`
                w-full inline-flex items-center justify-center gap-xs
                px-md py-sm font-medium text-sm rounded-md
                transition-smooth
                ${
                  isGenerating || !text.trim()
                    ? 'bg-accent-primary/40 text-white/60 cursor-not-allowed'
                    : 'bg-accent-primary hover:bg-accent-hover active:bg-accent-active text-white cursor-pointer'
                }
              `}
            >
              {isGenerating ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  Generate Voice
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-lg p-md bg-error/10 border border-error/30 rounded-xl flex items-start gap-sm">
            <svg className="w-5 h-5 text-error flex-shrink-0 mt-xxxs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

        {/* Audio Player */}
        {audioUrl && (
          <div className="mt-lg bg-background-secondary border border-border rounded-xl p-xl">
            <div className="flex items-center gap-sm mb-md">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <h3 className="text-text-primary font-semibold text-base">
                Generated Audio
              </h3>
              <span className="text-text-tertiary text-sm">
                — {capitalize(selectedVoice)}
              </span>
            </div>
            <audio
              ref={audioRef}
              controls
              autoPlay
              className="w-full"
              src={audioUrl}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </main>
  );
};

export default TestPage;
