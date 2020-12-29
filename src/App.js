import classes from "./App.module.css";
import Unity, { UnityContent } from "react-unity-webgl";
import Recorder from "./recorder";
import React, { Component } from "react";
import { v4 } from "uuid";

const unityContent = new UnityContent(
  "Build/game.json",
  "Build/UnityLoader.js"
);

class App extends Component {
  generateUUID = () => {
    const startIndex = Math.round(Math.random() * 10);
    const id = v4().substring(startIndex, startIndex + 6);
    return id;
  };

  constructor(props) {
    super(props);
    let id = localStorage.getItem("id");
    if (id === null) {
      id = this.generateUUID();
      localStorage.setItem("id", id);
    }
    this.state = {
      id: id,
    };
  }

  onClick = () => {
    unityContent.send("Character", "moveCharacter", "True");
  };

  render() {
    return (
      <div className={classes.App}>
        <header className={classes.header}>
          <div className={classes.Unity}>
            <Unity unityContent={unityContent} />
          </div>
          <button onClick={this.onClick}>Move Character!</button>
          <div className={classes.centeredDiv}>
            <Recorder />
            <p className={classes.p}>{this.state.id}</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
