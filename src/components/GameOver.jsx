export default function GameOver( { winner, handleResetGame, handleShowHistory } ) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      { winner ? <p>{ winner.name } ( { winner.symbol } ) wins!</p> : <p>It's a draw!</p> }
      <div id="game-over-buttons">
        <button onClick={ handleResetGame }>New Game</button>
        <button onClick={ handleShowHistory }>Show History</button>
      </div>
    </div>
  )
}