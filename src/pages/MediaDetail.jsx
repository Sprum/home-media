import {useNavigate, useParams} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {FileContext} from '../context/FileContext.jsx';
import useApi from '../api/api.js';

import {fileTypeMap} from '../util/util.js'

export default function MediaDetail() {
    const {fileId} = useParams();
    const {files} = useContext(FileContext);
    const api = useApi();
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileName = files[fileId].path;
    const fileSuffix = fileName.split(".").pop().toLowerCase();

    const handleNext = () => {
        if (Number(fileId) === files.length-1) {
            navigate(`/files/${0}`)
        } else {
            navigate(`/files/${Number(fileId) + 1}`)
        }
    }
    const handlePrevious = () => {
        if (Number(fileId) === 0) {
            navigate(`/files/${files.length-1}`)
        } else {
            navigate(`/files/${Number(fileId) - 1}`)
        }
    }
    const fetchFile = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/files/${fileName}`, {responseType: 'blob'}); // Handle binary data
            const fileURL = URL.createObjectURL(res.data); // Create a blob URL
            setFile(fileURL);
        } catch (e) {
            console.log(e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFile();
    }, [fileId]);

    return (
        <div className="flex flex-grow flex-row m-2 relative">
            {/* Left arrow for previous */}
            <div
                className="flex opacity-20 hover:opacity-100 cursor-pointer hover:bg-stone-200 h-[100%] items-center"
                onClick={handlePrevious}
            >
                <svg width="40" height="40" fill="currentColor">
                    <path d="M25 0 L5 20 L25 40"/>
                </svg>
            </div>

            {/* Media content */}
            <div className="flex justify-center flex-grow">
                {fileTypeMap[fileSuffix] === "video" && (
                    <video controls>
                        <source src={file} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                )}
                {fileTypeMap[fileSuffix] === "audio" && (
                    <audio controls>
                        <source src={file} type="audio/mp3"/>
                        Your browser does not support the audio element.
                    </audio>
                )}
                {fileTypeMap[fileSuffix] === "image" && (
                    <img src={file} alt="File content"/>
                )}
                {fileTypeMap[fileSuffix] === "text" && (
                    <iframe src={file} width="100%" height="600px"/>
                )}
                {fileTypeMap[fileSuffix] === "pdf" && (
                    <iframe src={file} width="100%" height="600px"/>
                )}
                {!fileTypeMap[fileSuffix] && <div>Unsupported file type: {fileSuffix}</div>}
            </div>

            <div
                className="flex opacity-20 hover:opacity-100 cursor-pointer hover:bg-stone-200 h-[100%] items-center"
                onClick={handleNext}
            >
                <svg width="40" height="40" fill="currentColor">
                    <path d="M15 0 L35 20 L15 40"/>
                </svg>
            </div>
        </div>
    );
}
