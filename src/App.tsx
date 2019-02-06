import React, { Component } from 'react';
import Gameboard from './components/Gameboard';
import ControlPanel from './components/ControlPanel';
import { EButtonControlType } from './enums/button-control-type.enum'
import { EGameState } from './enums/game-state.enum';
import styled from 'styled-components'
import './App.css';

interface AppState {
    gameState: EGameState,
}

class App extends Component<any, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            gameState: EGameState.STARTED,
        }
        this.handleCtrlBtnPress = this.handleCtrlBtnPress.bind(this);
    }

    handleCtrlBtnPress(controlType: EButtonControlType): void {
        // TODO: Change to decision based on current gameState
        console.log(controlType);

        const { gameState: currentGameState } = this.state;
        let nextGameState: EGameState = currentGameState;
        switch (controlType) {
            case (EButtonControlType.ACTUATOR):
                if (currentGameState === EGameState.STOPPED) {
                    nextGameState = EGameState.STARTED;
                } else if (currentGameState === EGameState.PAUSED) {
                    nextGameState = EGameState.STARTED;   
                }else if (currentGameState === EGameState.STARTED) {
                    nextGameState = EGameState.PAUSED;
                }
                break;
            case (EButtonControlType.ARRESTOR):
                nextGameState = EGameState.STOPPED;
                // TODO: Communicate with child component to blank out the grid
                break;
            case (EButtonControlType.RESTARTER):
                document.location.reload();
                break;
            default:
                break;
        }

        this.setState({
            ...this.state,
            gameState: nextGameState,
        });
    }

    render() {
        return (
            <React.Fragment>   
                <AppTitle>Game of Life, by Conway</AppTitle>
                <Gameboard gameState={this.state.gameState} />
                <ControlPanel onControlButtonPress={this.handleCtrlBtnPress}/>
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