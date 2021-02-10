import classes from "./App.module.css";
import Unity, { UnityContent } from "react-unity-webgl";
import Recorder from "./recorder";
import React, { Component } from "react";
import { v4 } from "uuid";

const unityContent = new UnityContent("Build/webgl1/game.json", "Build/webgl1/UnityLoader.js");
// const unityContent = new UnityContent("./Build/webgl1/game.json", "./Build/webgl1/UnityLoader.js");

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

    increaseId = () => {
        this.setState({ gameId: this.state.gameId + 1 });
    };

    doubleClick = () => {
        const id = this.generateUUID();
        this.changeId(id);
    };

    mouseDown = () => {
        const timeout = setTimeout((_) => this.changeId(), 1000);
        this.setState({
            timeout: timeout,
        });
    };

    mouseUp = () => {
        clearTimeout(this.state.timeout);
    };

    changeId = (id) => {
        console.log(id);
        if (!id) {
            id = prompt("Qual é o id?");
            if (!id || id.length !== 6) {
                alert("Id Inválido! Tente novamente");
                return;
            }
        }
        localStorage.setItem("id", id);
        this.setState({
            id: id,
        });
    };

    render() {
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
                        <p className={classes.p}>
                            <button
                                className={classes.button}
                                onDoubleClick={this.doubleClick}
                                onMouseDown={this.mouseDown}
                                onMouseUp={this.mouseUp}
                            >
                                {this.state.id}
                            </button>
                        </p>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
