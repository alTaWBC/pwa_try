import "./App.css";
import Unity, { UnityContent } from "react-unity-webgl";
import Recorder from "./recorder";

const unityContent = new UnityContent(
  "Build/game.json",
  "Build/UnityLoader.js"
);

function onClick() {
  unityContent.send("Character", "moveCharacter", "True");
}

function App() {
  const height = window.screen.availHeight * 0.8;
  const width = (window.screen.width / window.screen.availHeight) * height;
  const style = {
    width: width + "px",
    height: height + "px",
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={style}>
          <Unity unityContent={unityContent} />
        </div>
        <button onClick={onClick}>Move Character!</button>
        <Recorder />
      </header>
    </div>
  );
}

export default App;
