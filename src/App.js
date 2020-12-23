import "./App.css";
// import Unity, { UnityContent } from "react-unity-webgl";
import Recorder from "./recorder";

// const unityContent = new UnityContent(
//   "Build/game.json",
//   "Build/UnityLoader.js"
// );

// function onClick() {
//   unityContent.send("Character", "moveCharacter", "True");
// }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Unity unityContent={unityContent} /> */}
        {/* <button onClick={onClick}>Move Character!</button> */}
        <Recorder />
      </header>
    </div>
  );
}

export default App;
