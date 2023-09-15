import { useEffect, useRef } from "react";
import gsap from "gsap";
import congratulations from "assets/resultEmoji/happy.svg";
import styles from "./index.module.scss";
import clsx from "clsx";

export const CongratulationsAnimation = () => {
  const gameOverRef = useRef(null);
  const gameOverEmojiRef = useRef(null);
  const gameOverTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(gameOverRef.current, { autoAlpha: 0, duration: 2.5 });
      gsap.fromTo(
        gameOverEmojiRef.current,
        { y: 150 },
        { y: 0, duration: 0.3, ease: "easeOut" }
      );
      gsap.fromTo(
        gameOverTextRef.current,
        { y: 150 },
        { y: 0, duration: 0.3, ease: "easeOut" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className={styles.wrapper} ref={gameOverRef}>
        <img
          className={styles.img}
          src={congratulations}
          ref={gameOverEmojiRef}
        />
        <div
          className={clsx("ca-heading--one", styles.congratulationsText)}
          ref={gameOverTextRef}
        >
          Congratulations
        </div>
      </div>
    </>
  );
};
