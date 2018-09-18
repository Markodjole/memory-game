import React, { Component } from 'react';

function Scores(props){

   let  showScoreList = () => {
        let scoresFromLocal = localStorage.getItem("scores");
        scoresFromLocal = scoresFromLocal ? scoresFromLocal.split(',') : [];
        let arObj = () => {
          let ar = [];
          for(let i=0; i<scoresFromLocal.length; i=i+2){
            ar.push(Object.assign({}, {id: i ,pName: scoresFromLocal[i], sec:scoresFromLocal[i+1]}))
          }
          return ar.sort((a,b) => (a.sec > b.sec) ? 1 : ((b.sec > a.sec) ? -1 : 0));
        }
        
        return arObj();
      }


  
        return ( 
        <div>
            <button className="goBackButton" onClick={() => props.showScore(showScoreList())}>scores</button>

            {props.showScoreListIsOn ? (
            <div className="scores">
                 <h3>Top scores :</h3>
                 <ul className="scoreList">
                   {props.scoreList.map((score, i) => {
                     return <li key={i} className="scoreListItem"><span>{score.pName}</span> : <span>{score.sec}</span></li>
                   })}
                 </ul>
             </div>
            )
        : null}
           
        </div>
         );
}

   
    

 
export default Scores;
