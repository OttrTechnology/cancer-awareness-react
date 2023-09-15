import { useEffect, useRef } from "react";
import gsap from "gsap";
import congratulations from "assets/resultEmoji/happy.svg";
import styles from "./index.module.scss";
import clsx from "clsx";

export const CongratulationsAnimation = () => {
  const gameOverRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gameOverRef.current,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 1, delay: 2 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className={styles.wrapper} ref={gameOverRef}>
        <img className={styles.img} src={congratulations} />
        <div className={clsx("ca-heading--one", styles.congratulationsText)}>
          Congratulations
        </div>
      </div>
    </>
  );
};
