import styled from "styled-components";
import useGameContext from "../hooks/useGameContext";
import ProgressBar from "./ProgressBar";

export default function Score() {
  const { pointsSystem } = useGameContext();

  return (
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