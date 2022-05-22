import { useState, useRef, useEffect } from "react";

import useSongContext from "../../../hooks/useSongContext";
import useGameContext from "../../../hooks/useGameContext";

import { Container, FocusWarning, LyricsBox, Message } from "./style";
import Line from "../../../components/LineOfSong";
import Score from "../../../components/Score";
import EndGameModal from "../../../components/EndGameModal";
import VideoPlayer from "../../../components/VideoPlayer";

export default function GameArea() {
  const { encryptedSongData } = useSongContext();
  const { input, cursorPosition, showFocusModal, setShowFocusModal } = useGameContext();

  const lyricsBox = useRef(null);
  const player = useRef(null);

  const [currentLine, setCurrentLine] = useState(0);
  const [paused, setPaused] = useState(false);
  const [endedGame, setEndedGame] = useState(false);

  useEffect(() => {
    input.current?.focus({ preventScroll: true });

    if (paused && cursorPosition.lineIndex > currentLine) {
      setPaused(false);
      const line = encryptedSongData.lyrics[currentLine];
      player.current.seekTo(line.startTime);
    }

    //eslint-disable-next-line
  }, [cursorPosition]);

  function getFocusBack() {
    input.current.focus({ preventScroll: true });
    setShowFocusModal(false);
  }

  return (
    <Container>
      <Score />

      <VideoPlayer
        player={player}
        lyricsBox={lyricsBox}
        currentLine={currentLine}
        setCurrentLine={setCurrentLine}
        paused={paused}
        setPaused={setPaused}
        setEndedGame={setEndedGame}
      />

      <LyricsBox ref={lyricsBox}>
        {encryptedSongData.lyrics.map((line) => (
          <Line {...line} key={line.part} />
        ))}
        <FocusWarning onClick={getFocusBack} show={showFocusModal}>
          <Message>Press here to continue</Message>
        </FocusWarning>
      </LyricsBox>

      <EndGameModal show={endedGame} setEndedGame={setEndedGame} />
    </Container>
  );
}
