export default function GameOver({ winner, handleResetGame, handleShowHistory, continueGame }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      { winner ? <p>{ winner.name } ( { winner.symbol } ) wins!</p> : <p>It's a draw!</p> }
      <div id="game-over-buttons">
        <button onClick={ handleResetGame }>Reset All</button>
        <button onClick={ handleShowHistory }>Show History</button>
        <button onClick={ continueGame }>Continue Game</button>
      </div>
    </div>
  )
}