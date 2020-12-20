import React from 'react';

class Rec extends React.Component{

    async componentDidMount() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(
                (stream) => {
                    this.mediaRecorder = new MediaRecorder(stream);
                    let count = 0;
            this.mediaRecorder.addEventListener("dataavailable", event => {
                this.audioChunks.push(event.data);
                console.log(count++);
            });
                }
        );
    }

    startRecording = () => {
        this.audioChunks = [];
        
        this.mediaRecorder.start();
        console.log("starting");

        
    }

    stopRecording = () => {
        this.mediaRecorder.stop();
        console.log("stopping");

        this.mediaRecorder.addEventListener("stop", () => {
            this.audioBlob = new Blob(this.audioChunks);
            this.audioUrl = URL.createObjectURL(this.audioBlob);
        });
    }

    playAudio = () => {
        const audio = new Audio(this.audioUrl);
        audio.play();
    }

    render() {
        return <div>
            <button onClick={this.startRecording}>Record</button>
            <button onClick={this.stopRecording}>Stop</button>
            <button onClick={this.playAudio}>Play</button>
        </div>
    };
}

export default Rec