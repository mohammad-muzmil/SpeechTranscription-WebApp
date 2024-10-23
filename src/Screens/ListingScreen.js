import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ListingScreen.css"; // Import the CSS file for styling
import logoPng from "./../assets/images/logo.png";
import BasicTable from "../ReusableComponents/BasicTable";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Popover,
  Typography,
} from "@mui/material";
import AudioRecorder from "../ReusableComponents/AudioRecorder";
import {
  addBodyItem,
  fetchBodyData,
  removeBodyItem,
} from "../store/TableSlice";
import axios from "axios";
import AudioLoader from "../ReusableComponents/AudioLoaders/AudioLoader";
import ModalHeader from "../ReusableComponents/ModelHeader";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function ListingScreen() {
  const APIURL = window?.location.hostname;
  let protocol = window.location.protocol;
  const CryptoJS = require("crypto-js");
  const navigate = useNavigate();
  const secureKey = process.env.REACT_APP_SECURE_KEY;

  const [active, setActive] = useState("upload");
  const [isRecording, setIsRecording] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [fileMetData, setFileMetaData] = useState({});
  const [loader, setLoader] = useState(false);
  const [inputPlayerModal, setInputPlayerModal] = useState(false);
  const [inputPlayerURL, setInputPlayerURL] = useState("");
  const [transcriptionProcessData, setTranscriptionProcessData] = useState();
  const [newBodyItem, setNewBodyItem] = useState({});
  const [open, setOpen] = useState(false);
  const [logoutDailog, setLogoutDailog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [audioTime, setAudioTime] = useState(null);
  const [dailogActions, setDailogActions] = useState(true);
  const handleToggle = (option) => {
    setActive(option);
  };

  const currentAudioRef = useRef(null);
  const handleAudioPlay = (event) => {
    // If there's already an audio playing, pause it
    if (currentAudioRef.current && currentAudioRef.current !== event.target) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0; // Reset time if you want
    }

    // Update the reference to the currently playing audio
    currentAudioRef.current = event.target;
  };
  const ResetDefault = () => {
    setIsRecording(false);
  };

  const getRecordTime = (time) => {
    setAudioTime(time);
  };
  const getUserDetails = () => {
    const userEncrypted = localStorage.getItem("user");

    if (userEncrypted) {
      try {
        const decryptedData = CryptoJS.AES.decrypt(
          userEncrypted,
          secureKey
        ).toString(CryptoJS.enc.Utf8);
        if (!decryptedData) {
          console.error("Decrypted data is empty.");
          return null;
        }
        const userDetails = JSON.parse(decryptedData);
        return userDetails;
      } catch (error) {
        console.error("Error during decryption or parsing:", error);
        return null;
      }
    } else {
      return null; // Return null if no user data exists
    }
  };
  const userDetails = getUserDetails();
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleFile = (file) => {
    // Here you can add any validation or handling logic for the file

    document.getElementById("fileInput").value = "";

    if (file.size <= 50 * 1024 * 1024) {
      // setLoader(true);

      // Check for file size limit (200MB)
      // if (!userDetails) {
      //   setShowDialog(true);
      // } else {
      // }
      handleSubmit(file);
      setFile(file);
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
  // const handleFileUploadClick = (event) => {
  //   if (!userDetails) {
  //     event.preventDefault();
  //     setShowDialog(true);
  //     console.log(userDetails, "userDetails");
  //   } else {
  //     if (!file) document.getElementById("fileInput").click(); // Trigger file input click
  //   }
  // };
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

  // {
  //   "generated_speech_url": "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
  //   "total_response_time": "17.87 seconds",
  //   "transcription": "Manai, known as the Lazy Bug, seemed indifferent at work, arriving late, sipping coffee, and moving slowly. His colleagues believed he wasn't pulling his weight, always underestimating him. However, when the company faced a massive, buggy project with a tight deadline, panic struck the team, except Manai. Calmly observing, he surprised everyone by solving the complex issues effortlessly at the last minute, saving the project. What appeared to be laziness was, in fact, quiet genius. Manai was no longer seen as lazy, but as a brilliant problem solver, who worked on his own terms.",
  //   "transcription_time": "6.19 seconds",
  //   "tts_generation_time": "11.68 seconds"
  // }
  const StoreData = () => {
    let data = newBodyItem;
    data["title"] = fileMetData?.fileName;
    data["input_file"]["input_file_url"] = URL.createObjectURL(file);
    dispatch(addBodyItem(data));
    setOpen(false);
    setAudioTime(null);
  };

  const handleDownload = async (dataInput) => {
    try {
      const zip = new JSZip();

      // Add text content
      const textContent = dataInput?.Transcription;
      zip.file("transcription.txt", textContent);

      // Add audio files (Assuming the audio files are in the `public` folder or URLs)
      const audio1Url = dataInput?.input_file?.input_file_url; // Replace with your actual path
      const audio2Url = dataInput?.audio?.url; // Replace with your actual path

      // Fetch audio files as blobs
      const audio1Blob = await fetch(audio1Url).then((res) => res.blob());
      const audio2Blob = await fetch(audio2Url).then((res) => res.blob());

      let newAudio = new Audio(dataInput);
      // Add audio files to the ZIP
      zip.file("input_file.mp3", audio1Blob);
      zip.file("transcripted_output.mp3", audio2Blob);

      // Generate the ZIP file and trigger download
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, dataInput?.title || "Download" + ".zip");
      });
    } catch (error) {
      console.error(error);
    }
  };
  let previousAudioUrl = null;

  async function fetchAudioAsBlob(url) {
    try {
      // Clear previous audio URL if it exists
      if (previousAudioUrl) {
        URL.revokeObjectURL(previousAudioUrl);
      }

      // Fetch the audio file from the URL
      const response = await fetch(url);

      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Convert the response to a Blob
      const audioBlob = await response.blob();

      // Create a URL for the Blob
      const audioUrl = URL.createObjectURL(audioBlob);

      // Store the new audio URL
      previousAudioUrl = audioUrl;

      // You can return the audio URL or the Blob, depending on your needs
      return {
        audioBlob,
        audioUrl,
      };
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  }
  const loginAPI = async (payload) => {
    try {
      const response = await axios.post(
        `http://192.168.1.81:5050/store_user`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
      throw error;
    }
  };
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const data = result?.user;

      // You can access user details here
      // const { email, displayName, photoURL, uid } = user;
      const user = data?.providerData[0];
      // Optionally call your API
      const response = await loginAPI(user);
      if (response?.stored_data?.user_id) {
        // navigate("/Home");
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(response?.stored_data),
          secureKey
        ).toString();
        localStorage.setItem("user", encryptedData);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
    }
    setShowDialog(false);
  };
  const handleOptions = () => {
    setOpenDialog(true);
  };
  const handleClosePopover = () => {
    setOpenDialog(false);
  };
  const handleConfirmlogout = ()=>{
    handleLogout()
    setLogoutDailog(false)
  }
  const handleCancellogout = () =>{
    setLogoutDailog(false)
  }
  const handleOpenlogout = () =>{
    setLogoutDailog(true)
  }
  const handleLogout = async() => {
    await signOut(auth);
    localStorage.clear();
    navigate("/")
  };
  const processAudioUpload = async (audioFile) => {
    let newAudioFile = audioFile?.recordedURL
      ? audioFile.recordedURL
      : audioFile;

    if (audioFile?.recordedURL) {
      const audio1Blob = await fetch(audioFile?.recordedURL).then((res) =>
        res.blob()
      );
      newAudioFile = audio1Blob;
      setFile(audio1Blob);
    }
    let fileName = audioFile?.fileName
      ? audioFile.fileName
      : "NewFile_" + new Date().getTime();
    const formData = new FormData();
    formData.append("audio", newAudioFile); // 'audio' is the key for the file
    formData.append("type", "input");
    formData.append("user_id", userDetails?.user_id);
    try {
      setLoader(true);
      const response = await axios.post(
        // `${protocol}//${APIURL}:5050/process_audio`,
        `http://192.168.1.81:5050/process_audio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);

      if (response?.data?.generated_speech_url) {
        setTranscriptionProcessData(response?.data);
        let outPutAudio = await fetchAudioAsBlob(
          response?.data?.generated_speech_url
        ).then(({ audioBlob, audioUrl }) => {
          return { audioBlob: audioBlob, audioUrl: audioUrl };
        });
        let audio = new Audio(URL.createObjectURL(newAudioFile));

        audio.onloadedmetadata = () => {
          let duration = Math.floor(audio?.duration); // Truncate to whole seconds
          setFileMetaData({
            fileName: fileName,
            duration: formatTime(duration) || "-",
          });
          // STEP DOWNLOAD BLOB FOR URL, Make it URL Again using new Audio(URL.createObjectURL())
          setTranscriptionProcessData((prev) => ({
            ...prev,
            generated_speech_url: outPutAudio?.audioUrl,
          }));
          setNewBodyItem({
            // title: fileName,
            inputFile: fileName,
            fileType: newAudioFile.type, // Assuming fileType is the same as inputFile
            Transcription:
              response.data.transcription || "Transcription not available", // Replace with actual transcription
            duration: audioTime
              ? formatTime(audioTime)
              : formatTime(duration) || "-",
            dateAndtime: new Date().toLocaleString(), // Get current date and time
            audio: {
              url: outPutAudio?.audioUrl,
              type: newAudioFile.type,
            },
            input_file: {
              icon_name: "bi:soundwave",
              input_file_url: file ? URL.createObjectURL(file) : "",
              styles: {
                color: "c3d9ff",
                fontSize: 15,
              },
            },
            item_type: audioFile?.recordedURL
              ? {
                  icon_name: "ri:mic-fill",
                  styles: {
                    backgroundColor: "#5A97FF",
                    fontSize: 15,
                    padding: 3,
                    borderRadius: 50,
                    color: "#fff",
                  },
                }
              : {
                  icon_name: "ic:baseline-upload",
                  styles: {
                    backgroundColor: "#ff898b",
                    fontSize: 15,
                    padding: 3,
                    borderRadius: 50,
                    color: "#fff",
                  },
                },
          });

          // Dispatch the action to add the new body item

          handleOpen("View");
          setIsRecording(false);
        };
      }
    } catch (error) {
      setLoader(false);

      console.error("Error uploading file:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = async (audioFile) => {
    // event.preventDefault();

    let newAudioFile = audioFile?.recordedURL
      ? audioFile.recordedURL
      : audioFile;

    if (audioFile?.recordedURL) {
      const audio1Blob = await fetch(audioFile?.recordedURL).then((res) =>
        res.blob()
      );
      newAudioFile = audio1Blob;
      setFile(audio1Blob);
    }
    if (newAudioFile) {
      // if (!userDetails) {
      //   // setTimeout(async () => {
      //   try {
      //     // await handleLogin(); // Attempt to log in
      //     // setShowDialog(false); // Close the dialog after login attempt
      //     // Check if the user is now logged in
      //     if (userDetails) {
      //       await processAudioUpload(newAudioFile); // Proceed with the upload
      //     }
      //   } catch (error) {
      //     console.error("Error during auto login:", error);
      //   }
      //   // }, 5000);
      // }
      // else {
      // }
      await processAudioUpload(newAudioFile); // Proceed with the upload if user is logged in
    } else {
      alert("Please select an audio file");
    }
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleInputModalClose = () => {
    setInputPlayerModal(false);
  };
  const handleOpen = (type) => {
    setOpen(true);
    if (type === "View") {
      setDailogActions(true);
    }
  };
  const { header, body, actions } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const handleFileNameClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFileMetaData((prev) => {
      return { ...prev, ...{ fileName: e.target.value } };
    });
    // setFileName(e.target.value);
  };

  const actionEmitter = (e) => {
    if (e?.action?.key === "download") {
      handleDownload(e?.item);
    } else if (e?.action?.key === "delete") {
      // handleDownload(e?.item)

      dispatch(removeBodyItem(e?.item));
    } else if (e?.action?.type === "rowClick") {
      setInputPlayerURL(e?.data?.input_file?.input_file_url);
      setInputPlayerModal(true);
      // open a modal to play input value
    } else if (e?.action?.type === "openModel") {
      setDailogActions(false);
      setTranscriptionProcessData({
        transcription: e?.data?.Transcription,
        generated_speech_url: e?.data?.audio?.url,
        input_audio: e?.data?.input_file?.input_file_url,
        duration: e?.data?.duration,
        fileName: e?.data?.inputFile,
      });
      setFileMetaData({
        fileName: e?.data?.inputFile,
        duration: e?.data?.duration,
      });
      setFile(null);
      handleOpen();
    }
  };
  return (
    <div className="container">
      <div className="top-section">
        
        <div className="flex-properties-corner">
        <img src={logoPng} alt="Logo" className="logo" />

        <Avatar
              src={userDetails?.photoURL}
              alt={userDetails?.displayName || "User Avatar"}
              onClick={() => handleOptions()}
              sx={{
                width: 50,
                height: 50,
                cursor: "pointer",
                marginTop: "10px",
              }}
            />
  <Popover
  open={openDialog}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'bottom',
  }}
  onClose={handleClosePopover}
>
  {/* Cancel Icon */}
  {/* <div
    style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
  >
    <Icon
      size="small"
      sx={{
        color: "black",
      }}
      cursor="pointer"
      width={25}
      height={25}
      icon="material-symbols:cancel"
      onClick={() => {
        setOpenDialog(false);
      }}
    />
  </div> */}

  {/* Content Section */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", // Center content vertically
      textAlign: "center", // Center text
      padding: "16px", // Add padding for better spacing
    }}
  >
    <Avatar
      src={userDetails?.photoURL}
      alt={userDetails?.displayName || "User Avatar"}
      sx={{ width: 60, height: 60}}
    />
    <Typography variant="body1" sx={{ marginTop: 2 }}>
      {userDetails?.email}
    </Typography>

    {/* Logout Button */}
    <Button
      // size="small"
      variant="contained"
      color="error"
      onClick={handleOpenlogout}
      sx={{ marginTop: 2 ,textTransform:"none"}} // Space above the button
    >
      Logout
    </Button>
  </div>
</Popover>
        </div>
   
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
                      <label
                        className="browseButtonStyle"
                        htmlFor="fileInput"
                        // onClick={handleFileUploadClick}
                        style={{ cursor: "pointer" }}
                      >
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
                      <AudioRecorder
                        handleSubmit={handleSubmit}
                        ResetDefault={ResetDefault}
                        getRecordTime={getRecordTime}
                      />
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
          actionEmitter={actionEmitter}
        />
      </div>
      {loader && <AudioLoader />}

      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        PaperProps={{
          sx: { maxWidth: 720, borderRadius: "15px" },
        }}
      >
        <ModalHeader heading="Audio Transcription" handleClose={handleClose} />
        <DialogContent>
          {transcriptionProcessData && (
            <>
              <p
                style={{ fontSize: "16px", fontWeight: 500, color: "#646464" }}
              >
                Input Audio
              </p>
              <audio
                src={
                  file
                    ? URL.createObjectURL(file)
                    : transcriptionProcessData?.input_audio
                }
                controls
                style={{
                  backgroundColor: "transparent",
                  height: "30px",
                  width: "100%",
                  outline: "none",
                }}
                onPlay={handleAudioPlay}
              />
              <div className="flexProperties" style={{ justifyContent: "end" }}>
                <div className="flexProperties modal_text">
                  {isEditing ? (
                    <input
                      type="text"
                      value={fileMetData?.fileName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoFocus
                      style={{
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        color: "#000",
                      }}
                    />
                  ) : (
                    <span
                      onDoubleClick={handleFileNameClick}
                      style={{ cursor: "pointer" }}
                    >
                      {fileMetData?.fileName}
                    </span>
                  )}
                  <span>
                    Duration:{" "}
                    {audioTime ? formatTime(audioTime) : fileMetData?.duration}
                  </span>
                </div>
              </div>
              <div
                className="flexProperties"
                style={{ justifyContent: "space-between", marginTop: "25px" }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#646464",
                  }}
                >
                  Transcription
                </span>
                <span>
                  <Icon
                    icon="solar:chat-dots-linear"
                    style={{ color: "#A7C7FF", fontSize: "20px" }}
                  ></Icon>
                </span>
              </div>
              <p style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>
                {transcriptionProcessData?.transcription}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#646464",
                  marginTop: "25px",
                }}
              >
                {" "}
                Transcribed Audio
              </p>
              <audio
                src={transcriptionProcessData?.generated_speech_url}
                controls
                style={{
                  backgroundColor: "transparent",
                  height: "30px",
                  width: "100%",
                  outline: "none",
                }}
                onPlay={handleAudioPlay}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {dailogActions ? (
            <>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#303030" }}
                onClick={() => {
                  handleClose("clear");
                }}
              >
                Discard
              </Button>
              <Button variant="contained" onClick={() => StoreData()}>
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#303030" }}
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* <Dialog
        PaperProps={{
          sx: { maxWidth: 720, borderRadius: "15px" },
        }}
        open={showDialog}
        onClose={() => setShowDialog(false)}
      >
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Hi there! You need to log in before proceeding.
          </Typography>
        </DialogContent>
        <dailogActions>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <Button
              id="loginButton"
              size="small"
              variant="contained"
              onClick={() => handleLogin()}
            >
              Login
            </Button>
          </div>
        </dailogActions>
      </Dialog> */}
      
      <Modal
        open={inputPlayerModal}
        onClose={handleInputModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <Icon
            icon="icon-park-solid:close-one"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              fontSize: "24px", // Adjust icon size
              color: "#fff", // Change color as needed
            }}
            onClick={handleInputModalClose} // Close the modal when clicked
          />
          <div
            style={{
              // backgroundColor: '#fff',
              border: "0px solid #ccc",
              width: "40%",

              padding: "20px",
              borderRadius: "8px",
              // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              // position: 'relative' // Add position relative for positioning the close button
            }}
          >
            {/* <iconify-icon ></iconify-icon> */}

            <audio
              src={inputPlayerURL}
              controls
              style={{
                backgroundColor: "transparent",
                height: "50px",
                width: "100%",
                outline: "none",
              }}
            />
          </div>
        </div>
      </Modal>
    
<Dialog
      fullWidth
      maxWidth={false}
      open={logoutDailog}
      PaperProps={{
        sx: { maxWidth: 420, borderRadius: '15px' },
      }}
    >
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        Are you sure you want to log out?
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={handleCancellogout} color="primary" variant="contained">
          No
        </Button>
        <Button size="small" onClick={handleConfirmlogout} color="error" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}
{
}
export default ListingScreen;
