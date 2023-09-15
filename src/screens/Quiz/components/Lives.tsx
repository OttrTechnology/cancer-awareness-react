import { useGameContext } from "hooks";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Lives.module.scss";

const { life } = styles;

export const Lives = () => {
  const { remainingLives, totalLives } = useGameContext();
  const livesConatinerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (remainingLives === 2) {
        gsap.to(`[data-effect=life-2]`, { fill: "#edcda6", duration: 0.3 });
      } else if (remainingLives === 1) {
        gsap.set(`[data-effect=life-2]`, { fill: "#edcda6" });
        gsap.to(`[data-effect=life-1]`, { fill: "#edcda6", duration: 0.3 });
      } else if (remainingLives === 0) {
        gsap.set(`[data-effect=life-2], [data-effect=life-1]`, {
          fill: "#edcda6",
        });
        gsap.to(`[data-effect=life-0]`, { fill: "#edcda6", duration: 0.3 });
      }
    });

    return () => ctx.revert();
  }, [remainingLives]);

  return (
    <div className="flex items-start" ref={livesConatinerRef}>
      {Array(totalLives)
        .fill(0)
        .map((_, index) => (
          <svg
            className={styles.live}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={index}
          >
            <g id="si:Heart">
              <path
                data-effect={`life-${index}`}
                id="v"
                d="M27.8261 5C24.4203 5 21.4782 6.995 20 9.905C18.5217 6.995 15.5797 5 12.1739 5C7.28984 5 3.33331 9.095 3.33331 14.135C3.33331 19.175 6.3623 23.795 10.2753 27.59C14.1884 31.385 20 35 20 35C20 35 25.6232 31.445 29.7246 27.59C34.1014 23.48 36.6666 19.19 36.6666 14.135C36.6666 9.08 32.7101 5 27.8261 5Z"
                fill={life}
              />
            </g>
          </svg>
        ))}
    </div>
  );
};
