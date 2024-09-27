import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  header: [
    {
      key: "title",
      label: "Title",
      type: "text",
      subType: "",
      icon_key: "item_type"
    },
    {
      key: "inputFile",
      label: "Input File",
      type: "text",
      subType: "voice_wave",
      icon_key: "input_file",
      noText: true
    },
    {
      key: "fileType",
      label: "File Type",
      type: "text",
      subType: "",
    },
    {
      key: "outputFile",
      label: "Output File",
      type: "text",
      subType: "",
    },
    {
      key: "duration",
      label: "Duration",
      type: "text",
      subType: "",
    },
    {
      key: "dateAndtime",
      label: "Date & Time",
      type: "dateAndtime",
      subType: "",
    },
    {
      key: "play",
      label: "Play",
      type: "audio",
      subType: "",
    },
  ],
  body: [
    {
      title: "New Recording",
      inputFile: ".mp3",
      fileType: ".mp4",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      // play: {
      //   url:"https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
      //   type:".mp3"
      // },
      input_file: {
        icon_name: "bi:soundwave",
        input_file_url: '',
        styles: {
          // backgroundColor: "#5A97FF",
          fontSize: 30,
          // padding: 3,
          // borderRadius: 50,
          color: "c3d9ff"
        }

      }, item_type: {
        icon_name: "ri:mic-fill",
        styles: {
          backgroundColor: "#5A97FF",
          fontSize: 10,
          padding: 3,
          borderRadius: 50,
          color: "#fff"
        }
      }
    },
    {
      title: "Sample Audio",
      inputFile: ".mp3",
      fileType: "",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
      input_file: {
        icon_name: "bi:soundwave",
        input_file_url: '',
        styles: {
          // backgroundColor: "#5A97FF",
          fontSize: 30,
          // padding: 3,
          // borderRadius: 50,
          color: "c3d9ff"
        }

      }, item_type: {
        icon_name: "ic:baseline-upload",
        styles: {
          backgroundColor: "#ff898b",
          fontSize: 10,
          padding: 3,
          borderRadius: 50,
          color: "#fff"
        }
      }
    }, {
      title: "New Recording",
      inputFile: ".mp3",
      fileType: ".mp4",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
      input_file: {
        icon_name: "bi:soundwave",
        input_file_url: '',
        styles: {
          // backgroundColor: "#5A97FF",
          fontSize: 30,
          // padding: 3,
          // borderRadius: 50,
          color: "c3d9ff"
        }

      }, item_type: {
        icon_name: "ri:mic-fill",
        styles: {
          backgroundColor: "#5A97FF",
          fontSize: 10,
          padding: 3,
          borderRadius: 50,
          color: "#fff"
        }
      },
      input_file: {
        icon_name: "bi:soundwave",
        input_file_url: '',
        styles: {
          // backgroundColor: "#5A97FF",
          fontSize: 30,
          // padding: 3,
          // borderRadius: 50,
          color: "c3d9ff"
        }

      }
    },
    {
      title: "Sample Audio",
      inputFile: ".mp3",
      fileType: "",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
      input_file: {
        icon_name: "bi:soundwave",
        input_file_url: '',
        styles: {
          // backgroundColor: "#5A97FF",
          fontSize: 30,
          // padding: 3,
          // borderRadius: 50,
          color: "c3d9ff"
        }

      }, item_type: {
        icon_name: "ic:baseline-upload",
        styles: {
          backgroundColor: "#ff898b",
          fontSize: 10,
          padding: 3,
          borderRadius: 50,
          color: "#fff"
        }
      }
    }, {
      title: "New Recording",
      inputFile: ".mp3",
      fileType: ".mp4",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
      input_file: {
        icon_name: "bi:soundwave",
        input_file_url: '',
        styles: {
          // backgroundColor: "#5A97FF",
          fontSize: 30,
          // padding: 3,
          // borderRadius: 50,
          color: "c3d9ff"
        }

      }, item_type: {
        icon_name: "ri:mic-fill",
        styles: {
          backgroundColor: "#5A97FF",
          fontSize: 10,
          padding: 3,
          borderRadius: 50,
          color: "#fff"
        }
      }
    },
    {
      title: "Sample Audio",
      inputFile: ".mp3",
      fileType: "",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
      input_file: {
        icon_name: "bi:soundwave",
        input_file_url: '',
        styles: {
          // backgroundColor: "#5A97FF",
          fontSize: 30,
          // padding: 3,
          // borderRadius: 50,
          color: "c3d9ff"
        }

      }, item_type: {
        icon_name: "ic:baseline-upload",
        styles: {
          backgroundColor: "#ff898b",
          fontSize: 10,
          padding: 3,
          borderRadius: 50,
          color: "#fff"
        }
      }
    }, {
      title: "New Recording",
      inputFile: ".mp3",
      fileType: ".mp4",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
      input_file: {
        icon_name: "bi:soundwave",
        input_file_url: '',
        styles: {
          // backgroundColor: "#5A97FF",
          fontSize: 30,
          // padding: 3,
          // borderRadius: 50,
          color: "c3d9ff"
        }

      }, item_type: {
        icon_name: "ri:mic-fill",
        styles: {
          backgroundColor: "#5A97FF",
          fontSize: 10,
          padding: 3,
          borderRadius: 50,
          color: "#fff"
        }
      }
    },
    {
      title: "Sample Audio",
      inputFile: ".mp3",
      fileType: "",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
      input_file: {
        icon_name: "bi:soundwave",
        input_file_url: '',
        styles: {
          // backgroundColor: "#5A97FF",
          fontSize: 30,
          // padding: 3,
          // borderRadius: 50,
          color: "c3d9ff"
        }

      }, item_type: {
        icon_name: "ic:baseline-upload",
        styles: {
          backgroundColor: "#ff898b",
          fontSize: 10,
          padding: 3,
          borderRadius: 50,
          color: "#fff"
        }
      }
    },
  ],
  actions: [
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
  ],
};

const TableSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateBody: (state, action) => {
      state.body = action.payload;
    },
    addBodyItem: (state, action) => {
      state.body.push(action.payload);
    },
    // Add more reducers as needed
  },
});

export const { updateBody, addBodyItem } = TableSlice.actions;
export default TableSlice.reducer;
