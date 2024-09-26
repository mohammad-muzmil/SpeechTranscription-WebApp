import logo from "./logo.svg";
import "./App.css";
import BasicTable from "./ReusableComponents/BasicTable";

const header = [
  {
    key: "title",
    label: "Title",
    type: "text",
    subType: "",
  },
  {
    key: "inputFile",
    label: "Input File",
    type: "audio",
    subType: "",
  },
  {
    key: "fileType",
    label: "File Type",
    type: "text",
    subType: "",
  },
];
const body = [
  {
    id: "title",
    title: "Sample Data",
  },
  {
    id: "inputFile",
    title: "ram",
  },
  {
    id: "fileType",
    title: "Sample Data",
  },
];
function App() {
  return (
    <>
      <BasicTable header={header} body={body} />
    </>
  );
}

export default App;
