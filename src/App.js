import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      playerNameInInput: false,
      time: 0,
      timeResult: 0,
      running: false,
      clicks: 0,
      totalClicks: 0,
      firstClickedCard: null,
      secondClickedCard: null,
      firstAndSecondNotMatch: null,
      finishedGame: false,
      logPage: true,
      gamePage: false,
      gridColumns: '',
      shownGame: false,
      scoreList: [],

      cards: [
        // { val: 10, opened: false, id: 1, pair: 1 },
        // { val: 10, opened: false, id: 2, pair: 1 },
        // { val: 20, opened: false, id: 3, pair: 2 },
        // { val: 20, opened: false, id: 4, pair: 2 },
        // { val: 30, opened: false, id: 5, pair: 3 },
        // { val: 30, opened: false, id: 6, pair: 3 },
        // { val: 40, opened: false, id: 7, pair: 4 },
        // { val: 40, opened: false, id: 8, pair: 4 },
        // { val: 50, opened: false, id: 9, pair: 5 },
        // { val: 50, opened: false, id: 10, pair: 5 },
        // { val: 60, opened: false, id: 11, pair: 6 },
        // { val: 60, opened: false, id: 12, pair: 6 },
        // { val: 70, opened: false, id: 13, pair: 7 },
        // { val: 70, opened: false, id: 14, pair: 7 },
        // { val: 80, opened: false, id: 15, pair: 8 },
        // { val: 80, opened: false, id: 16, pair: 8 }
      ]
    };
    this.intervalId = 0;
  }



  /////////////////////// grid content making function //////////////////////////////////////////////
  chooseGrid = (n) => {

    let ar = [];
    let newObj = { val: 0, opened: false, id: 0, pair: 0 };;
    for (let i = 1; i <= n * n; i++) {
      ar.push({ val: 0, opened: false, id: 0, pair: 0 });
    };
    let newAr = ar.map((card, ind) => {

      if (ind % 2 === 0) {
        if (ind == 0) { ind = 1 };
        newObj = { val: newObj.val + 10, opened: false, id: newObj.id + 1, pair: newObj.pair + 1 };
        return Object.assign({}, newObj);
      } else {
        newObj.id = newObj.id + 1;
        return Object.assign({}, newObj);
      }

    });
    let gridCol = () => {
      let gridC = '';
      for (let i = 0; i < n; i++) {
        gridC += "auto ";
      }
      console.log(gridC)
      return gridC;
    }
    console.log(gridCol());
    this.setState({ cards: newAr, gridColumns: gridCol(), shownGame: true }, () => this.shafleCards());

  }
  //////////////////////////////// shafle cards ////////////////////////////////////////////////////////////
  shafleCards = () => {
    this.clearStopwatch();
    let newCards = this.state.cards.map((card) => Object.assign({}, card, { opened: false }));
    newCards.sort((a, b) => 0.5 - Math.random());

    this.setState({
      cards: newCards,
      totalClicks: 0,
      timeResult: 0
    });
  }

  handleStartGameClick = () => {
    let newCards = this.state.cards.map((card) => Object.assign({}, card, { opened: false }));
    newCards.sort((a, b) => 0.5 - Math.random());
    this.setState({
      logPage: !this.state.logPage,
      gamePage: !this.state.gamePage,
      cards: newCards
    });
  };

  goToLogPage = () => {
    this.clearStopwatch();
    this.setState({
      playerName: '',
      playerNameInInput: false,
      logPage: true,
      gamePage: false,
      totalClicks: 0,
      timeResult: 0
    })
  }

  playerNameInInput = (e) => {
    e.target.value.length ? this.setState({ playerNameInInput: true, playerName: e.target.value }) : this.setState({ playerNameInInput: false })

  };

  isGameFinished() {
    if (this.state.cards.find(card => !card.opened)) {
      return false;
    }
    return true;
  }

  isThisLastCard() {
    let ar = this.state.cards.filter((card) => !card.opened);
    if (ar.length === 1) {
      return true;
    } else {
      return false;
    }
  }

  runStopwatch = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        time: this.state.time + 1,
      })
    }, 1000)

    this.setState(state => ({ running: !state.running }))
  }

  clearStopwatch = () => {
    let timeRes = this.state.time;
    this.setState({ time: 0, running: false, timeResult: timeRes });
    clearInterval(this.intervalId)

  }
  showScoreList = () => {
    var ar = [];
    var scoresFromLocal = localStorage.getItem("scores");
    scoresFromLocal = scoresFromLocal ? scoresFromLocal.split(',') : [];
    ar.push(scoresFromLocal);
    this.setState({ scoreList: ar });
    console.log(ar);
  }


  //////////////////////////////////////////// handle card click ////////////////////////////////////////////////////////////////

  handleCardClick = clickedCard => {
    const { firstClickedCard, totalClicks, secondClickedCard } = this.state;

    totalClicks === 0 ? this.runStopwatch() : null;

    /////// if its last card ///////
    if (this.isThisLastCard()) {
      this.clearStopwatch();


      //////////////// from https://gomakethings.com/how-to-update-localstorage-with-vanilla-javascript/ ////////////////////////////////
      // Get the existing data
      var existing = localStorage.getItem('scores');

      // If no existing data, create an array
      // Otherwise, convert the localStorage string to an array

      existing = existing ? existing.split(',') : [];
      existing.push(this.state.playerName, this.state.time);


      // Save back to localStorage
      localStorage.setItem('scores', existing.toString());


      // // Get the existing data
      // var existing = localStorage.getItem('scores');

      // // If no existing data, create an array
      // // Otherwise, convert the localStorage string to an array
      // existing = existing ? JSON.parse(existing) : {};

      // // Add new data to localStorage Array
      // existing[this.state.playerName] = this.state.time;

      // // Save back to localStorage
      // localStorage.setItem('scores', JSON.stringify(existing));
    }

    // first click logic
    if (totalClicks % 2 === 1) {

      const cards = this.state.cards.map(card => {
        if (card.id === clickedCard.id) {
          return Object.assign({}, card, { opened: true })
        }

        return card;
      })

      this.setState({
        cards,
        secondClickedCard: clickedCard,
        totalClicks: totalClicks + 1
      })



    } else {

      if (firstClickedCard && secondClickedCard) {
        console.log('BOTH CARD CLICKED')


        if (firstClickedCard.pair === secondClickedCard.pair) {

          this.setState({
            cards,
            firstClickedCard: clickedCard,
            secondClickedCard: null,
            totalClicks: totalClicks + 1
          })


        } else {


          const cards = this.state.cards.map(card => {
            if (card.id === firstClickedCard.id || card.id === secondClickedCard.id) {
              return Object.assign({}, card, { opened: false })
            }

            if (card.id === clickedCard.id) {
              return Object.assign({}, card, { opened: true })
            }

            return card;
          })

          this.setState({
            cards,
            firstClickedCard: clickedCard,
            totalClicks: totalClicks + 1,
            secondClickedCard: null
          })

          return;

        }

      }


      const cards = this.state.cards.map(card => {
        if (card.id === clickedCard.id) {
          return Object.assign({}, card, { opened: true })
        }

        return card;
      })

      this.setState({
        cards,
        firstClickedCard: clickedCard,
        totalClicks: totalClicks + 1
      })

      console.log('FIRST click')

    }
  };



  /////////////////////////////////// render //////////////////////////////////////////////////////////////

  render() {
    let cards = this.state.cards;
    let scoresFromRender = [];
    for (var i in this.state.scoreList) {
      scoresFromRender.push({ i: this.state.scoreList[i] })
    }


    return (
      <div>
        {/* //////////////////////////  log page ///////////////////////////////////////////////// */}
        {this.state.logPage ? (
          <div className="welcome">
            <p>Welcome to memory game</p>
            <input
              onChange={this.playerNameInInput}
              placeholder="Player name"
              type="text"
              required
            />
            <br />
            <button disabled={!this.state.playerNameInInput} onClick={this.handleStartGameClick} className="startButton">
              Start game
            </button>
          </div>
        ) : null}

        {/*/////////////////////////////// game page ///////////////////////////////////////////////////////////// */}
        {this.state.gamePage ? (
          <div className="wrapperForGamePage">
            <div className="headerClass">
              <h3>MEMORY CARD GAME</h3>
              <p>Player name: {this.state.playerName.toUpperCase()}</p>

              {/* //////////////////// choose grid ///////////// */}

              <div className="chooseGrid">
                <span>Choose grid type: </span>
                <button onClick={() => this.chooseGrid(2)} className="chooseGridButton">2 x 2</button>
                <button onClick={() => this.chooseGrid(4)} className="chooseGridButton">4 x 4</button>
                <button onClick={() => this.chooseGrid(6)} className="chooseGridButton">6 x 6</button>
              </div>


            </div>
            {/* ////////////////////////////// just game ///////////////////////////////////// */}

            {/* {this.state.scoreList.map((score)=>{
            return <div> <span>{score.key}</span><span>{score.sec}</span> </div> })
            } */}


            <ul >
              {/* {scoresFromRender.map((item) => {
                return <li >{item}</li>
              })} */}

            </ul>
            <button onClick={this.showScoreList}>scores</button>

            {this.state.shownGame ?

              <div className="wrapperForGame">
                <div className="totalClicks">
                  <p>Total clicks: {this.state.totalClicks}</p>
                  <p>Time: {this.state.time < 1 ? this.state.timeResult : this.state.time} s</p>
                </div>



                <div className="grid-container"
                  style={{ gridTemplateColumns: this.state.gridColumns }}
                >
                  {cards.map(card => {
                    return (
                      <Card
                        val={card.val}
                        key={card.id}
                        id={card.id}
                        onCardClick={this.handleCardClick}
                        opened={card.opened}
                        totalClicks={this.totalClicks}
                        obj={card}
                        finishedGame={this.state.finishedGame}
                      />
                    );
                  })}
                </div>
                <div><button className="shafleCardsButton" onClick={this.shafleCards}
                >Start new game</button></div>
                {this.isGameFinished() ? (
                  <p className="gameOver">Game over, well done! You did it in {this.state.totalClicks} clicks !</p>
                ) : null}
              </div>
              : null
            }

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <button className="goBackButton" onClick={this.goToLogPage}>Go back</button>



          </div>

        ) : null}
      </div>
    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// Card component //////////////////////////////////////////////////////
function Card(props) {
  return (
    <button
      className="grid-item"
      disabled={props.opened}
      style={{ backgroundColor: props.opened ? "rgb(0, 204, 153)" : "rgb(255, 102, 102)", pointerEvents: null }}
      onClick={() => props.onCardClick(props.obj)}
    >
      <div style={{ visibility: props.opened ? "visible" : "hidden" }}>
        {" "}
        {props.val}
      </div>
    </button>
  );
}



export default App;
