import React, { useState } from 'react';
import './ListingScreen.css'; // Import the CSS file for styling
import logoPng from './../assets/images/logo.png'
import BasicTable from '../ReusableComponents/BasicTable';
import { Icon } from '@iconify/react';

function ListingScreen() {

    const [active, setActive] = useState('upload');

    const handleToggle = (option) => {
        setActive(option);
    };

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
            type: "icon",
            subType: "voice_wave",
            minWidth: 30
        },
        {
            key: "fileType",
            label: "File Type",
            type: "text",
            subType: "",
            minWidth: 30
        },
        {
            key: "outputFile",
            label: "Output File",
            type: "text",
            subType: "",
            minWidth: 30
        },
        {
            key: "duration",
            label: "Duration",
            type: "text",
            subType: "",
            minWidth: 30
        },
        {
            key: "date&time",
            label: "Date & Time",
            type: "date&time",
            subType: "",
            minWidth: 30
        },
        {
            key: "play",
            label: "Play",
            type: "play",
            subType: "",
            minWidth: 30
        },
       
    ];

    const body = [
        {
            title: "New Recording",
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
        // {
        //     key: "delete",
        //     label: "Delete",
        //     icon: "arcticons:music-party",
        //     color: "red",
        // },
        {},
    ];
    return (
        <div className="container">
            <div className="top-section">

                <img src={logoPng} alt="Logo" className="logo" />

                <div className='headerContent'>

                    <p className='headerTitle'>Speech Transcription and Real-Time Processing</p>
                    <div className='centerRuler'></div>
                    <p className='headerSubTitle'>What would you like to do?</p>



                    <div className="slider-container">
                        <div className={`slider ${active}`} onClick={() => handleToggle(active === 'upload' ? 'record' : 'upload')}>
                            <div className="toggle" />
                        </div>
                        <div className="options">
                            <div
                                className={`option ${active === 'upload' ? 'active' : ''}`}
                                onClick={() => handleToggle('upload')}
                            >
                                <Icon icon="mdi:home" width="24" height="24" />
                                Upload
                            </div>
                            <div
                                className={`option ${active === 'record' ? 'active' : ''}`}
                                onClick={() => handleToggle('record')}
                            >
                                Record
                            </div>
                        </div>
                    </div>
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
