import React, { Component } from 'react';
import Gameboard from './components/Gameboard';
import ControlPanel from './components/ControlPanel';
import Display from './components/Display';
import { EButtonControlType } from './enums/button-control-type.enum'
import { EGameState } from './enums/game-state.enum';
import styled from 'styled-components'
import './App.css';

interface AppState {
    gameState: EGameState,
    generation: number,
}

class App extends Component<any, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            gameState: EGameState.STARTED,
            generation: 0,
        }
        this.handleCtrlBtnPress = this.handleCtrlBtnPress.bind(this);
        this.handleGenerationUpdate = this.handleGenerationUpdate.bind(this);
    }

    handleCtrlBtnPress(controlType: EButtonControlType): void {

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

    handleGenerationUpdate(generation: number): void {
        this.setState({
            ...this.state,
            generation
        });
    }

    render() {
        return (
            <React.Fragment>   
                <AppTitle>Game of Life, by Conway</AppTitle>
                <Gameboard gameState={this.state.gameState} onGenerationUpdate={this.handleGenerationUpdate} />
                <Display gameState={this.state.gameState} generation={this.state.generation} />
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