export default function FirstPlayer({ player, setShowFirstPlayer }) {
  return (
    <div id="first-player-container" onClick={ setShowFirstPlayer }>
      <div id="first-player">
        <p>{ player } is now X and will start the game.</p>
        <span>Click anywhere to begin.</span>
      </ div>
    </div>
  )
}