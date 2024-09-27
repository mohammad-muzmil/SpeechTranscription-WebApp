import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  header: [
    {
      key: "title",
      label: "Title",
      type: "text",
      subType: "",
<<<<<<< HEAD
=======
      icon_key: "item_type"
>>>>>>> b1e23b6e18fd9d4353286dc9b890169700ce06e4
    },
    {
      key: "inputFile",
      label: "Input File",
      type: "icon",
      subType: "voice_wave",
<<<<<<< HEAD
=======
      icon_key: "input_file",
      noText: true
>>>>>>> b1e23b6e18fd9d4353286dc9b890169700ce06e4
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
      key: "date&time",
      label: "Date & Time",
      type: "date&time",
      subType: "",
    },
    {
      key: "play",
      label: "Play",
      type: "play",
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
      play: "",
<<<<<<< HEAD
=======
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
>>>>>>> b1e23b6e18fd9d4353286dc9b890169700ce06e4
    },
    {
      title: "Sample Audio",
      inputFile: ".mp3",
      fileType: "",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
<<<<<<< HEAD
    },
    {
      title: "Another Sample",
      inputFile: "",
=======
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
>>>>>>> b1e23b6e18fd9d4353286dc9b890169700ce06e4
      fileType: ".mp4",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
<<<<<<< HEAD
=======
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
>>>>>>> b1e23b6e18fd9d4353286dc9b890169700ce06e4
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
