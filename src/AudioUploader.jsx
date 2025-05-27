import { useState } from "react";
import axios from 'axios';

const AudioUploader = () => {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0] ? e.target.files[0].name : "");
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL, formData ,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setTranscription(response.data);
        } catch(error) {
            console.error("Error transcribing audio", error);

        }

    }


    return(
        <div className="container">
            <h1>Auido to Text Transcriber</h1>
            <div className="file-input">
                <input type="file" accept="audio/*" onChange={handleFileChange} />
                {fileName && (
                    <span className="file-name">{fileName}</span>
                )}
            </div>
            <button className="upload-button" onClick={handleUpload}>Upload and Transcribe</button>
            <div className="transcription-result large-transcription">
                <h2>Transcription Result</h2>
                <p>{transcription}</p>
            </div>
        </div>
    );
}

export default AudioUploader;