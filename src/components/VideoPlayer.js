import ReactPlayer from "react-player/lazy";
import useGameContext from "../hooks/useGameContext";
import useSongContext from "../hooks/useSongContext";

export default function VideoPlayer({
  player,
  lyricsBox,
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
      (line) => line.endTime >= progress.playedSeconds
    );

    if (current > cursorPosition.lineIndex) {
      return setPaused(true);
    }

    if (current === currentLine || current === -1) return;

    setCurrentLine(current);
    lyricsBox.current.scrollTo({
      top: currentLine === 0 ? 0 : 40 * (currentLine + 1),
      left: 0,
      behavior: "smooth",
    });
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
      onPlay={() => input.current.focus({ preventScroll: true })}
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