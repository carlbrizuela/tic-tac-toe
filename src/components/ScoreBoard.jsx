export default function ScoreBoard({ scores, players }) {
  let total = Object.values(scores).reduce((acc, current) => acc + current, 0)
  return (
    <div id="score-board">
      <table>
        <thead>
          <tr>
            { Object.keys(scores).map((key) => (
              <th key={ key }>{ key }</th>
            )) }
          </tr>
        </thead>
        <tbody>
          <tr>
            { Object.entries(scores).map(([player, score]) => (
              <td key={ player }>{ score }</td>
            )) }
          </tr>
        </tbody>
      </table>
    </div>
  )
}