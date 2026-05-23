export default function checkWinner(gameBoard, players) {
  for (let i = 0; i < 3; i++) {
    if (gameBoard[i][0] && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][0] === gameBoard[i][2]) {
      let symbol = gameBoard[i][0]
      return { symbol: symbol, name: players[symbol] }
    }
    if (gameBoard[0][i] && gameBoard[0][i] === gameBoard[1][i] && gameBoard[0][i] === gameBoard[2][i]) {
      let symbol = gameBoard[0][i]
      return { symbol: symbol, name: players[symbol] }
    }
  }

  if (gameBoard[0][0] && gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2]) {
    let symbol = gameBoard[0][0]
    return { symbol: symbol, name: players[symbol] }
  }
  if (gameBoard[0][2] && gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0]) {
    let symbol = gameBoard[0][2]
    return { symbol: symbol, name: players[symbol] }
  }

  return null
}