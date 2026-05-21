import Player from './Player'
import Players from './Players'

export default function StartGame( { players, onPlayerNameChange, hasGameStarted } ) {
  return (
    <div id="start-game">
      <p>Welcome to the game!</p>
      <p>Please enter your names below:</p>
      <Players players={ players } onNameChange={ onPlayerNameChange } />
      <button id="start-game" onClick={ hasGameStarted }>Start Game</button>
    </div>
  )
}