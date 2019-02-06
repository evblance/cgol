import React, { Component } from 'react';
import Grid from './Grid';
import { EGameState } from '../enums/game-state.enum';
import styled from 'styled-components';

interface GameboardProps {
    gameState: EGameState,
}

interface GameboardState {

}

class Gameboard extends Component<GameboardProps, GameboardState> {

    constructor(props: GameboardProps) {
        super(props);
    }

    render() {
        return (
            <GameboardWrapper>
                <Grid
                    numCellsX={20}
                    numCellsY={10}
                    generationInterval={50}
                    shouldEvolve={this.props.gameState === EGameState.STARTED ? true : false}
                    deadGrid={this.props.gameState === EGameState.STOPPED ? true: false}
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