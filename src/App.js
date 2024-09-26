import logo from "./logo.svg";
import "./App.css";
import BasicTable from "./ReusableComponents/BasicTable";

const header = [
  {
    key: "title",
    label: "Title",
    type: "text",
    subType: "",
    minWidth: 280

  },
  {
    key: "inputFile",
    label: "Input File",
    type: "audio",
    subType: "",
    minWidth: 10
  },
  {
    key: "fileType",
    label: "File Type",
    type: "text",
    subType: "",
    minWidth: 30
  },
];

const body = [
  {
    title: "Ram",
    inputFile: ".mp3",
    fileType: ".mp4",
  },
  {
    title: "Sample Audio", // Added title to maintain consistency
    inputFile: ".mp3",
    fileType: "", // Optional, can be left empty
  },
  {
    title: "Another Sample", // Added title to maintain consistency
    inputFile: "", // Optional, can be left empty
    fileType: ".mp4",
  },
];

function App() {
  return (
    <>
      <p>Hi</p>
      <BasicTable header={header} body={body} />
    </>
  );
}

export default App;
