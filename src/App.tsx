import { Home, Quiz, GameOver } from "screens";
import { useGameContext } from "hooks";

const App = () => {
  const { activeScreen } = useGameContext();
  return (
    <div className={activeScreen === "GAME_OVER" ? "ca-gameOver" : ""}>
      {activeScreen === "LANDING" ? (
        <Home />
      ) : activeScreen === "QUIZ" ? (
        <Quiz />
      ) : (
        <GameOver />
      )}
    </div>
  );
};

export default App;
