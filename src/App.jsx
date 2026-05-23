import { useDeferredValue, useEffect, useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import GameHistory from './components/GameHistory.jsx'
import GameOver from './components/GameOver'
import StartGame from './components/StartGame'
import Players from './components/Players'
import checkWinner from './utils/checkWinner.js'
import ScoreBoard from './components/ScoreBoard.jsx'
import FirstPlayer from './components/FirstPlayer.jsx'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const initialPlayers = {
  X: "Player 1",
  O: "Player 2"
}

const initialScores = {
  [initialPlayers.X]: 0,
  [initialPlayers.O]: 0,
  Draws: 0,
}

function App() {
  const [isShowingHistory, setIsShowingHistory] = useState(false)
  const [moveHistory, setMoveHistory] = useState([])
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [showFirstPlayer, setShowFirstPlayer] = useState(false)
  const [players, setPlayers] = useState(initialPlayers)
  const [scores, setScores] = useState(initialScores)

  const gameBoard = [...initialGameBoard.map(row => [...row])]
  const currentPlayer = moveHistory.length % 2 === 0 ? 'X' : 'O'

  for (const move of moveHistory) {
    const [rowIndex, colIndex] = move.position
    gameBoard[rowIndex][colIndex] = move.player
  }

  const winner = checkWinner(gameBoard, players)
  const isDraw = moveHistory.length === 9 && !winner

  function handleSetScore(winner) {
    let currentScore = winner ? scores[winner.name] : scores.Draws
    if (!isDraw) {
      setScores((prev) => ({ ...prev, [winner.name]: currentScore + 1 }))
    } else {
      setScores((prev) => ({ ...prev, Draws: currentScore + 1 }))
    }
  }

  function handleClickSquare(rowIndex, colIndex) {
    setMoveHistory((prev) => {
      let currentPlayer = prev.length % 2 === 0 ? 'X' : 'O'
      return [{ player: currentPlayer, position: [rowIndex, colIndex] }, ...prev]
    })
  }

  function resetGame() {
    setMoveHistory([])
    setHasGameStarted(false)
    setIsShowingHistory(false)
    setScores(initialScores)
    setPlayers(initialPlayers)
  }

  function continueGame() {
    handleSetScore(winner)
    setMoveHistory([])
    setPlayers((prev) => {
      let newX = prev.O
      let newO = prev.X
      return ({ X: newX, O: newO })
    })
    setIsShowingHistory(false)
    setShowFirstPlayer(true);
  }

  function showHistory() {
    setIsShowingHistory(true)
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prev) => ({
      ...prev,
      [symbol]: newName
    }))
  }




  function handleGameStart() {
    if (players.X && players.O) {
      setHasGameStarted(true)
      setScores({
        [players.X]: 0,
        [players.O]: 0,
        Draws: 0
      })
    }
  }

  return (
    <div id="container">
      <div></div>
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
                <ScoreBoard scores={ scores } players={ players } />
                { showFirstPlayer && <FirstPlayer player={ players.X } setShowFirstPlayer={ () => { setShowFirstPlayer(false) } } /> }
              </>
            ) : (
              <GameHistory gameBoard={ gameBoard } moveHistory={ moveHistory } handleResetGame={ resetGame } winner={ winner } continueGame={ continueGame } />
            ) }

            { (winner || isDraw) && !isShowingHistory && (
              <GameOver winner={ winner } handleResetGame={ resetGame } handleShowHistory={ showHistory } continueGame={ continueGame } />
            ) }

          </>
        ) }

      </div>
    </div >
  )
}

export default App
