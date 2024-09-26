import React from 'react';
import './ListingScreen.css'; // Import the CSS file for styling
import logoPng from './../assets/images/logo.png'
import BasicTable from '../ReusableComponents/BasicTable';

function ListingScreen() {


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

    const actions = [
        {
            key: "edit",
            label: "Edit",
            icon: "basil:edit-outline",
            color: "black",
        },
        {
            key: "delete",
            label: "Delete",
            icon: "fluent:delete-28-regular",
            color: "red",
        },
        {},
    ];
    return (
        <div className="container">
            <div className="top-section">

                <img src={logoPng} alt="Logo" className="logo" />

                <div className='headerContent'>

                    <p className='headerTitle'>Speech Transcription and Real-Time Processing</p>

                    <div className='centerRuler'></div>
                </div>



                {/* This section will have the background image */}
            </div>
            <div className="bottom-section">
                {/* The remaining 60% section */}
                {/* <p>This is the bottom section.</p> */}

                <BasicTable header={header} body={body} actions={actions} />
            </div>
        </div>
    );
}

export default ListingScreen;
