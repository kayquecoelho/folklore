import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GameProvider from "./contexts/gameContext";
import SongProvider from "./contexts/songContext";
import Game from "./pages/Game/Game";
import Home from "./pages/Home";
import GlobalStyle from "./styles/globalStyle";
import ResetStyleCSS from "./styles/reset";

export default function App() {
  return (
    <SongProvider>
      <GameProvider>
        <ResetStyleCSS />
        <GlobalStyle />

        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" />
            <Route path="/register" />
            <Route path="/play/:songId" element={<Game />} />
            <Route path="/artists/:artistId" />
          </Routes>
        </Router>
      </GameProvider>
    </SongProvider>
  );
}
