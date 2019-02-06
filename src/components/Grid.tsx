import React, { Component } from 'react';
import Cell, { CellProps, CellPosition } from './Cell';
import styled from 'styled-components';
import uuidv4 from 'uuid';

interface GridProps {
    numCellsX: number,
    numCellsY: number,
    generationInterval: number,
    shouldEvolve: boolean,
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
        console.log(nextProps);
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
            .map(_ => <Cell key={uuidv4()} position={_.position} sizeX={_.sizeX} sizeY={_.sizeY} alive={_.alive} />);
    }

    clearCells(): void {

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