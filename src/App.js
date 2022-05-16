import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SongProvider from "./contexts/songContext";
import Game from "./pages/Game/Game";
import GlobalStyle from "./styles/globalStyle";
import ResetStyleCSS from "./styles/reset";

export default function App() {
  return (
    <SongProvider>
      <ResetStyleCSS />
      <GlobalStyle />

      <Router>
        <Header />
        <Routes>
          <Route path="/" />
          <Route path="/login" />
          <Route path="/register" />
          <Route path="/play/:songId" element={<Game />} />
          <Route path="/artists/:artistId" />
        </Routes>
      </Router>
    </SongProvider>
  );
}
