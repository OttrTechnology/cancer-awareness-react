import { Header } from "./components/Header";
// import { Question } from "./Question";
import { Result } from "./Result";
import { GameActions } from "./GameActions";
import styles from "./Quiz.module.scss";

export const Quiz = () => {
  return (
    <div className={styles.quizScreen}>
      <Header />
      {/* <Question /> */}
      <Result />
      <GameActions />
    </div>
  );
};
