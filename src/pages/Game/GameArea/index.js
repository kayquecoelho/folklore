import { useState, useRef, useEffect } from "react";

import useSongContext from "../../../hooks/useSongContext";
import useGameContext from "../../../hooks/useGameContext";

import { BackwardButton, Container, FocusWarning, ForwardButton, LyricsBox, Message } from "./style";
import Line from "../../../components/LineOfSong";
import Score from "../../../components/Score";
import EndGameModal from "../../../components/EndGameModal";
import VideoPlayer from "../../../components/VideoPlayer";

export default function GameArea() {
  const { encryptedSongData } = useSongContext();
  const {
    input,
    cursorPosition,
    showFocusModal,
    setShowFocusModal,
    setHighlight,
  } = useGameContext();

  const player = useRef(null);

  const [currentLine, setCurrentLine] = useState(-1);
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

  useEffect(() => {
    setInterval(() => setHighlight(prevHighlight => !prevHighlight), 400);
    //eslint-disable-next-line
  }, []);

  function getFocusBack() {
    input.current.focus({ preventScroll: true });
    setShowFocusModal(false);
  }

  function getBackToStart() {
    if (currentLine === -1) {
      return player.current.seekTo(0);
    }

    const startTime = encryptedSongData.lyrics[currentLine].startTime;

    player.current.seekTo(startTime);
    setPaused(false)
    getFocusBack();
  }

  return (
    <Container>
      <Score />

      <VideoPlayer
        player={player}
        currentLine={currentLine}
        setCurrentLine={setCurrentLine}
        paused={paused}
        setPaused={setPaused}
        setEndedGame={setEndedGame}
      />

      <LyricsBox>
        {encryptedSongData.lyrics.map((line, index) => (
          <Line {...line} key={line.part} position={(index - currentLine) * 40} />
        ))}
        <FocusWarning onClick={getFocusBack} show={showFocusModal}>
          <Message>Press here to continue</Message>
        </FocusWarning>

        <BackwardButton onClick={getBackToStart} />
        <ForwardButton />
      </LyricsBox>

      <EndGameModal show={endedGame} setEndedGame={setEndedGame} />
    </Container>
  );
}
