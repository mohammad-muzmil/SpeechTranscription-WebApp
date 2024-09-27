import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  header: [
    {
      key: "title",
      label: "Title",
      type: "text",
      subType: "",
    },
    {
      key: "inputFile",
      label: "Input File",
      type: "icon",
      subType: "voice_wave",
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
    },
    {
      title: "Sample Audio",
      inputFile: ".mp3",
      fileType: "",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
    },
    {
      title: "Another Sample",
      inputFile: "",
      fileType: ".mp4",
      outputFile: "Hi! its a new audio recording...",
      duration: "00:10",
      "date&time": "23/09/2024  17:40",
      play: "",
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
