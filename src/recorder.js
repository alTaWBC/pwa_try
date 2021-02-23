import React from "react";
import RecordButton from "./Record/RecordButton";

// Time between calls to {this.onDataAvailable}
const timeInterval = 1000;

// Segment number
let count = 0;

const SERVER_URL = "https://biovisualspeech.eu.pythonanywhere.com/postFileWebm/";

// Used for debug purposes
// eslint-disable-next-line no-unused-vars
const DEBUG_URL = "http://192.168.1.8:5000/playsound/";

class Rec extends React.Component {
    state = {
        recording: false,
        label: "",
    };

    async componentDidMount() {
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
            // this.changeLabel uses label === '' in undefined scenarios
            this.changeLabel(message.split("_")[1]);
            const newGame = message !== "Menu";
            if (newGame) this.props.newGame();
        });
    };

    changeLabel = (label = "") => {
        this.setState({ label });
    };

    prepareMicrophone = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
        } catch {
            this.mediaRecorder = undefined;
        }
    };

    onDataAvailable = async ({ data, timecode }) => {
        const response = await this.sendDataToServer(data, timecode);
        if (!response.ok) return;
        response.text().then((message) => this.props.sendMessage(message));
    };

    sendDataToServer = async (data, timecode) => {
        const formData = new FormData();
        formData.append("file", data);
        return fetch(SERVER_URL, {
            headers: {
                name: timecode,
                segment: count,
                id: this.props.id,
                label: this.state.label,
                gameId: this.props.gameId,
                "Content-Length": data.length,
            },
            method: "POST",
            body: formData,
        });
    };

    startRecording = async () => {
        const MicrophonePermissionsWereNotGiven = this.mediaRecorder === undefined;
        if (MicrophonePermissionsWereNotGiven) return;
        count = 0;
        this.mediaRecorder.start(timeInterval);
        this.setState({ recording: true });
    };

    stopRecording = () => {
        const MicrophonePermissionsWereNotGiven = this.mediaRecorder === undefined;
        const MicrophoneIsNotRecording = !this.state.recording;
        if (MicrophonePermissionsWereNotGiven || MicrophoneIsNotRecording) return;
        this.mediaRecorder.stop();
        this.setState({ recording: false });
    };

    render() {
        return this.state.label === "" ? null : (
            <RecordButton
                recording={this.state.recording}
                startRecording={this.startRecording}
                stopRecording={this.stopRecording}
            />
        );
    }
}

export default Rec;
