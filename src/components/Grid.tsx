import React, { Component } from 'react';
import Cell, { CellProps, CellPosition } from './Cell';
import styled from 'styled-components';
import uuidv4 from 'uuid';

interface GridProps {
    numCellsX: number,
    numCellsY: number,
    generationInterval: number,
    shouldEvolve: boolean,
    deadGrid: boolean,
}

interface GridState {
    generation: number,
    cellData: CellProps[],
}

class Grid extends Component<GridProps, GridState> {

    constructor(props: GridProps) {
        super(props);
        this.state = {
            generation: 0,
            cellData: new Array<CellProps>(),
        }
        this.renderCells = this.renderCells.bind(this);
        this.handleUserCellActivate = this.handleUserCellActivate.bind(this);
        this.handleUserCellKill = this.handleUserCellKill.bind(this);
    }

    timer: any = undefined;

    componentDidMount() {
        this.initCells();
        this.timer = setInterval(_ => this.tickGeneration(), this.props.generationInterval);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentWillReceiveProps(nextProps: GridProps) {
        if (nextProps.deadGrid) {
            this.clearCells();
            this.setState({
                ...this.state,
                generation: 0,
            });
        }
    }

    evolve(): void {
        this.state.cellData.forEach((cell) => {
            const liveNeighbourPositions: CellProps[] = this.getLiveNeighbours(cell);
            const numLiveNeighbours = liveNeighbourPositions.length;
            if (numLiveNeighbours === 3 && !cell.alive) {
                cell.alive = true;
            } else if (numLiveNeighbours < 2) {
                cell.alive = false;
            } else if (numLiveNeighbours > 3) {
                cell.alive = false;
            }
        })

    }

    getLiveNeighbours(cell: CellProps): CellProps[] {

        const mathematicalNeighbours: CellPosition[] = [
            { x: cell.position.x - 1, y: cell.position.y - 1 },
            { x: cell.position.x, y: cell.position.y - 1 },
            { x: cell.position.x + 1, y: cell.position.y - 1 },
            { x: cell.position.x - 1, y: cell.position.y },
            { x: cell.position.x + 1, y: cell.position.y },
            { x: cell.position.x - 1, y: cell.position.y + 1 },
            { x: cell.position.x, y: cell.position.y + 1 },
            { x: cell.position.x + 1, y: cell.position.y + 1 },
        ];

        let validNeighboursPositions: CellPosition[] = mathematicalNeighbours.filter(
            neighbour => {
                return (neighbour.x >= 0 && neighbour.x < this.props.numCellsX) &&
                    (neighbour.y >= 0 && neighbour.y < this.props.numCellsY)
            }
        );

        const liveNeighboursCells: CellProps[] = this.state.cellData.filter(
            foreignCell => {
                for (let position of validNeighboursPositions) {
                    if (foreignCell.position.x === position.x && foreignCell.position.y === position.y && foreignCell.alive) {
                        return true;
                    }
                }
                return false;
            }

        );
        return liveNeighboursCells;
    }

    tickGeneration(): any {
        if (this.props.shouldEvolve) {
            const nextGeneration = this.state.generation + 1;
            this.setState({
                ...this.state,
                generation: nextGeneration,
            });
            this.evolve();
        }
    }

    initCells(): void {
        const { numCellsX, numCellsY } = this.props;
        const cellWidth: number = 800.0 / numCellsX;
        const cellHeight: number = 400.0 / numCellsY;
        const cellData: Array<CellProps> = new Array<CellProps>();

        for (let y = 0; y < numCellsY; y++) {
            for (let x = 0; x < numCellsX; x++) {
                cellData.push({
                    sizeX: cellWidth,
                    sizeY: cellHeight,
                    position: { x: x % numCellsX, y: y % numCellsY },
                    alive: Math.random() > 0.7 ? true : false,
                    onUserCellActivate: this.handleUserCellActivate,
                    onUserCellKill: this.handleUserCellKill,
                });
            }
        }
        
        this.setState({
            ...this.state,
            cellData,
        });
    }

    renderCells(): any {
        return this.state.cellData
            .map((cell) => {
                return (
                    <Cell
                        key={uuidv4()}
                        position={cell.position}
                        sizeX={cell.sizeX}
                        sizeY={cell.sizeY}
                        alive={cell.alive}
                        onUserCellActivate={this.handleUserCellActivate}
                        onUserCellKill={this.handleUserCellKill}
                    />
                );
            }); 
    }

    clearCells(): void {
        const cellData: CellProps[] = this.state.cellData;
        cellData.forEach(cell => cell.alive = false);

        this.setState({
            ...this.state,
            cellData,
        });
    }

    getTargetCellCoords(event: any, cellWidth: number, cellHeight: number): CellPosition {
        const gameboard: HTMLElement | null = document.getElementById('gameboard');
        if (gameboard) {
            const gameboardClientRect: any = gameboard.getBoundingClientRect();
            const transformedX = event.clientX - gameboardClientRect.left;
            const transformedY = event.clientY - gameboardClientRect.top;
            return { x: Math.floor(transformedX / cellWidth), y: Math.floor(transformedY / cellHeight) };
        } else {
            return { x: NaN, y: NaN };
        }
    }

    handleUserCellActivate(event: any, cellWidth: number, cellHeight: number) {
        const targetCellCoords = this.getTargetCellCoords(event, cellWidth, cellHeight);
        const state = this.state;
        const { cellData } = state;
        cellData.forEach((cell) => {
            if (JSON.stringify(cell.position) === JSON.stringify(targetCellCoords)) {
                cell.alive = true;
                this.setState(state);
                return;
            }
        });
    }

    handleUserCellKill(event: any, cellWidth: number, cellHeight: number) {
        const targetCellCoords = this.getTargetCellCoords(event, cellWidth, cellHeight);
        const state = this.state;
        const { cellData } = state;
        cellData.forEach((cell) => {
            if (JSON.stringify(cell.position) === JSON.stringify(targetCellCoords)) {
                cell.alive = false;
                this.setState(state);
                return;
            }
        });
    }


    render() {
        return (
            <GridWrapper>
                {this.renderCells()}
            </GridWrapper>
        )
    }
}

export default Grid;

const GridWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
`