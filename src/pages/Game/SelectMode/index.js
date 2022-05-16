import { Title, Menu, ModeBox, ModeName, ModeDescription } from "./style";

import useSongContext from "../../../hooks/useSongContext";
import encryptLyrics from "../../../utils/encryptLyrics";
import getGameModes from "../../../utils/gameModes";

export default function SelectMode({ songData }) {
  const gameModes = getGameModes();

  return (
    <>
      <Title> Select a game mode </Title>
      <Menu>
        {gameModes.map((mode) => (
          <Mode key={mode.name} {...mode} songData={songData} />
        ))}
      </Menu>
    </>
  );
}

function Mode({ name, percentage, bgColor, songData }) {
  const { setEncryptedSongData } = useSongContext();

  function chooseMode() {
    const encryptedLyrics = encryptLyrics(songData, percentage);
    setEncryptedSongData(encryptedLyrics);
  }

  return (
    <ModeBox bgColor={bgColor} onClick={chooseMode}>
      <ModeName>{name}</ModeName>
      <ModeDescription>Fill {percentage}% of the music </ModeDescription>
    </ModeBox>
  );
}