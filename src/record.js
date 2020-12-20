import React from 'react';
const audioType = 'audio/*';

class Recorder extends React.Component{

    state = {
        recording: false,
        audios: []
    }

    async componentDidMount() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        this.audio.src = window.URL.createObjectURL(stream);
        this.audio.play();
        this.mediaRecorder = new this.mediaRecorder();
        this.chunks = [];
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };
    }

    startRecording(e) {
        e.preventDefault();
        this.chunks = [];
        this.mediaRecorder.start(10);
        this.setState({ recording: true });
    }

    stopRecording(e) {
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({recording: false});
    this.saveAudio();
    }
    
    saveAudio() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, {type: audioType});
    // generate video url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const audios = this.state.audios.concat([audioURL]);
    this.setState({audios});
    }
    
    deleteAudio(audioURL) {
    // filter out current videoURL from the list of saved videos
    const audios = this.state.audios.filter(a => a !== audioURL);
    this.setState({audios});
  }

render() {
    const {recording, audios} = this.state;

    return (
      <div className="camera">
        <audio


          style={{width: 400}}
          ref={a => {
            this.audio = a;
          }}>
         <p>Audio stream not available. </p>
        </audio>
        <div>
          {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
          {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
        </div>
        <div>
          <h3>Recorded audios:</h3>
          {audios.map((audioURL, i) => (
            <div key={`audio_${i}`}>
              <audio controls style={{width: 200}} src={audioURL}   />
              <div>
                <button onClick={() => this.deleteAudio(audioURL)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Recorder