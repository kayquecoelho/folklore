import styled from "styled-components";
import useGameContext from "../hooks/useGameContext";

export default function EndGameModal({ display, setEndedGame }) {
  const { setPointsSystem } = useGameContext();

  function restartGame() {
    setPointsSystem({
      points: 0,
      streak: 0,
      weight: {
        value: 1,
        minValue: 0,
        maxValue: 12,
      },
    });
    setEndedGame(false);
  }

  function endGame() {

  }

  return (
    <Container display={display}>
      <span>Game completed!</span>
      <Button onClick={restartGame}>Play again</Button>
      <Button onClick={endGame}>End Game</Button>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);

  display: ${(props) => (props.display ? "flex" : "none")};

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
  color: #FFF;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #44ace7;
    transform: scale(1.02);
  }
`;
