import React, { Component } from 'react';
import Gameboard from './components/Gameboard';
import './App.css';
import styled from 'styled-components'

class App extends Component {
    render() {
        return (
            <React.Fragment>   
                <AppTitle>Game of Life, by Conway</AppTitle>
                <Gameboard />
            </React.Fragment>
        );
    }
}

export default App;

const AppTitle = styled.h1`
    color: var(--primaryColour);
    font: 3rem var(--headingFont);
    text-align: center;
`