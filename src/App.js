import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import GamePage from './components/GamePage/GamePage';
import Log from './components/LogPage/Log';
import Error from './components/Error';
import { Route, Switch } from 'react-router-dom';

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


  showScore = () => {
    let scoresFromLocal = localStorage.getItem("scores");
    scoresFromLocal = scoresFromLocal ? scoresFromLocal.split(',') : [];
    let arObj = () => {
      let ar = [];
      for (let i = 0; i < scoresFromLocal.length; i = i + 2) {
        ar.push(Object.assign({}, { id: i, pName: scoresFromLocal[i], sec: scoresFromLocal[i + 1] }))
      }
      return ar.sort((a, b) => (a.sec > b.sec) ? 1 : ((b.sec > a.sec) ? -1 : 0));
    }

    this.setState({ scoreList: arObj(), showScoreList: !this.state.showScoreList, shownGame: false })
  }

  chooseGrid = (n) => {

    let ar = [];
    let newObj = { val: 0, color: 0, opened: false, id: 0, pair: 0 };;
    for (let i = 1; i <= n * n; i++) {
      ar.push({ val: 0, color: 0, opened: false, id: 0, pair: 0 });
    };
    let newAr = ar.map((card, ind) => {

      if (ind % 2 === 0) {
        if (ind == 0) { ind = 1 };
        if(ind % 4 === 0){
        newObj = { val: newObj.val, color: 1, opened: false, id: newObj.id + 1, pair: newObj.pair + 1 };
        return Object.assign({}, newObj);
        }
        newObj = { val: newObj.val + 1, color: newObj.color + 1, opened: false, id: newObj.id + 1, pair: newObj.pair + 1 };
        return Object.assign({}, newObj);
      } else {
        newObj.id = newObj.id + 1;
        newObj.color = newObj.color + 1;
        return Object.assign({}, newObj);
      }

    });
    let gridCol = () => {
      let gridC = '';
      for (let i = 0; i < n; i++) {
        gridC += "auto ";
      }

      return gridC;
    }
    console.log(gridCol());
    this.setState({ cards: newAr, gridColumns: gridCol(), shownGame: true }, () => this.shafleCards());

  }



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


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// render //////////////////////////////////////////////////////////////

  render() {
    let cards = this.state.cards;
    

    return (
      <div>
      <Switch>
        {/* ////////////////////////////////////////////  log page //////////////////////////////////////////////////////////////////////////// */}
        <Route exact path="/" render={() => (
          <Log
            onPlayerNameInInput={this.playerNameInInput}
            onHandleStartGameClick={this.handleStartGameClick}
            playerNameInInput={this.state.playerNameInInput}
          />
        )} />
        {/*/////////////////////////////////////////////// game page ////////////////////////////////////////////////////////////////////////// */}
        <Route  path="/game-page" render={(match) => (
          <GamePage
            chooseGrid={this.chooseGrid}
            showScore={this.showScore}
            scoreList={this.state.scoreList}
            showScoreListIsOn={this.state.showScoreList}
            totalClicks={this.state.totalClicks}
            time={this.state.time}
            timeRestult={this.state.timeResult}
            gridColumns={this.state.gridColumns}
            cards={this.state.cards}
            shafleCards={this.shafleCards}
            isGameFinished={this.isGameFinished()}
            handleCardClick={this.handleCardClick}
            goToLogPage={this.goToLogPage}
            playerName={this.state.playerName}
            shownGame={this.state.shownGame}
            
            match={match}
          />
        )} />
        <Route component={Error} />
        </Switch>

        {/* {this.state.logPage ? ( */}



        {/* ) : null} */}
        {/* {this.state.gamePage ? ( */}




        {/* ) : null} */}
      </div>
    );
  }
}


export default App;
