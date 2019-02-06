import React, { Component } from 'react';
import Gameboard from './components/Gameboard';
import ControlPanel from './components/ControlPanel';
import './App.css';
import styled from 'styled-components'

enum EGameState {
    STARTED,
    PAUSED,
    STOPPED,
}

class App extends Component {

    componentDidMount() {
        this.startGame();
    }

    startGame() {
        // TODO
    }

    render() {
        return (
            <React.Fragment>   
                <AppTitle>Game of Life, by Conway</AppTitle>
                <Gameboard />
                <ControlPanel />
            </React.Fragment>
        );
    }
}

export default App;

const AppTitle = styled.h1`
    color: var(--primaryColour);
    font: 3rem var(--headingFont);
    text-align: center;
`