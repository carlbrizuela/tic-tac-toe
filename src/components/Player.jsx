import { useState } from "react"

export default function Player( { name, symbol, onNameChange, hasGameStarted, currentPlayer } ) {

  const [ isEditing, setIsEditing ] = useState( false )
  const [ playerName, setPlayerName ] = useState( name )

  let styling = `player ${ currentPlayer === symbol ? 'active' : '' }`

  return (
    <li className={ styling }>
      { hasGameStarted ? (
        <span className="player-name">{ playerName }</span>
      ) : (
        <input type="text" value={ playerName }
          onChange={ ( e ) => setPlayerName( e.target.value ) }
          onBlur={ ( e ) => {
            e.target.reportValidity();
            onNameChange( symbol, playerName )
          } }
          required
        />
      ) }
      <span className="player-symbol">{ symbol }</span>
    </li>
  )
}