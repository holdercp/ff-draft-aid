import "./App.css";
import rankings from "./data/rankings.json";

type Ranking = {
  Overall: number;
  Player: string;
  Position: Postion;
  "Pos Rank": number;
  Tier: number;
  "Auction (Out of $200)": string;
};

type Postion = "QB" | "RB" | "WR" | "TE";

type Player = {
  overallRank: number;
  name: string;
  position: Postion;
  positionRank: number;
  tier: number;
};

function mapRankingsToPlayers(rankings: Ranking[]): Player[] {
  return rankings.map((ranking) => ({
    overallRank: ranking.Overall,
    name: ranking.Player,
    position: ranking.Position,
    positionRank: ranking["Pos Rank"],
    tier: ranking.Tier,
  }));
}

function App() {
  const players = mapRankingsToPlayers(rankings as Ranking[]);
  return (
    <main>
      <h1>FF Draft Aid</h1>
      <section>
        <h2>Available</h2>
        <ol>
          {players.map((player) => (
            <li key={player.name}>{player.name}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}

export default App;
