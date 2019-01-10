import React, { Component } from 'react';
// import logo from './logo.svg';
import './tic-tac-toe.css';

import axios from 'axios'

const requestURL= '';

// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square"
//                     // onClick={() => this.setState({value: 'X'})}>
//                     onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

//function components are a simpler way to write components that only contain a render method and don’t have their own state.
function Square(props) {
    return (
        <button className={"square"} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }



    renderSquare(i) {
        // return <Square />;
        // return <Square value={i} />;
        return (
            <Square
                // value={this.state.squares[i]}
                value={this.props.squares[i]}
                // onClick={()=>this.handleClick(i)}
                onClick={()=>this.props.onClick(i)}
            />
        );
    }

    render() {
        // const status = 'Next player: X';
        // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner: ' + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,

            username: '',
        };
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickLoad = this.handleClickLoad.bind(this);
    }

    handleClick(i) {
        // const history = this.state.history;
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // squares[i] = 'X';
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    handleClickSave () {
        axios.post(requestURL, {
            state: JSON.stringify(this.state)
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    handleClickLoad () {
         axios.get(requestURL)
        .then(response => this.setState({
            history: JSON.parse(response.data[0].state).history,
            stepNumber: JSON.parse(response.data[0].state).stepNumber,
            xIsNext: (JSON.parse(response.data[0].state).stepNumber % 2) === 0
        }));


    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        // const current = history[history.length - 1];
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>

                <div className="game-info">
                    <button className='button' onClick={this.handleClickSave}>Save</button>
                    {/*<p>{this.state.username}</p>*/}
                </div>

                <div className="game-info">
                    <button className='button' onClick={this.handleClickLoad}>Load</button>
                    {/*<p>{this.state.username}</p>*/}
                </div>
            </div>

        );
    }
}

// ========================================

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}




export default Game;
