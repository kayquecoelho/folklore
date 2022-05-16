import { SongContext } from "../contexts/songContext";
import { useContext } from "react";

export default function useSongContext() {
  return useContext(SongContext);
}