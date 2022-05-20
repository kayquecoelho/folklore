import "react-circular-progressbar/dist/styles.css";
import { useState, useRef, useEffect } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import styled from "styled-components";
import ReactPlayer from "react-player/lazy";

import useSongContext from "../../../hooks/useSongContext";
import useGameContext from "../../../hooks/useGameContext";
import Line from "./Lyrics";
import getValidLines from "../../../utils/getValidLines";
import ProgressBar from "../../../components/ProgressBar";

export default function GameArea() {
  const [readyToStart, setReadyToStart] = useState(false);
  const { encryptedSongData } = useSongContext();
  const [currentLine, setCurrentLine] = useState(0);
  const { input, cursorPosition, pointsSystem } = useGameContext();
  const lyricsBox = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    input.current?.focus({preventScroll: true});
    if(paused && cursorPosition.lineIndex >= currentLine) {
      setPaused(false);
    }
  }, [cursorPosition]);

  function handleProgress(progress) {
    const current = encryptedSongData.lyrics.findIndex(
      (line) => line.endTime >= progress.playedSeconds
    );
    if (current > cursorPosition.lineIndex) {
      setPaused(true)
    };

    if (current === currentLine || current === -1) return;

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
      <ScoreBoard>
        <div className="score">
          <span>Points:</span>
          <span className="points">{pointsSystem.points}</span>
        </div>
        <div className="bonus">
          <span>Bonus: </span>
          <div className="progress-bar">
            <ProgressBar />
          </div>
        </div>
      </ScoreBoard>
      <ReactPlayer
        url={encryptedSongData.youtubeLink}
        width="100%"
        height="300px"
        controls={true}
        onProgress={handleProgress}
        progressInterval={400}
        playing={!paused}
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

  const validLines = getValidLines(encryptedSongData.lyrics);
  const lineIndex = validLines[0];
  const wordIndex = encryptedSongData.lyrics[lineIndex].text.wordsToEncrypt[0];

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
        Press here to start the game
      </FakeGameArea>
      <GetBackButton />
    </Container>
  );
}

const ScoreBoard = styled.div`
  width: 100%;
  height: 60px;
  
  padding: 0 10px;
  border-radius: 10px;
  margin-bottom: 5px;
  background-color: #111725;

  display: flex;
  align-items: center;
  justify-content: space-between;
  
  font-size: 30px;
  line-height: 30px;

  .score {
    display: flex;
    align-items: center;
    gap: 3px;

    .points {
      height: 50px;
      width: 120px;
      border-radius: 5px;
      padding-right: 10px;

      display: flex;
      align-items: center;
      justify-content: flex-end;

      background-color: #224740;
      color: #dcdddd;
      font-family: "Red Hat Text", sans-serif;
      font-size: 40px;
      line-height: 40px;
      font-weight: 700;
      text-align: center;
    }
  }
  .bonus {
    display: flex;
    gap: 5px;
    align-items: center;

    .progress-bar {
      width: 50px;
      height: 50px;
    }
  }
`;

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
