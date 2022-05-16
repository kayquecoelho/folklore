import SongApi from "../services/songService";

export default function useApi() {
  return {
    songService: new SongApi()
  };
} 