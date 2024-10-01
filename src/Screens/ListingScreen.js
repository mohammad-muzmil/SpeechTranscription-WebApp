import React, { useEffect, useState } from "react";
import "./ListingScreen.css"; // Import the CSS file for styling
import logoPng from "./../assets/images/logo.png";
import BasicTable from "../ReusableComponents/BasicTable";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import AudioRecorder from "../ReusableComponents/AudioRecorder";
function ListingScreen() {
  const [active, setActive] = useState("record");
  const [isRecording, setIsRecording] = useState(false);
  const [file, setFile] = useState(null);

  const handleToggle = (option) => {
    setActive(option);
  };

  const handleFile = (file) => {
    // Here you can add any validation or handling logic for the file
    if (file.size <= 50 * 1024 * 1024) {
      // Check for file size limit (200MB)
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

  const { header, body, actions } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const recorder = (e) => {};
  console.log(file, "file");
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
    </div>
  );
}

export default ListingScreen;
