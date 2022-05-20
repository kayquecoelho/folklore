import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import useGameContext from "../hooks/useGameContext";
import RadialSeparators from "./RadialSeparators";

export default function ProgressBar() {
  const { pointsSystem } = useGameContext();
  console.log(pointsSystem);

  return (
    <CircularProgressbarWithChildren
      value={pointsSystem.streak}
      text={`${pointsSystem.weight.value}x`}
      minValue={pointsSystem.weight.minValue}
      maxValue={pointsSystem.weight.maxValue}
      strokeWidth={10}
      background
      styles={buildStyles({
        backgroundColor: "#224740",
        textColor: " #dcdddd",
        textSize: "30px",
        pathColor: "#fff",
        trailColor: "transparent",
      })}
    >
      <RadialSeparators
        count={12}
        style={{
          background: "#000",
          width: "2px",
          height: `${10}%`,
        }}
      />
    </CircularProgressbarWithChildren>
  );
}
