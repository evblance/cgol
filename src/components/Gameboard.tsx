import React, { Component } from 'react';
import styled from 'styled-components';

class Gameboard extends Component {

    constructor(props: any) {
        super(props);
        this.generateGrid = this.generateGrid.bind(this);
    }

    generateGrid(): void {

    }

    render() {
        return (
            <GameboardWrapper />
        )
    }
}

export default Gameboard;

const GameboardWrapper = styled.div`
    border: 1px solid var(--primaryColour);
    height: var(--boardHeight);
    margin: 0 auto;
    width: var(--boardWidth);
`