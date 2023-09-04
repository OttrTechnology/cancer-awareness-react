import { useGameContext } from "hooks/useGameContext";

export const GameOver = () => {
  const { explanation, currentScore, highScore } = useGameContext();
  return (
    <div>
      <h1>GameOver</h1>
      <p>{explanation}</p>
      <h1>Curent Score: {currentScore}</h1>
      <h1>High Score: {highScore}</h1>
    </div>
  );
};
