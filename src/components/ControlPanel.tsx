import React, { Component } from 'react';
import Button from '../components/Button';
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

    handleButtonPress(event: Event): void {
        console.log(event);
    }

    render() {
        return (
            <ControlPanelWrapper>
                <Button onPress={this.handleButtonPress}>
                    Start
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