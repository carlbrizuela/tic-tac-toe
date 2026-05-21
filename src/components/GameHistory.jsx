import { useState } from 'react'
import GameBoard from './GameBoard'

export default function GameHistory( { gameBoard, moveHistory, handleResetGame, winner } ) {
  const [ historyIndex, setHistoryIndex ] = useState( 0 )

  let priorMoves = moveHistory.slice( 0, historyIndex )

  function handlePrevious() {
    setHistoryIndex( ( prev ) => prev + 1 )
  }

  function handleNext() {
    setHistoryIndex( ( prev ) => prev - 1 )
  }

  return (
    <div id="move-history">
      <div id="move-history-header">
        <h2>Game History</h2>
        <span> { winner ? `Winner: ${ winner.name } ( ${ winner.symbol } )` : 'It\'s a draw!' }</span>
      </div>
      <button onClick={ handleResetGame }>Start New Game</button>
      <GameBoard gameBoard={ gameBoard } onClickSquare={ () => { } } currentMove={ moveHistory[ historyIndex ] } priorMoves={ priorMoves } />

      <div id="move-history-buttons">
        <button onClick={ handlePrevious } disabled={ historyIndex >= moveHistory.length - 1 }>
          Previous
        </button>
        <button onClick={ handleNext } disabled={ historyIndex <= 0 }>
          Next
        </button>
      </div>
    </div>
  )
}