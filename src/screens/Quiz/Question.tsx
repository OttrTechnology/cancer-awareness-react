// import deodorant from "/questionImg/deodorant.svg";
import styles from "./Question.module.scss";
import { useGameContext } from "hooks/useGameContext";

export const Question = () => {
  const { question, src } = useGameContext();
  const image = `/questionImg/${src}`;

  return (
    <div className="flex justify-center">
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <img className={styles.image} src={image} alt="deodorant" />

          <div className="ca-heading--three">{question}</div>
        </div>
      </div>
    </div>
  );
};
