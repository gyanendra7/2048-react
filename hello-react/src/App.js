import React, { Component } from 'react';
import './App.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquare(i, j) {
    return (
      <Square
        value={this.props.squares[i][j]}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
          {this.renderSquare(0, 3)}
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(1, 3)}
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
          {this.renderSquare(2, 3)}
          {this.renderSquare(3, 0)}
          {this.renderSquare(3, 1)}
          {this.renderSquare(3, 2)}
          {this.renderSquare(3, 3)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 2]],
      isGameOver: false,
      changeOccured: false,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.shiftOneD = this.shiftOneD.bind(this);
    this.shiftLeft = this.shiftLeft.bind(this);
  }

  shiftOneD(arr) {
    let lastNonSetIndex = 3;
    let index = 2;
    let flag = false;
    while(index >= 0) {
      if (arr[lastNonSetIndex] === 0) {
        arr[lastNonSetIndex] = arr[index];
        arr[index] = 0;
        index --;
        flag = true;
      } else if (arr[index] === 0) {
        index--;
      }
      else if (arr[lastNonSetIndex] === arr[index]) {
        arr[lastNonSetIndex] = 2 * arr[index];
        arr[index] = 0;
        flag = true;
        lastNonSetIndex--;
        index--;
      }
      else {
        lastNonSetIndex--;
        if(lastNonSetIndex !== index) {
          arr[lastNonSetIndex] = arr[index];
          arr[index] = 0;
          flag = true;
        }
        index--;
      }
    }
    this.state.changeOccured = flag;
    console.log({ arr });
    return arr;
  }

  shiftRight(squares) {
    console.log('shiftLeft');
    console.log({ squares });
    let changeOccuredFlag = false;
    this.state.changeOccured = false;
    for (var i = 0; i < squares.length ; i++) {
      let oneDArr = [squares[i][0], squares[i][1], squares[i][2], squares[i][3]];
      oneDArr = this.shiftOneD(oneDArr);
      changeOccuredFlag = this.state.changeOccured || changeOccuredFlag;
      console.log({ oneDArr });
      squares[i][0] = oneDArr[0];
      squares[i][1] = oneDArr[1];
      squares[i][2] = oneDArr[2];
      squares[i][3] = oneDArr[3]; 
    }
    this.state.changeOccured = changeOccuredFlag; 
    return squares;
  }

  shiftLeft(squares) {
    console.log({ squares });
    let changeOccuredFlag = false;
    this.state.changeOccured = false;
    for (let i = 0; i < squares.length ; i++) {
      let oneDArr = [squares[i][3], squares[i][2], squares[i][1], squares[i][0]];
      oneDArr = this.shiftOneD(oneDArr);
      changeOccuredFlag = this.state.changeOccured || changeOccuredFlag;
      squares[i][0] = oneDArr[3];
      squares[i][1] = oneDArr[2];
      squares[i][2] = oneDArr[1];
      squares[i][3] = oneDArr[0]; 
    }
    this.state.changeOccured = changeOccuredFlag; 
    return squares;
  }

  shiftDown(squares) {
    console.log('shiftUp');
    let changeOccuredFlag = false;
    this.state.changeOccured = false;
    for (let i = 0; i < squares.length ; i++) {
      let oneDArr = [squares[0][i], squares[1][i], squares[2][i], squares[3][i]];
      oneDArr = this.shiftOneD(oneDArr);
      changeOccuredFlag = this.state.changeOccured || changeOccuredFlag;
      squares[0][i] = oneDArr[0];
      squares[1][i] = oneDArr[1];
      squares[2][i] = oneDArr[2];
      squares[3][i] = oneDArr[3]; 
    }
    this.state.changeOccured = changeOccuredFlag; 
    return squares;
  }

  shiftUp(squares) {
    let changeOccuredFlag = false;
    this.state.changeOccured = false;
    for (let i = 0; i < squares.length ; i++) {
      let oneDArr = [squares[3][i], squares[2][i], squares[1][i], squares[0][i]];
      oneDArr = this.shiftOneD(oneDArr);
      changeOccuredFlag = this.state.changeOccured ||changeOccuredFlag;
      squares[0][i] = oneDArr[3];
      squares[1][i] = oneDArr[2];
      squares[2][i] = oneDArr[1];
      squares[3][i] = oneDArr[0]; 
    }
    this.state.changeOccured = changeOccuredFlag; 
    return squares;
  }

  handleKeyDown(key) {
    /* code for shifting array */
    let shiftArr = this.state.squares;
    if (this.state.isGameOver) return;
    console.log({ key: key.keyCode });
    switch (key.keyCode) {
      case 37:
        shiftArr = this.shiftLeft(this.state.squares);
          break;
      case 39:
        shiftArr = this.shiftRight(this.state.squares);
          break;
      case 38:
        shiftArr = this.shiftUp(this.state.squares);
          break;
      case 40:
        shiftArr = this.shiftDown(this.state.squares);
          break;
      default:
        return;
    }

    if (this.state.changeOccured === false) {
      this.state.changeOccured = true;
      return ;
    }
    console.log({ changeOccured: this.state.changeOccured });
    if (checkGameOver(shiftArr)) {
      console.log({ shiftArr });
      this.state.isGameOver = true;
      return;
    }

    const popCandidates = [];
    for (let i = 0 ; i < shiftArr.length ; i++) {
      for (let j = 0 ; j< shiftArr.length ; j++) {
        if(shiftArr[i][j] === 0) {
          popCandidates.push([i, j]);
        }
      }
    }
    const randomCandidate = Math.floor(Math.random() * popCandidates.length);
    console.log({ popCandidates , randomCandidate });
    shiftArr[popCandidates[randomCandidate][0]][popCandidates[randomCandidate][1]] = 2;
    this.setState({
      squares: shiftArr,
      isGameOver: false,
    });
  }

  render() {
    const squares = this.state.squares;
    const isGameOver = checkGameOver(squares);

    const status = isGameOver ? 'Game Over' : 'Play!';
    console.log({ status });
    return (
      <div 
        className="game"
        onKeyDown={this.handleKeyDown}
        tabIndex="0" 
      >
        <div className="game-board">
          <Board
            squares={squares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

function checkSafeMove(i, j) {
  if (i < 0 || i > 3 || j < 0 || j > 3) return false;
  return true;
}

function checkGameOver(squares) {
  let ifZeroPresent = false;
  let ifPossibleMatch = false;
  for (let i = 0; i < squares.length; i++) {
    for(let j = 0; j < squares.length; j++) {
      if(squares[i][j] === 0) ifZeroPresent = true;
      if (checkSafeMove(i + 1, j)) {
        if (squares[i][j] === squares[i + 1][j]) ifPossibleMatch = true;
      } 
      if (checkSafeMove(i, j + 1)) {
        if (squares[i][j] === squares[i][j + 1]) ifPossibleMatch = true;
      } 
      if (checkSafeMove(i, j - 1)) {
        if (squares[i][j] === squares[i][j - 1]) ifPossibleMatch = true;
      } 
      if (checkSafeMove(i - 1, j)) {
        if (squares[i][j] === squares[i - 1][j]) ifPossibleMatch = true;
      }
    }
  }
  return (ifZeroPresent || ifPossibleMatch) ? false : true;
}


export default Game;