import ReactPlayer from "react-player/lazy";
import useGameContext from "../hooks/useGameContext";
import useSongContext from "../hooks/useSongContext";

export default function VideoPlayer({
  player,
  setCurrentLine,
  currentLine,
  paused,
  setPaused,
  setEndedGame,
}) {
  const { encryptedSongData } = useSongContext();
  const { cursorPosition, input } = useGameContext();
  
  function handlePlayerProgress(progress) {
    const current = encryptedSongData.lyrics.findIndex(
      (line) =>
      line.endTime >= progress.playedSeconds &&
      line.startTime <= progress.playedSeconds
      );

    if (current > cursorPosition.lineIndex) {
      return setPaused(true);
    }

    if (current === currentLine || current === -1) return;
    setCurrentLine(current);
  }

  function handleOnPlay() {
    input.current.focus({ preventScroll: true });
    setPaused(false);
  }

  return (
    <ReactPlayer
      ref={player}
      url={encryptedSongData.youtubeLink}
      width="100%"
      height="300px"
      controls={true}
      onProgress={handlePlayerProgress}
      onEnded={() => setEndedGame(true)}
      progressInterval={400}
      playing={!paused}
      onPlay={handleOnPlay}
      config={{
        youtube: {
          playerVars: {
            disablekb: 1,
            fs: 0,
          },
        },
      }}
    />
  );
}
