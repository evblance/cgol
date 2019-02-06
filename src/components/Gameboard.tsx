import React, { Component } from 'react';
import Grid from '../components/Grid';
import styled from 'styled-components';

interface GameboardProps {

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
                <Grid numCellsX={20} numCellsY={10} generationInterval={50} />
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