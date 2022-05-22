import api from "./api";

export default class SongApi {
  getSongById(songId) {
    return api.get(`/songs/${songId}`)
  }
  
  getAllSongs() {
    return api.get("/songs");
  }
}