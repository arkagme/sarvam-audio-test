// Voice data configuration
export const maleVoices = [
  'aayan',
  'aditya',
  'advait',
  'amit',
  'ashutosh',
  'dev',
  'kabir',
  'manan',
  'rahul',
  'ratan',
  'rohan',
  'shubh',
  'sumit',
  'varun',
];

export const femaleVoices = [
  'amelia',
  'ishita',
  'kavya',
  'neha',
  'pooja',
  'priya',
  'ritu',
  'roopa',
  'shreya',
  'simran',
  'sophia',
];

// Generate audio file path
export const getAudioPath = (voiceName) => {
  return `/sarvam_audios/${voiceName}_voice.wav`;
};
