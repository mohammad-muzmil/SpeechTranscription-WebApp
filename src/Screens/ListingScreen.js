import React, { useState } from "react";
import "./ListingScreen.css"; // Import the CSS file for styling
import logoPng from "./../assets/images/logo.png";
import BasicTable from "../ReusableComponents/BasicTable";
import { Icon } from "@iconify/react";

function ListingScreen() {
  const [active, setActive] = useState("upload");

  const handleToggle = (option) => {
    setActive(option);
  };

  const header = [
    {
      key: "title",
      label: "Title",
      type: "text",
      subType: "",
      // minWidth: 280
    },
    {
      key: "inputFile",
      label: "Input File",
      type: "icon",
      subType: "voice_wave",
      // minWidth: 30
    },
    {
      key: "fileType",
      label: "File Type",
      type: "text",
      subType: "",
      // minWidth: 30
    },
    {
      key: "outputFile",
      label: "Output File",
      type: "text",
      subType: "",
      // minWidth: 30
    },
    {
      key: "duration",
      label: "Duration",
      type: "text",
      subType: "",
      // minWidth: 30
    },
    {
      key: "date&time",
      label: "Date & Time",
      type: "date&time",
      subType: "",
      // minWidth: 30
    },
    {
      key: "play",
      label: "Play",
      type: "play",
      subType: "",
      // minWidth: 30
    },
  ];

  const body = [
    {
      title: "New Recording",
      inputFile: ".mp3",
      fileType: ".mp4",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
    },
    {
      title: "Sample Audio", // Added title to maintain consistency
      inputFile: ".mp3",
      fileType: "", // Optional, can be left empty
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
    },
    {
      title: "Another Sample", // Added title to maintain consistency
      inputFile: "", // Optional, can be left empty
      fileType: ".mp4",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
    },
  ];

  const actions = [
    {
      key: "download",
      label: "Download",
      icon: "ri:download-fill",
      color: "#0560FD",
    },
    {
      key: "delete",
      label: "Delete",
      icon: "fluent:delete-28-regular",
      color: "red",
    },
    // {
    //     key: "delete",
    //     label: "Delete",
    //     icon: "arcticons:music-party",
    //     color: "red",
    // },
    {},
  ];

  const metaInformation = {
    requiredSerialNumber: true,
    paginatedSerialNumber: false,
    paginationMetaData: {
      count: 10,
      page: 1,
    },
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
                    onClick={() => handleToggle("upload")}
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
                    onClick={() => handleToggle("record")}
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
              <div className="uploadIconHolder">
                <Icon
                  icon="solar:cloud-upload-outline"
                  style={{ fontSize: "65px", color: "#0560FD" }}
                ></Icon>
              </div>

              <div className="uploaderContentSection">
                Drag & drop files or{" "}
                <span className="browseButtonStyle">Browse</span>
              </div>

              <span className="uploaderMutedText">
                Limit 200mb per file. Supported formats: .wav, .mp3, .m4a, .mp4{" "}
              </span>
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
