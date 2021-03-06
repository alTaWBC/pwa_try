import React, { Component } from "react";
import RecordButton from "./Record/RecordButton";

// Time between calls to {this.onDataAvailable}
const timeInterval = 3000;

// Segment number

const SERVER_URL = "https://biovisualspeech.eu.pythonanywhere.com";

// Used for debug purposes
// eslint-disable-next-line no-unused-vars
const DEBUG_URL = "http://192.168.1.7:5050";
const date = new Date();

let count = 0;

class Rec extends Component {
    state = {
        recording: false,
        label: "l",
        chunks: [],
        audios: [],
        urls: [],
    };

    componentDidMount() {
        this.prepareMicrophone();
        this.prepareUnityCommunication();
    }

    prepareUnityCommunication = () => {
        this.props.unity.on("GameOver", () => {
            this.stopRecording();
            this.changeLabel();
        });
        this.props.unity.on("GameStart", (message) => {
            this.stopRecording();

            // Message can be 'Game_{Label}' or 'Menu'
            // In the former Label will be {Label}
            // In the latter Label will be {undefined}
            // this.changeLabel({label}) uses label === '' in undefined scenarios
            this.changeLabel(message.split("_")[1]);

            const newGame = message !== "Menu";
            if (newGame) this.props.newGame();
        });
    };

    changeLabel = (label = "") => {
        this.setState({ label });
    };

    prepareMicrophone = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        this.mediaRecorder = new MediaRecorder(stream);
        // const isApple =
        //     window.navigator.platform.includes("iPhone") ||
        //     window.navigator.platform.includes("Mac") ||
        //     window.navigator.platform.includes("iPad");
        this.mediaRecorder.addEventListener(
            "dataavailable",
            /*isApple ?*/ this.onDataAvailableSafari //: this.onDataAvailable
        );
        /*isApple &&*/ this.mediaRecorder.addEventListener("stop", this.onStop);
    };

    onDataAvailable = async ({ data, timecode }, url = undefined) => {
        alert(data.size);
        const response = await this.sendDataToServer(data, timecode, url);
        if (!response.ok) return;
        response.text().then((message) => this.props.sendMessage(message));
    };

    // Safari handles recording sound in a different light
    // So we need special care
    onDataAvailableSafari = ({ data /*, timecode = date.getTime()*/ }) => {
        // const blob = new Blob([data], { type: "audio/mp4" });
        // const url = URL.createObjectURL(blob);
        // const audio = new Audio(url);
        // audio.play();
        // this.onDataAvailable({ data: blob, timecode: timecode }, "postFileMp4/");
        const chunks = [...this.state.chunks, data];
        this.setState({ chunks });
    };

    onStop = ({ data, timecode = date.getTime() }) => {
        let chunks = [...this.state.chunks, data];
        const blob = new Blob(chunks, { type: "audio/wav" });
        // const fileReader = new FileReader();
        // fileReader.onload = () => {
        //     console.log(fileReader.result);
        //     console.log(fileReader.result.byteLength);
        //     this.sendDataToServer(fileReader.result, timecode, "postFileMp4/");
        // };
        // fileReader.readAsArrayBuffer(blob);

        this.sendDataToServer(blob, timecode, "postFileMp4/");
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        const audios = [...this.state.audios, audio];
        chunks = [];
        const urls = [...this.state.urls, url];
        this.setState({ chunks, audios, urls });
    };

    sendDataToServer = async (data, timecode, location = "postFileWebm/") => {
        const formData = new FormData();
        formData.append("file", data);
        console.log(data.type);
        alert(data.type);
        const length = data.length || data.size;
        return fetch(`${SERVER_URL}/${location}`, {
            headers: {
                name: `${this.props.id}${timecode}`,
                segment: count,
                id: this.props.id,
                label: this.state.label,
                gameId: this.props.gameId,
                "Content-Range": `bytes 0-${length}/${length}`,
                "Accept-Ranges": "bytes",
                "Content-Transfer-Encoding": "binary",
                "Content-Length": length,
            },
            method: "POST",
            body: formData,
        });
    };

    startRecording = async () => {
        const MicrophonePermissionsWereNotGiven = this.mediaRecorder === undefined;
        if (MicrophonePermissionsWereNotGiven) return;

        const MicrophoneIsNotInitialized = this.mediaRecorder === null;
        if (MicrophoneIsNotInitialized) return;

        this.mediaRecorder.start(timeInterval);
        count = 0;
        this.setState({ recording: true });
    };

    stopRecording = () => {
        const MicrophonePermissionsWereNotGiven = this.mediaRecorder === undefined;
        const MicrophoneIsNotRecording = !this.state.recording;
        if (MicrophonePermissionsWereNotGiven || MicrophoneIsNotRecording) return;

        const MicrophoneIsNotInitialized = this.mediaRecorder === null;
        if (MicrophoneIsNotInitialized) return;

        this.mediaRecorder.stop();
        this.setState({ recording: false });
    };

    playAudio = (index) => {
        this.state.audios[index].play();
    };

    createAudios = (audios) => {
        return audios.map((audio, index) => {
            return (
                <div key={index}>
                    <a href={this.state.urls[index]} download={`${index}.wav`}>
                        {index}
                    </a>
                </div>
            );
        });
    };

    render() {
        try {
            console.log(this.mediaRecorder?.state);
            const audios = this.createAudios(this.state.audios);
            return this.state.label === "" ? null : (
                <div>
                    <RecordButton
                        recording={this.state.recording}
                        startRecording={this.startRecording}
                        stopRecording={this.stopRecording}
                    />
                    {audios}
                </div>
            );
        } catch (e) {
            return <div>{e.message}</div>;
        }
    }
}

export default Rec;
