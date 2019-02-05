import React, { Component } from 'react';
import styled from 'styled-components';

interface CellComponentProps {
    sizeX: number,
    sizeY: number
}

interface CellComponentState {
    alive: boolean
}

class Cell extends Component<CellComponentProps, CellComponentState> {

    constructor(props: CellComponentProps) {
        super(props);
        this.state = {
            alive: false
        }
    }

    activate(): void {
        this.setState({
            ...this.state,
            alive: true
        })
    }

    die(): void {
        this.setState({
            ...this.state,
            alive: false
        });
    }

    render() {
        return (
            <CellWrapper style={{ width: this.props.sizeX, height: this.props.sizeY }}/>
        )
    }
}

export default Cell;

const CellWrapper = styled.div`
    border: 1px solid var(--secondaryColour);
    height: var(--boardHeight);
    padding: 0 auto;
    margin: 0 auto;
    width: var(--boardWidth);
`