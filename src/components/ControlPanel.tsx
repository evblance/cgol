import React, { Component } from 'react';
import Button from './Button';
import { FaPlay, FaPause, FaStop, FaRedo } from 'react-icons/fa';
import { EButtonControlType } from '../enums/button-control-type.enum';
import styled from 'styled-components';

interface ControlPanelProps {
    onControlButtonPress: Function,
}

interface ControlPanelState {

}

class ControlPanel extends Component<ControlPanelProps, ControlPanelState> {

    constructor(props: ControlPanelProps) {
        super(props);
        this.state = {

        }
        this.handleButtonPress = this.handleButtonPress.bind(this);
    }

    handleButtonPress(controlType: EButtonControlType): void {
        this.props.onControlButtonPress(controlType);
    }

    render() {
        return (
            <ControlPanelWrapper>
                <Button controlType={EButtonControlType.ACTUATOR} onPress={this.handleButtonPress}>
                    <FaPlay /> <FaPause />
                </Button>
                <Button controlType={EButtonControlType.ARRESTOR} onPress={this.handleButtonPress}>
                    Clear
                </Button>
                <Button controlType={EButtonControlType.RESTARTER} onPress={this.handleButtonPress}>
                    <FaRedo />
                </Button>
            </ControlPanelWrapper>
        )
    }
}

export default ControlPanel;

const ControlPanelWrapper = styled.div`
    height: calc(var(--boardHeight)/2);
    margin: 10px auto;
    padding: 0 auto;
    text-align: center;
    width: calc(var(--boardWidth)/2);
`