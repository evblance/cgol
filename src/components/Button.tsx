import React, { Component } from 'react';
import styled from 'styled-components';
import { EButtonControlType } from '../enums/button-control-type.enum';

interface ButtonProps {
    onPress: Function,
    controlType: EButtonControlType,
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
        this.props.onPress(this.props.controlType);
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
    color: var(--primaryColour);
    height: var(--buttonHeight);
    font: 600 1rem var(--buttonFont);
    outline: none;
    text-transform: uppercase;
    width: var(--buttonWidth);
    
    &:active {
        box-shadow: 1px 1px 3px 2px var(--backgroundColour);
        opacity: 0.8;
        transform: translate(1px, 1px);
    }
`