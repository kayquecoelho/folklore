import { useState, useRef } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import styled from "styled-components";
import ReactPlayer from "react-player/lazy";

import useSongContext from "../../../hooks/useSongContext";
import useGameContext from "../../../hooks/useGameContext";
import Line from "./Lyrics";


export default function GameArea() {
  const [readyToStart, setReadyToStart] = useState(false);
  const { encryptedSongData } = useSongContext();
  const [currentLine, setCurrentLine] = useState(0);
  const { input, cursorPosition } = useGameContext();
  const lyricsBox = useRef(null);

  function handleProgress(progress) {
    const current = encryptedSongData.lyrics.findIndex(
      (line) => line.endTime >= progress.playedSeconds
    );
    if (current > cursorPosition.lineIndex) console.log("deveria parar")

    if (current === currentLine) return;
    if (current === -1)
      return setCurrentLine(encryptedSongData.lyrics.length - 1);

    setCurrentLine(current);
    lyricsBox.current.scrollTo({
      top: currentLine === 0 ? 0 : 40 * (currentLine + 1),
      left: 0,
      behavior: "smooth",
    });
  }

  if (!readyToStart) return <ConfirmModal setReadyToStart={setReadyToStart} />;

  return (
    <Container>
      <ReactPlayer
        url={encryptedSongData.youtubeLink}
        width="100%"
        height="300px"
        controls={true}
        onProgress={handleProgress}
        progressInterval={400}
        onPlay={() => input.current.focus()}
      />
      <LyricsBox ref={lyricsBox}>
        {encryptedSongData.lyrics.map((line) => (
          <Line {...line} key={line.part} />
        ))}
      </LyricsBox>
    </Container>
  );
}

function ConfirmModal({ setReadyToStart }) {
  const { encryptedSongData } = useSongContext();
  const { setValidLines, setCursorPosition } = useGameContext();
  const linesToEncrypt = encryptedSongData.lyrics.map((line, index) => {
    if (line.text.toEncrypt.length > 0) {
      return index;
    }
    return false;
  });

  const validLines = linesToEncrypt.filter((line) => line !== false);
  const lineIndex = validLines[0];
  const wordIndex = Number(encryptedSongData.lyrics[lineIndex].text.toEncrypt[0]);

  function startGame() {
    setValidLines(validLines);
    setCursorPosition({
      lineIndex,
      wordIndex,
      letterIndex: 0,
    });
    setReadyToStart(true);
  }

  return (
    <Container>
      <Level>Chosen Level</Level>
      <FakeGameArea onClick={startGame}>
        {" "}
        Press here to start the game{" "}
      </FakeGameArea>
      <GetBackButton />
    </Container>
  );
}

const LyricsBox = styled.ul`
  width: 100%;
  height: 80px;

  margin-top: 40px;
  overflow: hidden;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1000px;

  margin-top: 30px;
`;

const Level = styled.p`
  font-size: 26px;
  line-height: 26px;
`;

const FakeGameArea = styled.div`
  width: 100%;
  height: 400px;

  margin-top: 20px;
  background-color: #161d2f;
  border-radius: 5px;
  font-size: 30px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const GetBackButton = styled(BsFillArrowLeftSquareFill)`
  margin-top: 20px;
  font-size: 40px;
  cursor: pointer;

  color: #defead;
`;
