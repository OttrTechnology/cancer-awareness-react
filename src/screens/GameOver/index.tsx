import { useGameContext } from "hooks/useGameContext";

export const GameOver = () => {
  const { explanation } = useGameContext();
  return (
    <div>
      <h1>GameOver</h1>
      <p>{explanation}</p>
    </div>
  );
};
