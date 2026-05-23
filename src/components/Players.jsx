import Player from "./Player"

export default function Players({ players, ...props }) {
  return (
    <>
      <div id="players" className="highlight-player">
        <Player name={ players.X } symbol="X" { ...props } />
        <Player name={ players.O } symbol="O" { ...props } />
      </div>
    </>
  )
}