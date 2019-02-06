import React, { Component, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface ButtonProps {
    onPress: Function
}

interface ButtonState {

}

class Button extends Component<ButtonProps, ButtonState> {

    constructor(props: ButtonProps) {
        super(props)
        this.state = {

        }
        this.onPress = this.onPress.bind(this);
    }

    onPress(): void {
        this.props.onPress(event);
    }

    render() {
        return (
            <ButtonContainer type="button" onClick={ this.onPress }>
                { this.props.children }
            </ButtonContainer>
        )
    }
}

export default Button;

const ButtonContainer = styled.button`
    background: transparent;
    border: 1px solid var(--primaryColour);
    font: 600 1rem var(--buttonFont);
    width: var(--buttonWidth);
    height: var(--buttonHeight);
    color: var(--primaryColour);
    text-transform: uppercase;

    &:active {
        transform: translate(1px, 1px);
        box-shadow: 1px 1px 3px 2px var(--backgroundColour);
    }
`