import { useState } from "react";
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
  id: number;
  overallRank: number;
  name: string;
  position: Postion;
  positionRank: number;
  tier: number;
};

function mapRankingsToPlayers(rankings: Ranking[]): Record<string, Player> {
  return rankings.reduce(
    (players, ranking) => {
      players[`${ranking.Overall}`] = {
        id: ranking.Overall,
        overallRank: ranking.Overall,
        name: ranking.Player,
        position: ranking.Position,
        positionRank: ranking["Pos Rank"],
        tier: ranking.Tier,
      };
      return players;
    },
    {} as Record<string, Player>,
  );
}

const players = mapRankingsToPlayers(rankings as Ranking[]);

type PlayerProps = {
  id: string;
  onClick: (id: string) => void;
};
function Player({ id, onClick }: PlayerProps) {
  const player = players[id];
  return (
    <button
      onClick={() => onClick(id)}
      style={player.tier % 2 === 0 ? { backgroundColor: "salmon" } : undefined}
    >
      <span>{player.name}</span> <span>Tier {player.tier}</span>
    </button>
  );
}

function App() {
  const [draftedIds, setDraftedIds] = useState<string[]>([]);
  const availableIds = Object.keys(players).filter(
    (playerId) => !draftedIds.includes(playerId),
  );

  const draftPlayer = (playerId: string) => {
    setDraftedIds([...draftedIds, playerId]);
  };

  const undraftPlayer = (playerId: string) => {
    setDraftedIds(draftedIds.filter((id) => id !== playerId));
  };

  return (
    <main>
      <h1>FF Draft Aid</h1>
      <div className="grid">
        <section>
          <h2>Available</h2>
          <ol>
            {availableIds.map((id) => (
              <li key={id}>
                <Player id={id} onClick={draftPlayer} />
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2>Drafted</h2>
          <ol>
            {draftedIds.map((id) => (
              <li key={id}>
                <Player id={id} onClick={undraftPlayer} />
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}

export default App;
