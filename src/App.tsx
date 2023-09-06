import { Landing, Quiz, GameOver } from "screens";
import { useGameContext } from "hooks";

const App = () => {
  const { activeScreen } = useGameContext();
  return (
    <div className={activeScreen == 2 ? "ca-gameOver" : ""}>
      {activeScreen === 0 ? (
        <Landing />
      ) : activeScreen === 1 ? (
        <Quiz />
      ) : (
        <GameOver />
      )}
    </div>
  );
};

export default App;
