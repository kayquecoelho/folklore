import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useGameContext from "../hooks/useGameContext";
import useSongContext from "../hooks/useSongContext";

export default function EndGameModal() {
  const navigate = useNavigate();
  const { pointsSystem } = useGameContext();
  const { encryptedSongData } = useSongContext();

  function getBackToHome() {
    navigate("/");
    window.location.reload();
  }

  return (
    <Container>
      <span>Game completed!</span>
      <Message>
        Congratulations! You did {pointsSystem.points} points playing the song{" "}
        {encryptedSongData.name}!
      </Message>

      <Button onClick={() => window.location.reload()}>Play again</Button>
      <Button onClick={getBackToHome}>Back to home</Button>
    </Container>
  );
}

const Message = styled.div`
  width: 500px;

  margin-bottom: 30px;
  font-size: 20px;
  color: #3ca725;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;

  flex-direction: column;
  align-items: center;
  gap: 15px;

  font-size: 25px;
  line-height: 25px;
  font-weight: 500;

  span {
    margin-top: 50px;
    margin-bottom: 25px;
  }
`;

const Button = styled.button`
  width: 500px;
  height: 60px;

  padding: 10px;
  border: none;
  border-radius: 2px;

  cursor: pointer;
  background-color: #449dcf;
  font-size: 25px;
  line-height: 25px;
  font-weight: 500;
  color: #fff;
  transition: all 0.2s ease;

  &:hover {
    background-color: #44ace7;
    transform: scale(1.02);
  }
`;
