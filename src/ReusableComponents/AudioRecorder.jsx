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

import styles from "./AudioRecorder.module.css";

const AudioRecorder = ({ handleSubmit, ResetDefault, getRecordTime }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState(
    "NewRecording_" + new Date().getTime()
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    let interval = null;

    if (isRecording) {
      setRecordingTime(0);
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    getRecordTime(recordingTime);
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
      // Check if browser supports audio recording
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("Media recording not supported in this browser.");
        return;
      }

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

      // Stop all tracks to free up resources
      const tracks = mediaRecorderRef.current.stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const reRecord = () => {
    setAudioBlob(null);
    setIsRecording(false);
  };

  const handleFileNameDoubleClick = () => {
    setIsEditing(true);
  };

  const handleFileNameBlur = (event) => {
    setFileName(event.target.value);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFileName(e.target.value);
  };

  return (
    <>
      {audioBlob ? (
        <>
          <audio
            src={URL.createObjectURL(audioBlob)}
            className={styles.audioPlayer}
            controls
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {isEditing ? (
              <input
                type="text"
                value={fileName}
                onChange={handleChange}
                onBlur={handleFileNameBlur}
                autoFocus
                className={styles.onHoverButton}
                style={{
                  padding: "4px",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#646464",
                  margin: 0,
                }}
              />
            ) : (
              <p
                style={{
                  padding: "4px",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#646464",
                  margin: 0,
                  cursor: "pointer",
                }}
                className={styles.onHoverButton}
                onDoubleClick={handleFileNameDoubleClick}
              >
                File Name: {fileName}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                padding: "4px",
                fontSize: "11px",
                fontWeight: 500,
                color: "#646464",
              }}
              className={styles.onHoverButton}
              onClick={() => reRecord()}
            >
              Re-Record
            </p>
            <p
              style={{
                padding: "4px",
                fontSize: "11px",
                fontWeight: 500,
                color: "#646464",
              }}
            >
              Duration: {formatTime(recordingTime)}
            </p>
          </div>

          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              marginTop: "6px",
            }}
            variant="contained"
            onClick={async () => {
              if (audioBlob) {
                try {
                  await handleSubmit({
                    fileName: fileName,
                    recordedURL: URL.createObjectURL(audioBlob),
                  });
                } catch (error) {
                  console.error("Error during submission:", error);
                }
              }
            }}
            disabled={!audioBlob}
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
              // justifyContent:"center"
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
              {!isRecording ? "Start" : "Stop"} Recording
            </p>
            <div>
              {!isRecording ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    onClick={startRecording}
                    icon="material-symbols:mic"
                    width="38"
                    height="38"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      color: "#0560FD",
                      cursor: "pointer",
                      border: "1px solid #0560FD",
                      backgroundColor: "transparent",
                    }}
                  />
                  <p
                    onClick={startRecording}
                    style={{
                      padding: "2px",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#646464",
                    }}
                  >
                    Click on mic to start Recording
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isRecording && <div>{formatTime(recordingTime)}</div>}

                  <Icon
                    onClick={stopRecording}
                    icon="fluent:record-stop-28-regular"
                    width="38"
                    height="38"
                    style={{
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                  <p
                    onClick={stopRecording}
                    style={{
                      padding: "2px",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#646464",
                    }}
                  >
                    Click on icon to stop Recording
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AudioRecorder;
