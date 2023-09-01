// TODO: implement useGameContext hook that also throws error if not used within provider
import { useContext } from "react";
import { GameContext } from "context";

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }

  return context;
};
