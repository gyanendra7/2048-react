import React, { Component } from 'react';
import Swipe from 'react-easy-swipe';
import './App.css';
import { Jumbotron, Button, Container, Row, Col, Card } from 'reactstrap';


function getColor(value) {
  let color = 'grey';
  switch(value) {
    case 2:
      color = 'grey';
      break;
    case 4:
      color = '#20b2aa';
      break;
    case 8:
      color = '#db7093';
      break;
    case 16:
      color = '#f08080';
      break;  
    case 32:
      color = '#8fbc8f';
      break;
    case 64:
      color = 'darkslategray';
      break;
    case 128:
      color = '#bc8f8f';
      break;
    case 256:
      color = '#4682b4';
      break; 
    case 512:
      color = '#f5deb3';
      break;  
    case 1024:
      color = '#98fb98';
      break;
    case 2048:
      color = '#cd853f';
      break;
    case 4096:
      color = '#40e0d0';
      break;
    case 8192:
      color = '#f08080';
      break;
    case 16384:
      color = 'grey';
      break;  
    default:
      color = '#eee4da';
  }
  return color;
}

function Square(props) {
  return (
    <button className="square" style={{ backgroundColor: `${getColor(props.value)}`}} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquare(i, j) {
    let value = this.props.squares[i][j];
    if (value === 0) value = null;
    return (
      <Square value={value} />
    );
  }

  render() {
    return (
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
      score: 0,
      // time: 0,
      start: Date.now(),
      bestScore: 0,
      gameOn: false,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.shiftOneD = this.shiftOneD.bind(this);
    this.shiftLeft = this.shiftLeft.bind(this);
    // this.startTimer = this.startTimer.bind(this);
    // this.resetTimer = this.resetTimer.bind(this);
    // this.getTime = this.getTime.bind(this);
  }

  // startTimer() {
  //   this.setState({
  //     time: this.state.time,
  //     start: Date.now()
  //   })
  //   this.timer = setInterval(() => this.setState({
  //     time: Date.now() - this.state.start
  //   }), 1)
  //   console.log("start")
  // }

  // resetTimer() {
  //   this.setState({ time: 0, start: Date.now() })
  //   this.startTimer()
  // }

  // stopTimer() {
  //   this.setState({ time: 0, start: Date.now() })
  // }

  handleRestart() {
    // this.resetTimer()
    this.setState(() => ({
      squares: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 2]],
      isGameOver: false,
      changeOccured: false,
      score: 0,
      gameOn: true,
    }));
  }

  shiftOneD = (arr) => {
    let lastNonSetIndex = 3;
    let index = 2;
    let flag = false;
    let addScore = 0;
    while(index >= 0) {
      if (arr[lastNonSetIndex] === 0) {
        arr[lastNonSetIndex] = arr[index];
        arr[index] = 0;
        index--;
        if (lastNonSetIndex !== index) flag=true;
      } else if (arr[index] === 0) {
        index--;
      }
      else if (arr[lastNonSetIndex] === arr[index]) {
        arr[lastNonSetIndex] = 2 * arr[index];
        addScore += 2 * arr[index];
        arr[index] = 0;
        if (lastNonSetIndex !== index) flag=true;
        lastNonSetIndex--;
        index--;
      }
      else {
        lastNonSetIndex--;
        if(lastNonSetIndex !== index) {
          arr[lastNonSetIndex] = arr[index];
          arr[index] = 0;
          if (lastNonSetIndex !== index) flag=true;
        }
        index--;
      }
    }
    console.log({ arr });
    return { arr, flag, addScore };
  }

  shiftRight = () => {
    if (this.state.isGameOver || !this.state.gameOn) return;
    const { squares } = this.state;
    console.log('shiftRight');
    console.log({ squares });
    let changeOccuredFlag = false;
    let val = {};
    let addScore = 0;    
    for (var i = 0; i < squares.length ; i++) {
      let oneDArr = [squares[i][0], squares[i][1], squares[i][2], squares[i][3]];
      val = this.shiftOneD(oneDArr);
      oneDArr = val.arr;
      changeOccuredFlag = val.flag || changeOccuredFlag;
      console.log({ oneDArr });
      squares[i][0] = oneDArr[0];
      squares[i][1] = oneDArr[1];
      squares[i][2] = oneDArr[2];
      squares[i][3] = oneDArr[3];
      addScore += val.addScore;
    }
    return { squares, changeOccuredFlag, addScore };
  }

  shiftLeft = () => {
    if (this.state.isGameOver  || !this.state.gameOn) return;
    const { squares } = this.state;
    console.log('shiftLeft');
    console.log({ squares });
    let changeOccuredFlag = false;
    let val = {};
    let addScore = 0;    
    for (let i = 0; i < squares.length ; i++) {
      let oneDArr = [squares[i][3], squares[i][2], squares[i][1], squares[i][0]];
      val = this.shiftOneD(oneDArr);
      oneDArr = val.arr;
      changeOccuredFlag = val.flag || changeOccuredFlag;
      squares[i][0] = oneDArr[3];
      squares[i][1] = oneDArr[2];
      squares[i][2] = oneDArr[1];
      squares[i][3] = oneDArr[0];
      addScore += val.addScore;
    }
    return { squares, changeOccuredFlag, addScore };
  }

  shiftDown = () => {
    if (this.state.isGameOver || !this.state.gameOn) return;
    const { squares } = this.state;
    console.log('shiftUp');
    let val = {};
    let addScore = 0;    
    let changeOccuredFlag = false;
    for (let i = 0; i < squares.length ; i++) {
      let oneDArr = [squares[0][i], squares[1][i], squares[2][i], squares[3][i]];
      val = this.shiftOneD(oneDArr);
      oneDArr = val.arr;
      changeOccuredFlag = val.flag || changeOccuredFlag;
      squares[0][i] = oneDArr[0];
      squares[1][i] = oneDArr[1];
      squares[2][i] = oneDArr[2];
      squares[3][i] = oneDArr[3];
      addScore += val.addScore;
    }
    return { squares, changeOccuredFlag, addScore };
  }

  shiftUp = () => {
    if (this.state.isGameOver || !this.state.gameOn) return;
    const { squares } = this.state;
    let changeOccuredFlag = false;
    let val = {};
    let addScore = 0;    
    for (let i = 0; i < squares.length ; i++) {
      let oneDArr = [squares[3][i], squares[2][i], squares[1][i], squares[0][i]];
      val = this.shiftOneD(oneDArr);
      oneDArr = val.arr;
      changeOccuredFlag = val.flag || changeOccuredFlag;
      squares[0][i] = oneDArr[3];
      squares[1][i] = oneDArr[2];
      squares[2][i] = oneDArr[1];
      squares[3][i] = oneDArr[0];
      addScore += val.addScore;
    }
    return { squares, changeOccuredFlag, addScore };
  }

  compute = ({ squares: shiftArr, changeOccuredFlag, addScore }) => {

    console.log('compute', { squares: shiftArr, changeOccuredFlag, addScore });

    let { bestScore, score } = this.state;
    score += addScore;
    if (score > bestScore) {
      bestScore = score;
    }

    if (changeOccuredFlag === false) {
      this.setState({
        state: {
          bestScore,
          score,
        }
      });
      return ;
    }
    console.log({ changeOccured: changeOccuredFlag });
    if (checkGameOver(shiftArr)) {
      console.log({ shiftArr });
      this.setState({ 
        state : {
          isGameOver: true, 
          bestScore,
          score, 
        },
      });
      // this.stopTimer(); 
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
    const twoOrFour = (popCandidates.length * randomCandidate) % 2;
    console .log({twoOrFour});
    shiftArr[popCandidates[randomCandidate][0]][popCandidates[randomCandidate][1]] = twoOrFour === 1 ? 4 : 2;
    this.setState({
      squares: shiftArr,
      isGameOver: false,
      bestScore,
      score,
    });
  }

  handleKeyDown(key) {
    /* code for shifting array */
    if (this.state.isGameOver || !this.state.gameOn) return;
    let shiftArr;
    console.log({ key: key.keyCode });
    switch (key.keyCode) {
      case 37 :
        shiftArr = this.shiftLeft();
          break;
      case 39 :
        shiftArr = this.shiftRight();
          break;
      case 38 :
        shiftArr = this.shiftUp();
          break;
      case 40 :
        shiftArr = this.shiftDown();
          break;
      default:
        return;
    }

    this.compute(shiftArr);
  }

  // getTime() {
  //   const timeInSeconds = Math.floor(this.state.time / 1000);
  //   let minutes = String(Math.floor(timeInSeconds / 60) || 0);
  //   let seconds = String(timeInSeconds % 60 || 0);
  //   if (minutes.length == 1) {
  //     minutes = '0' + minutes;
  //   }
  //   if (seconds.length == 1) {
  //     seconds = '0' + seconds;
  //   }
  //   return minutes + ' : ' + seconds;
  // } 

  onSwipeMove = pos => {
    this.setState({
      pos,
    });
  };

  onSwipeEnd = () => {
    const { pos } = this.state;
    let shiftArr = {};
    if (pos.y > -100 && pos.y < 100) {
      if (pos.x < -100) {
        shiftArr = this.shiftLeft();
      } else if (pos.x > 100) {
        shiftArr = this.shiftRight();
      } else {
        return;
      }
    } else if(pos.x > -100 && pos.x < 100) {
      if (pos.y < -100) {
        shiftArr = this.shiftUp();
      } else if (pos.y > 100) {
        shiftArr = this.shiftDown();
      } else {
        return;
      }
    } else {
      return;
    }
    this.compute(shiftArr);
  }

  render() {
    const { squares, score }= this.state;
    const isGameOver = checkGameOver(squares);
    console.log({ squares, score });
    const status = isGameOver ? 'Game Over' : 'Play!';
    console.log({ status });
    return (
      <Container>
      <div>
        <Swipe onSwipeMove={this.onSwipeMove} onSwipeEnd={this.onSwipeEnd}>
          <div className="game" onKeyDown={this.handleKeyDown} tabIndex="0">
          <Row>
            <Col>
              <Row>
              <Col></Col>
                <div>
                  <h1 className="header">Gradeup 2048</h1>
                </div>
              <Col></Col>  
              </Row>
            </Col>
          </Row>  
          <Row>
            <Col>
              <Row>
              <Col></Col>
                <div>
                  <Button className="bestScore">Best Score : {this.state.bestScore}</Button>
                </div>
              <Col></Col>  
              </Row>
            </Col>
          </Row> 
          <Row>
            <Col>
              <Row>
                <Col></Col>
                <Col>
                  <div className="game-board">
                    <Board squares={squares}/>
                  </div>
                </Col>
                <Col></Col>
              </Row>
            <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
                  <Col>
                    <div>
                      <Button className="status" color="danger">{status}</Button>
                    </div>
                  </Col>
                  
                  <Col>
                    <div>
                      <Button className="score" color="warning">Score: {score} !</Button>
                    </div>
                  </Col>
                  
                  <Col>
                    <div className="restart">
                      <Button color="info" className="restart" onClick={this.handleRestart}>New Game!</Button>
                    </div>
                  </Col>
                  <Col></Col><Col></Col><Col></Col><Col></Col><Col></Col><Col></Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Swipe>
      </div>
      </Container>
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
            // <div id="timer" name="timer">
            // <Row>
            // <Col></Col><Col></Col><Col></Col>
            // <Col><div className="timer">
            //   <Button color="success"> You are Slow {this.getTime()}</Button>
            // </div></Col><Col></Col><Col></Col><Col></Col>
            // </Row>
            // </div>

export default Game;
