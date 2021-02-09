import React from "react";
import RecordButton from "./Record/RecordButton";

const timeInterval = 900;

const audioConstraints = {
    channelCount: 1,
    sampleRate: 44100,
};

let count = 0;

class Rec extends React.Component {
    state = {
        recording: false,
        label: "",
    };

    async componentDidMount() {
        navigator.mediaDevices
            .getUserMedia({ audio: audioConstraints })
            .then((stream) => {
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.addEventListener("dataavailable", (event) => {
                    const formData = new FormData();
                    formData.append("file", event.data);
                    fetch("https://biovisualspeech.eu.pythonanywhere.com/postFileWebm/", {
                        // fetch("http://192.168.1.8:5000/playsound/", {
                        headers: {
                            name: event.timecode,
                            segment: count,
                            id: this.props.id,
                            label: this.state.label,
                            gameId: this.props.gameId,
                            "Content-Length": event.data.length,
                        },
                        method: "POST",
                        body: formData,
                    }).then((response) => {
                        if (!response.ok) return;
                        response.text().then((message) => this.props.sendMessage(message));
                    });
                });
            })
            .catch(() => (this.mediaRecorder = undefined));
        this.props.unity.on("GameOver", () => {
            this.stopRecording();
            this.setState({
                label: "",
            });
        });
        this.props.unity.on("GameStart", (message) => {
            if (message === "Menu") {
                this.stopRecording();
                this.setState({ label: "" });
            } else {
                console.log(message);
                const label = message.split("_")[1];
                this.setState({ label: label });
                this.props.newGame();
                this.stopRecording();
            }
        });
    }

    microphonePermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.addEventListener("dataavailable", (event) => {
                const formData = new FormData();
                formData.append("file", event.data);
                fetch("https://biovisualspeech.eu.pythonanywhere.com/postFileWebm/", {
                    // fetch("http://192.168.1.8:5000/playsound/", {
                    headers: {
                        name: event.timecode,
                        segment: count,
                        id: this.props.id,
                        label: this.state.label,
                        gameId: this.props.gameId,
                        "Content-Length": event.data.length,
                    },
                    method: "POST",
                    body: formData,
                }).then((response) => {
                    if (!response.ok) return;
                    response.text().then((message) => this.props.sendMessage(message));
                });
            });
        } catch {
            this.mediaRecorder = undefined;
        }
    };

    startRecording = () => {
        count = 0;
        this.mediaRecorder.start(timeInterval);
        this.setState({ recording: true });
    };

    stopRecording = async () => {
        if (this.mediaRecorder === undefined) await this.microphonePermission();
        if (this.mediaRecorder === undefined || this.mediaRecorder.state !== "recording") return;
        this.mediaRecorder.stop();
        this.setState({
            recording: false,
        });
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
