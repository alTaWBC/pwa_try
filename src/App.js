import classes from "./App.module.css";
import Unity, { UnityContent } from "react-unity-webgl";
import Recorder from "./recorder";
import React, { Component } from "react";
import { v4 } from "uuid";

const unityContent = new UnityContent("Build/webgl1/game.json", "Build/webgl1/UnityLoader.js");

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
            gameId: 0,
        };
    }

    avaliateProduction = (message) => {
        const response = JSON.parse(message);
        if (parseInt(response["gameId"]) !== this.state.gameId) return;
        if (response["response"].toLowerCase() === "true") {
            console.log("characterMoves");
            unityContent.send("Character", "moveCharacter", "True");
        }
    };

    onClick = () => {
        unityContent.send("Character", "moveCharacter", "True");
    };

    increaseId = () => {
        this.setState({ gameId: this.state.gameId + 1 });
    };

    render() {
        window.screen.orientation.lock("landscape");
        return (
            <div className={classes.App}>
                <header className={classes.header}>
                    <div className={classes.Unity}>
                        <Unity unityContent={unityContent} />
                    </div>
                    <div className={classes.centeredDiv}>
                        <Recorder
                            sendMessage={this.avaliateProduction}
                            id={this.state.id}
                            unity={unityContent}
                            gameId={this.state.gameId}
                            newGame={this.increaseId}
                        />
                        <p className={classes.p}>{this.state.id}</p>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
