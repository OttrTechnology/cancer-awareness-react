import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { gsap, Cubic } from "gsap";

import styles from "./LoadingScreen.module.scss";
import CANCER_AWARENESS_MONTHS from "./cancer-month-ribbons.json";

interface Props {
  preloadedImagePercentage: number;
  loadingTimerCountdown: number;
}

export const LoadingScreen = ({
  preloadedImagePercentage,
  loadingTimerCountdown,
}: Props) => {
  const [currentMonth] = useState(
    CANCER_AWARENESS_MONTHS.find(
      ({ month }) => month === dayjs().format("MMMM")
    ) || CANCER_AWARENESS_MONTHS[11]
  );

  const [randomCurrentMonthRibbon, setRandomCurrentMonthRibbon] = useState(
    currentMonth.ribbons[
      Math.floor(Math.random() * currentMonth.ribbons.length)
    ]
  );

  useEffect(() => {
    setRandomCurrentMonthRibbon(
      currentMonth.ribbons[
        Math.floor(Math.random() * currentMonth.ribbons.length)
      ]
    );
  }, [currentMonth]);

  const landingRef = useRef(null);
  const loadingImageRef = useRef(null);
  const loadingTextRef = useRef(null);
  const loadingContainerRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        loadingImageRef.current,
        { y: 60 },
        { y: 0, delay: 0.2, duration: 0.6, ease: Cubic.easeOut }
      )
        .fromTo(
          loadingImageRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3 },
          "<"
        )
        .fromTo(
          loadingTextRef.current,
          { y: 30 },
          { y: 0, duration: 0.6, ease: Cubic.easeOut },
          "<0.1"
        )
        .fromTo(
          loadingTextRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: Cubic.easeOut },
          "<"
        );
    });

    return () => ctx.kill();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(landingRef.current, { width: `${preloadedImagePercentage}%` });
    });

    return () => ctx.kill();
  }, [preloadedImagePercentage]);

  /**
   * Fading out Preloader
   */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preloadedImagePercentage === 100 && loadingTimerCountdown === 0) {
        const tl = gsap.timeline();

        tl.to(loadingImageRef.current, {
          y: 30,
          autoAlpha: 0,
          duration: 0.3,
          ease: Cubic.easeOut,
        })
          .to(
            loadingTextRef.current,
            { y: 30, autoAlpha: 0, duration: 0.3, ease: Cubic.easeOut },
            "<"
          )
          .to(progressBarRef.current, { autoAlpha: 0, duration: 0.3 }, "<")
          .to(loadingContainerRef.current, { autoAlpha: 0, duration: 0.5 });
      }
    });

    return () => {
      ctx.kill();
    };
  }, [loadingTimerCountdown, preloadedImagePercentage]);

  return (
    <div className={styles.loadingContainer} ref={loadingContainerRef}>
      <div className={styles.wrapper}>
        <div className={styles.img} ref={loadingImageRef}>
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="160"
              height="160"
              rx="80"
              fill={randomCurrentMonthRibbon.backgroundColor ?? "#FFF"}
            />
            <g clipPath="url(#clip0_1682_464)">
              <path
                d="M108.817 111.582L100.402 120.14C94.1425 113.985 87.0144 106.293 80.5552 98.3613L87.9963 88.4613C94.5884 96.7921 102.203 105.082 108.817 111.582ZM72.2909 59.9233L61.4777 52.0792C60.215 55.6486 59.8741 59.8976 60.8517 64.764C62.4445 72.7003 68.3378 81.9678 73.0477 88.5642L80.4051 78.1047C77.0994 73.1505 72.591 65.883 72.2909 59.9233Z"
                fill={
                  randomCurrentMonthRibbon.path1 ||
                  randomCurrentMonthRibbon.path1
                }
              />
              <path
                d="M80.4073 39V50.9902C78.0748 51.0588 75.7317 52.0535 74.3018 53.6292C72.7261 55.3635 72.173 57.5394 72.2909 59.9233L61.4777 52.0792C64.4318 43.7228 72.4367 39.0965 80.4073 39Z"
                fill={
                  randomCurrentMonthRibbon.path2 ||
                  randomCurrentMonthRibbon.path1
                }
              />
              <path
                d="M87.6596 60.4142C88.3264 53.4426 84.3818 50.8701 80.4072 50.9902V39C86.4806 38.9271 92.5325 41.4868 96.3141 47.0327C97.4289 48.6684 98.2456 50.3835 98.8052 52.1607L87.6596 60.4121V60.4142Z"
                fill={
                  randomCurrentMonthRibbon.path3 ||
                  randomCurrentMonthRibbon.path1
                }
              />
              <path
                d="M87.9962 88.4614L80.5552 98.3613C80.5059 98.4214 80.4566 98.4793 80.4072 98.5393C74.3704 105.796 67.1415 112.933 59.1559 118.864L52 109.23C59.9534 103.322 67.1865 95.9753 73.0476 88.5643L80.4051 78.1047C80.4051 78.1047 80.4072 78.1026 80.4072 78.1005C83.5715 72.9661 85.741 68.3334 86.785 64.7576C87.2545 63.1497 87.5375 61.707 87.6597 60.4143L98.8052 52.1628C102.452 63.7135 95.2186 77.7939 87.9962 88.4614Z"
                fill={
                  randomCurrentMonthRibbon.path4 ||
                  randomCurrentMonthRibbon.path1
                }
              />
            </g>
            <defs>
              <clipPath id="clip0_1682_464">
                <rect
                  width="56.8167"
                  height="81.14"
                  fill="white"
                  transform="translate(52 39)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className="ca-heading--three text-center" ref={loadingTextRef}>
          {randomCurrentMonthRibbon.message}
        </div>

        <div className={styles.progressBarContainer} ref={progressBarRef}>
          <div
            ref={landingRef}
            className={styles.progressBar}
            style={{
              backgroundColor:
                randomCurrentMonthRibbon.progressBarColor ??
                randomCurrentMonthRibbon.path1,
            }}
          />
        </div>
      </div>
    </div>
  );
};
