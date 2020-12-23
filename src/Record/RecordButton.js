const RecordButton = (props) => {
  const button = props.recording ? (
    <button onClick={props.stopRecording}>Stop Recording</button>
  ) : (
    <button onClick={props.startRecording}>Start Recording</button>
  );
  return button;
};

export default RecordButton;
