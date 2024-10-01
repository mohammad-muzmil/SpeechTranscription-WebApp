import React, { useEffect, useState, useRef } from 'react';

const AudioRecord = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const recordingTimeoutRef = useRef(null);

  useEffect(() => {
    const getMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);

        recorder.onstart = () => {
          console.log('Recording started');
        };

        recorder.ondataavailable = (event) => {
          console.log('Data available:', event.data.size);
          if (event.data.size > 0) {
            setAudioChunks((prev) => [...prev, event.data]);
          }
        };

        recorder.onerror = (error) => {
          console.error('Recorder error:', error);
        };

        recorder.onstop = () => {
          console.log('Recording stopped');
        };

        setMediaRecorder(recorder);
      } catch (err) {
        console.error("Microphone access denied or failed:", err);
      }
    };

    getMicrophoneAccess();
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      setAudioChunks([]); // Clear previous recordings
      if (audioURL) {
        URL.revokeObjectURL(audioURL); // Revoke the previous Blob URL
        setAudioURL(null);
      }
      mediaRecorder.start();
      setIsRecording(true);
      console.log('MediaRecorder state:', mediaRecorder.state);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      setIsRecording(false);
      mediaRecorder.stop();

      // Set a timeout to ensure all chunks are captured
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = setTimeout(() => {
        console.log('On stop event triggered, audio chunks:', audioChunks.length);

        if (audioChunks.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          console.log('Audio Blob size:', audioBlob.size);

          const audioURL = URL.createObjectURL(audioBlob);
          setAudioURL(audioURL);
        } else {
          console.error('No audio chunks available, recording may have failed');
        }
      }, 500); // Wait for 500ms after stopping to ensure all chunks are captured
    }
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {audioURL && (
        <div>
          <h3>Recorded Audio</h3>
          <audio controls src={audioURL} autoPlay></audio>
        </div>
      )}
    </div>
  );
};

export default AudioRecord;