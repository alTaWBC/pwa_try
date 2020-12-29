import classes from "./App.module.css";
import Unity, { UnityContent } from "react-unity-webgl";
import Recorder from "./recorder";
import React, { Component } from "react";

const unityContent = new UnityContent(
  "Build/game.json",
  "Build/UnityLoader.js"
);

class App extends Component {

  constructor(props) {
    super(props);
    let id = localStorage.getItem('id');
    if (id === null) {
      id = 'ola';
      localStorage.setItem('id', id);
    }
    this.state = {
      id: id
    }
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
          <Recorder />
          <p className={classes.p}>{this.state.id}</p>
        </header>
      </div>
    );
  }
}

export default App;
