import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      openCardsCounter: 0,
      playerNameInInput:false,
      clicks:0,
      totalClicks: 0,
      firstClickedCard: null,
      secondClickedCard: null,
      firstAndSecondNotMatch: null,
      finishedGame: false,
      logPage: true,
      gamePage: false,

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
  }


  shafleCards = () => {
    let newCards  = this.state.cards.map((card)=> Object.assign({}, card, { opened: false }));
    newCards.sort((a,b)=> 0.5 - Math.random());
    
    this.setState({cards: newCards});
  }

  handleStartGameClick = () => {
    let newCards  = this.state.cards.map((card)=> Object.assign({}, card, { opened: false }));
    newCards.sort((a,b)=> 0.5 - Math.random());
    this.setState({
      logPage: !this.state.logPage,
      gamePage: !this.state.gamePage,
      cards: newCards
    });
  };

  goToLogPage = () => {
    this.setState({
      playerName:'',
      playerNameInInput:false,
      logPage:true,
      gamePage:false
    })
  }

  playerNameInInput = (e) => {
    e.target.value.length ? this.setState({playerNameInInput:true, playerName:e.target.value}) : this.setState({playerNameInInput:false})
    
  };

  isGameFinished() {
    return this.state.cards.find(card => !card.opened) ? false : true;
  }


  ///////////////////////////// handle card click ////////////////////////////////////////////////////////////////

  handleCardClick = clickedCard => {

    const { firstClickedCard, totalClicks, secondClickedCard } = this.state;

  
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
    

  
  /////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    let cards = this.state.cards;

    return (
      <div>
        {/* log page ///////////////////////////////////////////////// */}
        {this.state.logPage ? (
          <div className="welcome">
            <p>WELCOME TO MEMORY CARD GAME</p>
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

{/* game page ///////////////////////////////////////////////////////////// */}
        {this.state.gamePage ? (
          <div>
            <div className="wrapperForGame">
            <div className="playerName">
            <h3>Welcome to memory card game</h3>
            <p>Player name: {this.state.playerName.toUpperCase()}</p>
            <div className="totalClicks">
              Total clicks: {this.state.totalClicks}
            </div>
            </div>
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
              <button className="shafleCardsButton" onClick={this.goToLogPage}>Go back</button>
              <button className="shafleCardsButton" onClick={this.shafleCards}>Start new game</button>
              {this.isGameFinished() ? (
                <h1 className="gameOver">Game over, well done!</h1>
              ) : null}
              
              
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
      className="cardButton"
      disabled={props.opened}
      style={{ backgroundColor: props.opened ? "rgb(0, 204, 153)" : "rgb(255, 102, 102)" , pointerEvents:null}}
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
