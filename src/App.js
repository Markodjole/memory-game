import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Card from './components/Card';
import Scores from './components/Scores';
import ChooseGrid from './components/ChooseGrid';

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
      showScoreList: false,
      scoreList: [],

      cards: [
        // { val: 10, opened: false, id: 1, pair: 1 },
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

  showScore = (scores) => this.setState({ scoreList: scores, showScoreList: !this.state.showScoreList, shownGame: false});

  


  //////////////////////////////////////////// handle card click ////////////////////////////////////////////////////////////////

  handleCardClick = clickedCard => {
    const { firstClickedCard, totalClicks, secondClickedCard } = this.state;

    totalClicks === 0 ? this.runStopwatch() : null;

    /////// if its last card ///////
    if (this.isThisLastCard()) {
      this.clearStopwatch();


      // Get the existing data
      var existing = localStorage.getItem('scores');

      // If no existing data, create an array
      existing = existing ? existing.split(',') : [];
      existing.push(this.state.playerName, this.state.time);


      // Save back to localStorage
      localStorage.setItem('scores', existing.toString());

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
  
    return (
      <div>
        {/* //////////////////////////  log page ///////////////////////////////////////////////// */}
        {this.state.logPage ? (
          <div className="welcome">
            <p>Welcome to memory game</p>
            <input className="logInput"
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

              <ChooseGrid
              onChooseGrid = {this.chooseGrid}
              />
              {/* <div className="chooseGrid">
                <span>Choose grid type: </span>
                <button onClick={() => this.chooseGrid(2)} className="chooseGridButton">2 x 2</button>
                <button onClick={() => this.chooseGrid(4)} className="chooseGridButton">4 x 4</button>
                <button onClick={() => this.chooseGrid(6)} className="chooseGridButton">6 x 6</button>
              </div> */}


            </div>


            {/* ////////////////////////////// just game ///////////////////////////////////// */}

              
                {/* /////////////////// score list /////////////// */}
                  <Scores  
                  showScore = {this.showScore}
                  scoreList = {this.state.scoreList}
                  showScoreListIsOn = {this.state.showScoreList}
                  />
             
          
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
// function Card(props) {
//   return (
//     <button
//       className="grid-item"
//       disabled={props.opened}
//       style={{ backgroundColor: props.opened ? "rgb(0, 204, 153)" : "rgb(255, 102, 102)", pointerEvents: null }}
//       onClick={() => props.onCardClick(props.obj)}
//     >
//       <div style={{ visibility: props.opened ? "visible" : "hidden" }}>
//         {" "}
//         {props.val}
//       </div>
//     </button>
//   );
// }



export default App;
