import React, { Component } from 'react';
import Grid from './Grid';
import { EGameState } from '../enums/game-state.enum';
import styled from 'styled-components';

interface GameboardProps {
    gameState: EGameState,
    onGenerationUpdate: Function,
}

interface GameboardState {

}

class Gameboard extends Component<GameboardProps, GameboardState> {

    constructor(props: GameboardProps) {
        super(props);
        this.handleGenerationUpdate = this.handleGenerationUpdate.bind(this);
    }

    handleGenerationUpdate(generation: number): void {
        this.props.onGenerationUpdate(generation);
    }

    render() {
        return (
            <GameboardWrapper id="gameboard">
                <Grid
                    numCellsX={20}
                    numCellsY={10}
                    generationInterval={250}
                    shouldEvolve={this.props.gameState === EGameState.STARTED ? true : false}
                    deadGrid={this.props.gameState === EGameState.STOPPED ? true: false}
                    onGenerationUpdate={this.handleGenerationUpdate}
                />
            </GameboardWrapper>
        )
    }
}

export default Gameboard;

const GameboardWrapper = styled.div`
    box-sizing: content-box;
    border: 1px solid var(--primaryColour);
    height: var(--boardHeight);
    margin: 0 auto;
    padding: 0;
    width: var(--boardWidth);
`