import classes from "./RecordButton.module.css";

const RecordButton = (props) => {
  let buttonClasses = [classes.button];
  if (props.recording) buttonClasses.push(classes.Red);
  return (
    <button
      onClick={props.recording ? props.stopRecording : props.startRecording}
      className={buttonClasses.join(" ")}
    >
      <i className="material-icons">{props.recording ? "mic_off" : "mic"}</i>
    </button>
  );
};

export default RecordButton;
