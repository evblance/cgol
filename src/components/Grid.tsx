import React, { Component } from 'react';
import styled from 'styled-components';

class Grid extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <GridWrapper>
                { this.props.children }
            </GridWrapper>
        )
    }
}

export default Grid;

const GridWrapper = styled.div`
`