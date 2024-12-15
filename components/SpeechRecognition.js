import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Keyboard } from 'lucide-react';

const SpeechToTextInput = ({ 
  placeholder = 'Start speaking...', 
  onTranscriptChange,
  className = '',
  defaultValue = '',
  tapSoundEnabled = true
}) => {
  const [transcript, setTranscript] = useState(defaultValue);
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [browserSupported, setBrowserSupported] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const textareaRef = useRef(null);
  const tapSoundRef = useRef(null);

  useEffect(() => {
    // Comprehensive debug logging
    const logDebug = (message) => {
      console.log(`[SpeechToTextInput Debug] ${message}`);
      setDebugInfo(prev => `${prev}\n${message}`);
    };

    // Sound initialization debug
    const initializeSound = () => {
      try {
        if (tapSoundEnabled) {
          logDebug('Attempting to initialize tap sound');
          tapSoundRef.current = new Audio('/tap.mp3');
          tapSoundRef.current.load();
          
          // Add error and canplay event listeners
          tapSoundRef.current.onerror = (e) => {
            logDebug(`Sound error: ${e.type}`);
            console.error('Sound initialization error', e);
          };
          tapSoundRef.current.oncanplay = () => {
            logDebug('Tap sound loaded successfully');
          };
        }
      } catch (error) {
        logDebug(`Sound initialization failed: ${error.message}`);
        console.error('Sound initialization error', error);
      }
    };

    // Check browser support with multiple prefixes
    const checkSpeechRecognitionSupport = () => {
      const SpeechRecognition = 
        window.SpeechRecognition || 
        window.webkitSpeechRecognition || 
        window.mozSpeechRecognition || 
        window.msSpeechRecognition;

      if (SpeechRecognition) {
        logDebug('Speech Recognition API detected');
        setBrowserSupported(true);

        try {
          const recognitionInstance = new SpeechRecognition();
          
          // Detailed configuration logging
          logDebug(`Recognition config:
            - Continuous: ${recognitionInstance.continuous}
            - Interim Results: ${recognitionInstance.interimResults}
            - Language: ${recognitionInstance.lang}`);

          // Configure recognition
          recognitionInstance.continuous = true;
          recognitionInstance.interimResults = true;
          recognitionInstance.lang = 'en-US';

          // Detailed event handlers with logging
          recognitionInstance.onstart = () => {
            logDebug('Speech recognition started');
            setListening(true);
            playTapSound();
          };

          recognitionInstance.onresult = (event) => {
            logDebug('Speech recognition result received');
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + ' ';
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }

            const newTranscript = (transcript + ' ' + finalTranscript + interimTranscript).trim();
            setTranscript(newTranscript);
            
            if (onTranscriptChange) {
              onTranscriptChange({ target: { value: newTranscript } });
            }
          };

          recognitionInstance.onend = () => {
            logDebug('Speech recognition ended');
            setListening(false);
            playTapSound();
          };

          recognitionInstance.onerror = (event) => {
            logDebug(`Speech recognition error: ${event.error}`);
            console.error('Speech recognition error:', event.error);
            setListening(false);
            playTapSound();
          };

          setRecognition(recognitionInstance);
        } catch (error) {
          logDebug(`Failed to create recognition instance: ${error.message}`);
          console.error('Recognition instance creation failed', error);
        }
      } else {
        logDebug('Speech recognition not supported in this browser');
      }
    };

    // Initialize sound and check speech recognition
    initializeSound();
    checkSpeechRecognitionSupport();

    // Cleanup
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const playTapSound = () => {
    try {
      if (tapSoundEnabled && tapSoundRef.current) {
        console.log('Attempting to play tap sound');
        
        // Verify sound reference and audio state
        if (tapSoundRef.current instanceof Audio) {
          tapSoundRef.current.currentTime = 0;
          
          const playPromise = tapSoundRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise.then(() => {
              console.log('Tap sound played successfully');
            }).catch((error) => {
              console.warn('Error playing tap sound:', error);
            });
          }
        } else {
          console.warn('Invalid tap sound reference');
        }
      } else {
        console.warn('Tap sound not enabled or no sound reference');
      }
    } catch (error) {
      console.error('Unexpected error playing tap sound:', error);
    }
  };

  const toggleListening = () => {
    console.log('Toggle listening called');
    console.log('Browser supported:', browserSupported);
    console.log('Recognition instance:', recognition);

    if (!browserSupported || !recognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      if (listening) {
        console.log('Stopping recognition');
        recognition.stop();
      } else {
        console.log('Starting recognition');
        recognition.start();
      }
    } catch (error) {
      console.error('Error toggling speech recognition:', error);
      alert('Failed to start/stop speech recognition.');
    }
  };

  // Rest of the component remains the same as in previous version

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={transcript}
        onChange={(e) => {
          setTranscript(e.target.value);
          if (onTranscriptChange) onTranscriptChange(e);
        }}
        placeholder={placeholder}
        className={`w-full p-3 bg-white/20 backdrop-blur-sm text-black rounded-xl min-h-[120px] resize-none border-2 border-orange-200 pr-10 ${className} ${listening ? 'border-blue-500' : ''}`}
      />
      <button
        onClick={toggleListening}
        className={`absolute right-2 top-2 p-1 rounded-full  hover:cursor-pointer ${
          listening 
            ? 'bg-red-100 text-red-600' 
            : 'bg-blue-100 text-blue-600'
        }`}
        aria-label={listening ? 'Stop Listening' : 'Start Listening'}
      >
        {listening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>
      {/* Debug info display */}
      {/* <pre className="text-xs text-red-500 mt-2">{debugInfo}</pre> */}
    </div>
  );
};

export default SpeechToTextInput;