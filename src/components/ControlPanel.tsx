import React, { Component } from 'react';
import Button from './Button';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import { EButtonControlType } from '../enums/button-control-type.enum';
import styled from 'styled-components';


interface ControlPanelProps {

}

interface ControlPanelState {

}

class ControlPanel extends Component<ControlPanelProps, ControlPanelState> {

    constructor(props: ControlPanelProps) {
        super(props);
        this.state = {

        }
    }

    handleButtonPress(controlType: EButtonControlType): void {
        console.log(controlType);
    }

    render() {
        return (
            <ControlPanelWrapper>
                <Button controlType={EButtonControlType.ACTUATOR} onPress={this.handleButtonPress}>
                    <FaPlay /> <FaPause />
                </Button>
                <Button controlType={EButtonControlType.ARRESTOR} onPress={this.handleButtonPress}>
                    <FaStop />
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