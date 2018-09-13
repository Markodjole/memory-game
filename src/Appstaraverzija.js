import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      openCardsCounter:0,
      totalClicks: 0,
      cardsForClosing:[],
      firstCard:null,
      secondCard:null,
      finishedGame:false,
      logPage: true,
      gamePage: false,
      previousClickedCard: null,

      cards: [
        { val: 10, opened: false, id: 1, pair: 1 },
        { val: 10, opened: false, id: 2, pair: 1 },
        { val: 20, opened: false, id: 3, pair: 2 },
        { val: 20, opened: false, id: 4, pair: 2 },
        { val: 30, opened: false, id: 5, pair: 3 },
        { val: 30, opened: false, id: 6, pair: 3 },
        { val: 40, opened: false, id: 7, pair: 4 },
        { val: 40, opened: false, id: 8, pair: 4 },
        { val: 50, opened: false, id: 9, pair: 5 },
        { val: 50, opened: false, id: 10, pair: 5 },
        { val: 60, opened: false, id: 11, pair: 6 },
        { val: 60, opened: false, id: 12, pair: 6 },
        { val: 70, opened: false, id: 13, pair: 7 },
        { val: 70, opened: false, id: 14, pair: 7 },
        { val: 80, opened: false, id: 15, pair: 8 },
        { val: 80, opened: false, id: 16, pair: 8 }
      ]
    };

    this.clicks = 0;
    this.totalClicks = 0;
    this.openCardsCounter = 0;
  }

  handleStartGameClick = () => {
    this.setState({
      logPage: !this.state.logPage,
      gamePage: !this.state.gamePage
    });
  };
  changeDisabled = e => {
    // console.log(e.target);
  };

  isGameFinished(){
     return this.state.cards.find((card)=>!card.opened) ? false : true;
  }

  // isGameFinished(){
  //   this.state.cards.map((item)=>{
  //     if(item.opened){
  //       this.openCardsCounter++ ;
  //       this.openCardsCounter>=16 ? this.setState({finishedGame:true}) : false ;
  //     } 
  //   })
  // }

  ///////////////////////////// handle card click ////////////////////////////////////////////////////////////////

  handleCardClick = clickedCard => {
    
    if ((this.clicks = 2)) {
      this.clicks = 0;
      this.setState({ previousClickedCard: null });
    }

    const previousClickedCard = this.state.previousClickedCard;
    const cardsForClosing = this.state.cardsForClosing;

    let cardUpdate = { opened: true };
    let updatedCards;
    let cardsForClosingg  = [];

    // let updateForCardsForClosing  = this.state.cardsForClosing.length ?  { opened: false } : cardUpdate;

    if (previousClickedCard) {
      if (previousClickedCard.pair === clickedCard.pair) {
        cardUpdate = { opened: true };
      } else {
        cardUpdate = { opened: true };
        cardsForClosingg.push(previousClickedCard, clickedCard);
      }
    } else {
      cardUpdate = { opened: true };

      this.setState({
        previousClickedCard: clickedCard
      });
    }

    updatedCards = this.state.cards.map(item => {
      if (
        item.id === clickedCard.id 
        // ||
        // (previousClickedCard && item.id === previousClickedCard.id)
      ) {
        return Object.assign({}, item, cardUpdate);
      } 
      if(cardsForClosing.length && (item.id == cardsForClosing[0].id || item.id == cardsForClosing[0].id)) {
        return Object.assign({}, item, { opened: false });
      }
      else {
        return Object.assign({}, item, {
          opened: item.opened
        });
      }
    });


    this.setState({
      cards: updatedCards,
      totalClicks: this.state.totalClicks+1,
      cardsForClosing: cardsForClosingg
      // finishedGame: this.isGameFinished()
    });

    this.clicks++;
    
    // this.state.totalClicks>=16 ? this.isGameFinished() : null;
    // console.log(this.state.totalClicks);
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////


  render() {
    let cards = this.state.cards;

    return (
      <div>
        {this.state.logPage ? (
          <div className="welcome">
            <p>Welcome to memory game</p>
            <input
              onChange={this.changeDisabled}
              placeholder="Player name"
              type="text"
              required
            />
            <br />
            <button onClick={this.handleStartGameClick} className="startButton">
              Start game
            </button>
          </div>
        ) : null}

        {this.state.gamePage ? (
          <div>
            <div className="totalClicks">Total clicks: {this.state.totalClicks}</div>
          
            <div className="wrapperForGame">
             <div className="flex-container">
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
           {this.isGameFinished() ? <h1 className="gameOver">Game over, well done!</h1> : null}
          </div>
          </div> 
        ) : null}
      </div>
    );
  }
}

function Card(props) {
  return (
    <button
      style={{ backgroundColor: props.opened ? "green" : "red" }}
      onClick={() => props.onCardClick(props.obj)}
    >
     <div style={{ visibility: props.opened ? "visible" : "hidden" }}> {props.val}</div>
    </button>
    
  );
}

export default App;
