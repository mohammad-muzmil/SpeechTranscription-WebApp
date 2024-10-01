import React, { useEffect, useState } from "react";
import "./ListingScreen.css"; // Import the CSS file for styling
import logoPng from "./../assets/images/logo.png";
import BasicTable from "../ReusableComponents/BasicTable";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, Grid2, Typography } from "@mui/material";
import AudioRecorder from "../ReusableComponents/AudioRecorder";
import axios from 'axios';
import AudioLoader from "../ReusableComponents/AudioLoaders/AudioLoader";
import ModalHeader from "../ReusableComponents/ModelHeader";


function ListingScreen() {

  const [active, setActive] = useState("upload");
  const [isRecording, setIsRecording] = useState(false);
  const [file, setFile] = useState(null);
  const [fileMetData, setFileMetaData] = useState({});
  const [loader, setLoader] = useState(false)

  const handleToggle = (option) => {
    setActive(option);
  };

  const handleFile = (file) => {
    // Here you can add any validation or handling logic for the file
    if (file.size <= 50 * 1024 * 1024) {
      setLoader(true)

      // Check for file size limit (200MB)
      handleSubmit(file)
      setFile(file);
      console.log("File uploaded:", file.name);
    } else {
      alert("File size exceeds the limit of 50MB");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const preventDefaults = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };


  const metaInformation = {
    requiredSerialNumber: true,
    paginatedSerialNumber: false,
    paginationMetaData: {
      count: 10,
      page: 1,
    },
  };

  const [transcriptionProcessData, setTranscriptionProcessData] = useState()

  // {
  //   "generated_speech_url": "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
  //   "total_response_time": "17.87 seconds",
  //   "transcription": "Manai, known as the Lazy Bug, seemed indifferent at work, arriving late, sipping coffee, and moving slowly. His colleagues believed he wasn't pulling his weight, always underestimating him. However, when the company faced a massive, buggy project with a tight deadline, panic struck the team, except Manai. Calmly observing, he surprised everyone by solving the complex issues effortlessly at the last minute, saving the project. What appeared to be laziness was, in fact, quiet genius. Manai was no longer seen as lazy, but as a brilliant problem solver, who worked on his own terms.",
  //   "transcription_time": "6.19 seconds",
  //   "tts_generation_time": "11.68 seconds"
  // }

  const handleSubmit = async (audioFile) => {
    // event.preventDefault();
    if (audioFile) {
      const formData = new FormData();
      formData.append('audio', audioFile); // 'audio' is the key for the file

      try {
        const response = await axios.post('http://192.168.0.182:5050/process_audio', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setLoader(false)

        console.log('File uploaded successfully:', response.data);

        if (response?.data?.generated_speech_url) {
          setTranscriptionProcessData(response?.data);

          let audio = new Audio(URL.createObjectURL(audioFile))
          setFileMetaData({ fileName: 'NewFile_' + new Date().getTime(), duration: audio.duration || '-' })
          handleOpen();
        }
      } catch (error) {
        setLoader(false)

        console.error('Error uploading file:', error);
      }
    } else {
      alert('Please select an audio file first');
      setLoader(false)

    }
  };

  const handleClose = () => {
    console.log("HANDEL");
    setOpen(!open);
    setFileMetaData();
    setTranscriptionProcessData();
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const { header, body, actions } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const recorder = (e) => { };
  console.log(file, "file");
  const [open, setOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const handleFileNameClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {

    setFileMetaData((prev) => {
      return { ...prev, ...{ fileName: e.target.value } }
    })
    // setFileName(e.target.value);
  };
  return (
    <div className="container">
      <div className="top-section">
        <img src={logoPng} alt="Logo" className="logo" />

        <div className="headerContent">
          <p className="headerTitle">
            Speech Transcription and Real-Time Processing
          </p>
          <div className="centerRuler"></div>

          <div className="recordSectionContainer">
            <div className="childSection">
              <p className="headerSubTitle">What would you like to do?</p>

              <div className="slider-container">
                <div
                  className={`slider ${active}`}
                  onClick={() =>
                    handleToggle(active === "upload" ? "record" : "upload")
                  }
                >
                  <div className="toggle" />
                </div>
                <div className="options">
                  <div
                    className={`option ${active === "upload" ? "active" : ""}`}
                    onClick={() => {
                      handleToggle("upload");
                      setIsRecording(false);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        icon="jam:upload"
                        width="30"
                        height="30"
                        style={{ marginRight: "8px" }}
                      />

                      <span style={{ fontSize: "16px" }}>Upload</span>
                    </div>
                  </div>
                  <div
                    className={`option ${active === "record" ? "active" : ""}`}
                    onClick={() => {
                      handleToggle("record");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        icon="material-symbols:mic"
                        width="28"
                        height="28"
                        style={{ marginRight: "8px" }}
                      />
                      <span style={{ fontSize: "16px" }}>Record</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="childSection uploadSection">

              {active === "upload" ? (
                // Your component or JSX for the "upload" condition
                <div
                  onDragEnter={preventDefaults}
                  onDragLeave={preventDefaults}
                  onDragOver={preventDefaults}
                  onDrop={handleDrop}
                  className="dropzone"
                >
                  <span style={{ textAlign: "center" }}>

                    <div className="uploadIconHolder">
                      <Icon
                        icon="solar:cloud-upload-outline"
                        style={{ fontSize: "65px", color: "#0560FD" }}
                      />
                    </div>

                    <div className="uploaderContentSection">
                      Drag & drop files or{" "}
                      <label className="browseButtonStyle" htmlFor="fileInput">
                        Browse
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        onChange={handleFileInputChange}
                        style={{ display: "none" }} // Hide the file input
                        accept=".wav,.mp3,.m4a,.mp4"
                      />
                    </div>

                    <span className="uploaderMutedText">
                      Limit 200mb per file. Supported formats: .wav, .mp3, .m4a,
                      .mp4
                    </span>
                  </span>
                </div>
              ) : (
                <>
                  {isRecording ? (
                    <>
                      <AudioRecorder />
                    </>
                  ) : (
                    <span
                      className="recordSectionContainer recordL1"
                      onClick={() => setIsRecording(true)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="recordSectionL1IconHolder">
                        <Icon
                          icon="material-symbols:mic"
                          style={{ fontSize: "50px", color: "white" }}
                        ></Icon>
                      </div>
                      <div className="titleSection">
                        <p className="titleContainer">Record Speech</p>
                        <p className="mutedText">
                          To record your Speech click on the blue button.
                        </p>
                      </div>
                    </span>
                  )}
                </>

                // <Grid2
                //   container
                //   spacing={2}
                //   sx={{
                //     display: "flex",
                //     justifyContent: "space-between",
                //     alignItems: "center",
                //     width: "40%",
                //     padding: "16px", // Added padding for spacing
                //     backgroundColor: "#F3F4F6", // Background color similar to the image
                //     border: "2px solid #E0E0E0", // Light gray border
                //     borderRadius: "16px", // Adjusted for rounded corners
                //     boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow
                //   }}
                // >
                //   <Grid2 item size={2}>
                //     <div
                //       style={{
                //         borderRadius: "50%",
                //         borderWidth: "2px",
                //         borderColor: "blue", // Change this to any color you prefer
                //         overflow: "hidden",
                //       }}
                //     >
                //       <Icon
                //         icon="material-symbols:mic"
                //         style={{ fontSize: "65px", color: "white" }}
                //       ></Icon>
                //     </div>
                //   </Grid2>
                //   <Grid2 item size={10} sx={{ color: "#8E8E8E" }}>
                //     <Typography variant="h6">Record Speech</Typography>
                //     <Typography>To record your Speech,</Typography>
                //     <Typography style={{ marginTop: "8px" }}>
                //       click on the <span>blue button</span>.
                //     </Typography>
                //   </Grid2>
                // </Grid2>
              )}
            </div>
          </div>
        </div>

        {/* This section will have the background image */}
      </div>
      <div className="bottom-section">
        {/* The remaining 60% section */}
        {/* <p>This is the bottom section.</p> */}

        <BasicTable
          header={header}
          body={body}
          actions={actions}
          metaData={metaInformation}
        />
      </div>
      {
        loader && <AudioLoader />

      }

      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        PaperProps={{
          sx: { maxWidth: 720, borderRadius: "15px" },
        }}
      >
        <ModalHeader heading="Audio Transcription" />
        <DialogContent>
          {transcriptionProcessData && (
            <>
              <p style={{ fontSize: '16px', fontWeight: 500, color: "#646464" }}>Input Audio</p>
              <audio
                src={file ? URL.createObjectURL(file) : ''}
                controls
                style={{
                  backgroundColor: 'transparent',
                  height: '30px',
                  width: '100%',
                  outline: 'none',
                }}
              />
              <div className="flexProperties" style={{ justifyContent: 'end' }}>
                <div className="flexProperties modal_text">
                  {isEditing ? (
                    <input
                      type="text"
                      value={fileMetData?.fileName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoFocus
                      style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', color: '#000' }}
                    />
                  ) : (
                    <span onDoubleClick={handleFileNameClick} style={{ cursor: 'pointer' }}>
                      {fileMetData?.fileName}
                    </span>
                  )}
                  <span>
                    Duration: {fileMetData?.duration}
                  </span>
                </div>
              </div>
              <div className="flexProperties" style={{ justifyContent: 'space-between', marginTop: '25px' }}>
                <span style={{ fontSize: '16px', fontWeight: 500, color: "#646464" }}>Transcription</span>
                <span>

                  <Icon icon="solar:chat-dots-linear" style={{ color: '#A7C7FF', fontSize: "20px" }}></Icon>
                </span>
              </div>
              <p style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>{transcriptionProcessData.transcription}</p>
              <p style={{ fontSize: '16px', fontWeight: 500, color: "#646464", marginTop: "25px" }}> Transcribed Audio</p>
              <audio src={transcriptionProcessData.generated_speech_url} controls style={{
                backgroundColor: 'transparent',
                height: '30px',
                width: '100%',
                outline: 'none',
              }} />
            </>
          )}
        </DialogContent>
        <DialogActions>

          <Button variant="contained" sx={{ backgroundColor: "#303030" }} onClick={() => { handleClose() }}>Discard</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default ListingScreen;
