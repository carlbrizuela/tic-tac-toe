import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import GameHistory from './components/GameHistory.jsx'
import GameOver from './components/GameOver'
import StartGame from './components/StartGame'
import Players from './components/Players'
import checkWinner from './utils/checkWinner.js'

const initialGameBoard = [
  [ null, null, null ],
  [ null, null, null ],
  [ null, null, null ]
]

let winner = null;

function App() {
  const [ isShowingHistory, setIsShowingHistory ] = useState( false )
  const [ moveHistory, setMoveHistory ] = useState( [] )
  const [ hasGameStarted, setHasGameStarted ] = useState( false )
  const [ players, setPlayers ] = useState(
    {
      X: "Player 1",
      O: "Player 2"
    }
  )

  const gameBoard = [ ...initialGameBoard.map( row => [ ...row ] ) ]
  const currentPlayer = moveHistory.length % 2 === 0 ? 'X' : 'O'

  for ( const move of moveHistory ) {
    const [ rowIndex, colIndex ] = move.position
    gameBoard[ rowIndex ][ colIndex ] = move.player
  }

  if ( moveHistory.length > 4 ) {
    let symbol = checkWinner( gameBoard )
    if ( symbol )
      winner = { symbol: symbol, name: players[ symbol ] }
  }

  const isDraw = moveHistory.length === 9 && !winner

  function handleClickSquare( rowIndex, colIndex ) {
    setMoveHistory( ( prev ) => {
      let currentPlayer = prev.length % 2 === 0 ? 'X' : 'O'
      return [ { player: currentPlayer, position: [ rowIndex, colIndex ] }, ...prev ]
    } )
  }

  function checkWin() {
    // Check rows
    for ( let i = 0; i < 3; i++ ) {
      if ( gameBoard[ i ][ 0 ] && gameBoard[ i ][ 0 ] === gameBoard[ i ][ 1 ] && gameBoard[ i ][ 0 ] === gameBoard[ i ][ 2 ] ) {
        return gameBoard[ i ][ 0 ]
      }
    }

    // Check columns
    for ( let j = 0; j < 3; j++ ) {
      if ( gameBoard[ 0 ][ j ] && gameBoard[ 0 ][ j ] === gameBoard[ 1 ][ j ] && gameBoard[ 0 ][ j ] === gameBoard[ 2 ][ j ] ) {
        return gameBoard[ 0 ][ j ]
      }
    }

    // Check diagonals
    if ( gameBoard[ 0 ][ 0 ] && gameBoard[ 0 ][ 0 ] === gameBoard[ 1 ][ 1 ] && gameBoard[ 0 ][ 0 ] === gameBoard[ 2 ][ 2 ] ) {
      return gameBoard[ 0 ][ 0 ]
    }
    if ( gameBoard[ 0 ][ 2 ] && gameBoard[ 0 ][ 2 ] === gameBoard[ 1 ][ 1 ] && gameBoard[ 0 ][ 2 ] === gameBoard[ 2 ][ 0 ] ) {
      return gameBoard[ 0 ][ 2 ]
    }

    return null
  }

  function resetGame() {
    winner = null
    setHasGameStarted( false )
    setIsShowingHistory( false )
    setMoveHistory( [] )
  }

  function showHistory() {
    setIsShowingHistory( true )
  }

  function handlePlayerNameChange( symbol, newName ) {
    setPlayers( ( prev ) => ( {
      ...prev,
      [ symbol ]: newName
    } ) )
  }

  function handleGameStart() {
    if ( players.X && players.O ) {
      setHasGameStarted( true )
    }
  }

  return (
    <div id="game-container">
      <h1>Tic Tac Toe</h1>
      { !hasGameStarted ? (
        <StartGame players={ players } onPlayerNameChange={ handlePlayerNameChange } hasGameStarted={ handleGameStart } />
      ) : (
        <>
          { !isShowingHistory ? (
            <>
              <Players players={ players } hasGameStarted={ hasGameStarted } currentPlayer={ currentPlayer } />
              <GameBoard onClickSquare={ handleClickSquare } gameBoard={ gameBoard } />
            </>
          ) : (
            <GameHistory gameBoard={ gameBoard } moveHistory={ moveHistory } handleResetGame={ resetGame } winner={ winner } />
          ) }

          { ( winner || isDraw ) && !isShowingHistory && (
            <GameOver winner={ winner } handleResetGame={ resetGame } handleShowHistory={ showHistory } />
          ) }
        </>
      ) }
    </div>
  )
}

export default App
