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
      <section>
        <h2>Available</h2>
        <ol>
          {availableIds.map((id) => {
            const player = players[id];
            return (
              <li key={id} onClick={() => draftPlayer(id)}>
                {player.name}
              </li>
            );
          })}
        </ol>
      </section>
      <section>
        <h2>Drafted</h2>
        <ol>
          {draftedIds.map((id) => {
            const player = players[id];
            return (
              <li key={id} onClick={() => undraftPlayer(id)}>
                {player.name}
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}

export default App;
