import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import React, { useState, useRef, useEffect } from "react";
import ModalHeader from "./ModelHeader";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [open,setOpen] = useState(false);

  const handleClose=()=>{
    console.log("HANDEL")
    setOpen(!open);
  }
  const handleOpen=()=>{
    setOpen(true);
  }
  useEffect(() => {
    let interval = null;

    if (isRecording) {
      setRecordingTime(0);
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      // Clear the previous audio blob before starting a new recording
      // setAudioBlob(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendToBackend = () => {
    if (audioBlob) {
      console.log("Sending audio blob to backend...");
      // Example:
      // const formData = new FormData();
      // formData.append('audio', audioBlob, 'recording.webm');
      // fetch('/api/upload-audio', { method: 'POST', body: formData });
    }
  };

  return (
    <>
      {audioBlob ? (
        <>
          <audio src={URL.createObjectURL(audioBlob)} controls />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // paddingTop:5
            }}
          >
            <p style={{ padding: "4px", fontSize: "14px", fontWeight: 500 }}>
              New Recording
            </p>
            <p style={{ padding: "4px", fontSize: "14px", fontWeight: 500 }}>
              File Recorded
            </p>
            <p style={{ padding: "4px", fontSize: "14px", fontWeight: 500 }}>
              Duration: {formatTime(recordingTime)}
            </p>
          </div>

          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "6px",
            }}
            variant="contained"
            onClick={() => {handleOpen()}}
          >
            Start Transcription
          </Button>
        </>
      ) : (
        <>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: 30,
                marginTop: 10,
              }}
            >
              {!isRecording ? "Start" : "Stop"} Recoding
            </p>
            <div>
              {!isRecording ? (
                <Icon
                  onClick={startRecording}
                  icon="material-symbols:mic"
                  width="38"
                  height="38"
                  style={{
                    width: "34px", // Adjust as needed
                    height: "34px", // Adjust as needed
                    borderRadius: "50%", // Makes it circular
                    color: "#0560FD",
                    cursor: "pointer",
                    border: "1px solid #0560FD",
                    backgroundColor: "transparent",
                  }}
                />
              ) : (
                <Icon
                  onClick={stopRecording}
                  className="bg-gray-500 hover:bg-gray-600"
                  icon="fluent:record-stop-28-regular"
                  width="38"
                  height="38"
                  style={{
                    color: "red",
                    cursor: "pointer",
                  }}
                />
              )}
              {isRecording && <div>{formatTime(recordingTime)}</div>}
            </div>
          </div>
        </>
      )}
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        PaperProps={{
          sx: { maxWidth: 720 ,borderRadius:'15px'},
        }}
      >
         <ModalHeader heading="Audio Transcription" handleClose={handleClose}/>
        <DialogContent>
        {audioBlob && (
        <><p>Input Aduio</p>
          <audio src={URL.createObjectURL(audioBlob)} controls />
          <p>Transcripted Data</p>
          <p>Transcripted Audio</p>
          </>
          )
        }
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default AudioRecorder;
