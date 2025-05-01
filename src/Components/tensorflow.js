// tensorflow.js

import * as speechCommands from '@tensorflow-models/speech-commands';

// Global recognizer variable
let recognizer;

// Initialize the recognizer
export async function initVoiceRecognizer(onCommandDetected) {
  recognizer = speechCommands.create('BROWSER_FFT');
  await recognizer.ensureModelLoaded();

  // Get list of words that model can recognize
  const labels = recognizer.wordLabels();

  // Start listening to the microphone
  recognizer.listen(result => {
    const scores = result.scores;
    const highestScoreIndex = scores.indexOf(Math.max(...scores));
    const detectedCommand = labels[highestScoreIndex];

    // Optional: Only trigger callback for specific words
    if (scores[highestScoreIndex] > 0.75) {
      onCommandDetected(detectedCommand);
    }
  }, {
    includeSpectrogram: true,
    probabilityThreshold: 0.75,
    invokeCallbackOnNoiseAndUnknown: false,
    overlapFactor: 0.5
  });

  console.log('Voice recognizer started');
}

// Stop the recognizer
export function stopVoiceRecognizer() {
  if (recognizer && recognizer.isListening()) {
    recognizer.stopListening();
    console.log('Voice recognizer stopped');
  }
}