import { GameContext } from "../contexts/gameContext";
import { useContext } from "react";

export default function useGameContext() {
  return useContext(GameContext);
}