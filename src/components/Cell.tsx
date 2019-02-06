import React, { Component } from 'react';
import styled from 'styled-components';

export interface CellProps {
    sizeX: number,
    sizeY: number,
    position: CellPosition,
    alive: boolean,
}

export interface CellPosition {
    x: number,
    y: number,
}

class Cell extends Component<CellProps, any> {

    constructor(props: CellProps) {
        super(props);
        this.activate = this.activate.bind(this);
        this.kill = this.kill.bind(this);
    }

    activate(event: any): void {
        event.preventDefault();
        // TODO: Announce cell activation to parent grid
    }

    kill(event: any): void {
        event.preventDefault();
        // TODO: Announce cell death to parent grid
    }

    render() {
        return (
            <CellWrapper
                className="cell"
                style={
                    {
                        width: this.props.sizeX,
                        height: this.props.sizeY,
                        background: this.props.alive ? `var(--secondaryColour)` : `transparent`,
                    }
                }
                onClick={this.activate}
                onContextMenu={this.kill}
            />
        )
    }
}

export default Cell;

const CellWrapper = styled.div`
    background: transparent;
    border: 1px solid var(--primaryColour);
    height: var(--boardHeight);
    opacity: 0.5;
    transition: opacity 0.1s ease;

    &:hover {
        background: var(--secondaryColour) !important;
    }

    &:active {
        opacity: 1;
    }
`