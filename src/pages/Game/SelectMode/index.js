import { useState } from "react";
import { Title, Menu, ModeBox, ModeName, ModeDescription } from "./style";

import getGameModes from "../../../utils/gameModes";
import useGameContext from "../../../hooks/useGameContext";
import ConfirmModal from "../../../components/ConfirmModal";

export default function SelectMode({ songData }) {
  const gameModes = getGameModes();
  const [statusOfPage, setStatusOfPage] = useState("select");

  if (statusOfPage === "confirm") {
    return <ConfirmModal songData={songData} setStatusOfPage={setStatusOfPage} />
  }

  return (
    <>
      <Title> Select a game mode </Title>
      <Menu>
        {gameModes.map((mode) => (
          <Mode key={mode.name} {...mode} setStatusOfPage={setStatusOfPage}/>
        ))}
      </Menu>
    </>
  );
}

function Mode({ name, percentage, bgColor, setStatusOfPage }) {
  const { setLevel } = useGameContext();

  function chooseMode() {
    setLevel({ name, percentage });
    setStatusOfPage("confirm");
  }

  return (
    <ModeBox bgColor={bgColor} onClick={chooseMode}>
      <ModeName>{name}</ModeName>
      <ModeDescription>Fill {percentage}% of the music </ModeDescription>
    </ModeBox>
  );
}
