import React, { Component } from 'react';
import { EGameState } from '../enums/game-state.enum';
import styled from 'styled-components';

interface DisplayProps {
    generation: number,
    gameState: EGameState,
}

interface DisplayState {

}

class Display extends Component<DisplayProps, DisplayState> {

    constructor(props: DisplayProps) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <DisplayWrapper>
                <DisplayCell>
                    Generation:&nbsp;
                    <span>{this.props.generation}</span>
                </DisplayCell>
                <DisplayCell>
                    State:&nbsp;
                    <span>{this.props.gameState}
                    </span>
                </DisplayCell>
            </DisplayWrapper>
        )
    }
}

export default Display;

const DisplayWrapper = styled.div`
    color: var(--primaryColour);
    display: flex;
    font: 1.1rem/var(--displayHeight) var(--displayFont);
    justify-content: space-between;
    margin: 10px auto;
    min-height: var(--displayHeight);
    padding: 0.5rem;
    text-align: center;
    width: var(--displayWidth);
`

const DisplayCell = styled.div`
    span {
        text-transform: uppercase;
    }
`