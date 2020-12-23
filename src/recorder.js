import React from "react";
import RecordButton from "./Record/RecordButton";

const timeInterval = 1000;

const audioConstraints = {
  channelCount: 1,
  sampleRate: 44100,
};

class Rec extends React.Component {
  state = {
    audios: [],
    dates: [],
    recording: false,
    index: null,
    firstSegmentDuration: null,
  };

  async componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ audio: audioConstraints })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.addEventListener("dataavailable", (event) => {
          const audios = this.state.audios.concat([event.data]);
          const dates = this.state.dates.concat([event.timecode]);
          this.setState({
            audios: audios,
            dates: dates,
          });
        });
      });
  }

  startRecording = () => {
    this.mediaRecorder.start(timeInterval);
    this.setState({ recording: true });
  };

  stopRecording = () => {
    this.mediaRecorder.stop();
    this.setState({
      recording: false,
      firstSegment: null,
      isFirstSegment: true,
    });
  };

  playAudio = () => {
    const segments = [this.state.audios[0]];
    let duration = 0;
    if (this.state.index !== 0) {
      segments.push(this.state.audios[this.state.index]);
      duration = timeInterval / 1000 - 0.05;
    }
    const audioBlob = new Blob(segments);
    const audioURL = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioURL);
    audio.playPromise = "anonymous";
    console.log(duration);
    audio.currentTime = duration;
    audio.play();
  };

  clickRecordingHandler = (recordingIndex) => {
    this.setState({ index: recordingIndex });
  };

  listAudio = () => {
    if (this.state.dates.length === 0) return null;
    return this.state.dates.map((date, index) => {
      return (
        <p onClick={() => this.clickRecordingHandler(index)} key={date}>
          {date}
        </p>
      );
    });
  };

  render() {
    return (
      <div>
        <RecordButton
          recording={this.state.recording}
          startRecording={this.startRecording}
          stopRecording={this.stopRecording}
        />
        <button onClick={this.playAudio} disabled={this.state.index === null}>
          Play
        </button>
        <div>{this.listAudio()}</div>
      </div>
    );
  }
}

export default Rec;
