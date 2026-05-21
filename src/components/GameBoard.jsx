import { useState } from 'react'

import Player from './Player'
import Players from './Players'

export default function GameBoard( { onClickSquare, gameBoard, currentMove = null, priorMoves = [] } ) {

  function setStyling( rowIndex, colIndex ) {
    if ( currentMove && currentMove.position[ 0 ] === rowIndex && currentMove.position[ 1 ] === colIndex ) {
      return 'highlighted';
    }

    if ( priorMoves.length > 0 ) {
      for ( const move of priorMoves ) {
        if ( move.position[ 0 ] === rowIndex && move.position[ 1 ] === colIndex ) {
          return 'prior-move';
        }
      }
    }
    return '';
  }

  return (
    <div id="game-board">
      { gameBoard.map( ( row, rowIndex ) => (
        <div key={ rowIndex } className="game-row">
          { row.map( ( cell, colIndex ) => (
            <div key={ colIndex }
              className={ `game-cell ${ setStyling( rowIndex, colIndex ) }` }
              onClick={ cell ? null : () => onClickSquare( rowIndex, colIndex ) }>
              { cell }
            </div>
          ) ) }
        </div>
      ) ) }
    </div>
  )
}