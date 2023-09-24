import { createContext, useCallback, useEffect, useState } from "react";
import { useClipboard, useLocalStorageAvailable, useStorage } from "hooks";
import data from "./cancer-findings-data.json";

const TOTAL_LIVES = 3;

const SHARE_DATA = {
  title: "Cancer Insights Challenge",
  url: import.meta.env.VITE_BASE_URL,
};

interface IQuiz {
  fact: boolean;
  claim: string;
  explanation: string;
  imgSrc: string;
  source: string;
  scoreValue: number;
}

enum Screens {
  LANDING = "LANDING",
  QUIZ = "QUIZ",
  GAME_OVER = "GAME_OVER",
}
export type ScreensType = keyof typeof Screens;

enum Location {
  LANDING = "LANDING",
  TRANSITIONING_FROM_LANDING = "TRANSITIONING_FROM_LANDING",
  QUIZ = "QUIZ",
  TRANSITIONING_FROM_QUIZ = "TRANSITIONING_FROM_QUIZ",
  GAME_OVER = "GAME_OVER",
  TRANSITIONING_FROM_GAME_OVER = "TRANSITIONING_FROM_GAME_OVER",
}
export type LocationType = keyof typeof Location;

enum Transitions {
  TRANSITION_FROM_LANDING = "TRANSITION_FROM_LANDING",
  TRANSITION_FROM_QUIZ = "TRANSITION_FROM_QUIZ",
  TRANSITION_FROM_GAME_OVER = "TRANSITION_FROM_GAME_OVER",
}
export type TransitionsType = keyof typeof Transitions;

enum QuizScreen {
  QUESTION = "QUESTION",
  RESULT = "RESULT",
}
export type QuizScreenType = keyof typeof QuizScreen;

interface CustomNavigation {
  location: LocationType;
  transition?: TransitionsType;
}

interface CustomNavigationSetter extends CustomNavigation {
  location: ScreensType;
  duration?: number;
}

type SharePlatforms = "Facebook" | "Twitter" | "LinkedIn";
interface GameContextProps {
  activeScreen: LocationType;
  setActiveScreen: (navigateData: CustomNavigationSetter) => void;
  activeQuizScreen: QuizScreenType;

  currentQuestion: IQuiz;
  nextQuestion?: IQuiz;

  totalLives: number;
  remainingLives: number;
  currentScore: number;
  highScore: number;
  userAnswer: boolean;

  shareSupported: boolean;
  clipboardSupported: boolean;
  copied: boolean;

  handleAnswer: (newAnswer: boolean) => () => void;
  handleNext: () => void;
  handlePlayAgain: () => void;
  handleCopyLink: () => void;
  registerShareEvent: (platform: SharePlatforms) => () => void;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameContextProvider = (props: { children: React.ReactNode }) => {
  const localStorageAvailable = useLocalStorageAvailable();

  const [questionWeights, setQuestionWeights] = useStorage<number[]>(
    "q-weights",
    Array(data.length).fill(1) as number[]
  );

  const [shuffledData, setShuffledData] = useState<IQuiz[]>([]);

  const [activeScreen, activeScreenSetter] = useState<LocationType>("LANDING");

  /**
   * Sets transition state before making the actual navigation according to a given duration
   */
  const setActiveScreen = (navigateData: CustomNavigationSetter) => {
    switch (navigateData.transition) {
      case "TRANSITION_FROM_LANDING":
        activeScreenSetter("TRANSITIONING_FROM_LANDING");
        break;
      case "TRANSITION_FROM_QUIZ":
        activeScreenSetter("TRANSITIONING_FROM_QUIZ");
        break;
      case "TRANSITION_FROM_GAME_OVER":
        activeScreenSetter("TRANSITIONING_FROM_GAME_OVER");
        break;
    }

    setTimeout(() => {
      activeScreenSetter(navigateData.location);
    }, (navigateData.duration ?? 0) * 1000);
  };

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const currentQuestion = shuffledData[activeQuestionIndex];

  const [activeQuizScreen, setActiveQuizScreen] =
    useState<QuizScreenType>("QUESTION");

  const [remainingLives, setRemainingLives] = useState(TOTAL_LIVES);

  const [highScore, setHighScore] = useStorage("highScore", 0, {
    secure: true,
  });

  const [currentScore, setCurrentScore] = useState(0);

  const [userAnswer, setUserAnswer] = useState(true);

  /**
   * Increments the weight of a specific question by 1.
   * @description Higher the weight, lower the probability of the question to re-appear
   */
  const incrementQuestionWeight = (): void => {
    if (localStorageAvailable && currentQuestion) {
      const questionIndex = data.findIndex(
        (current) => currentQuestion.imgSrc === current.imgSrc
      );

      setQuestionWeights((prev) => [
        ...prev.slice(0, questionIndex),
        prev[questionIndex] + 1,
        ...prev.slice(questionIndex + 1),
      ]);
    }
  };

  const shuffle = useCallback((array: IQuiz[]) => {
    return array
      .map((value, index) => ({
        sort: Math.random() + questionWeights[index],
        value,
      }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => item.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const shuffledArray = shuffle(data);
    setShuffledData(shuffledArray);
  }, [shuffle]);

  const handleAnswer = (newAnswer: boolean) => () => {
    setUserAnswer(newAnswer);

    incrementQuestionWeight();

    if (newAnswer !== currentQuestion.fact) {
      setRemainingLives((prevLife) => prevLife - 1);
    } else {
      // ? animate score
      setTimeout(() => {
        let scoreValue = currentQuestion.scoreValue;
        while (scoreValue) {
          setTimeout(() => {
            setCurrentScore((prevScore) => prevScore + 1);
          }, scoreValue * 50);
          scoreValue--;
        }
      }, 300); // ? delay animation
    }

    setActiveQuizScreen("RESULT");
  };

  const handleNext = () => {
    if (currentScore > highScore) setHighScore(currentScore);

    if (remainingLives === 0 || activeQuestionIndex === data.length - 1) {
      setActiveScreen({
        location: "GAME_OVER",
        transition: "TRANSITION_FROM_QUIZ",
        duration: 0.6,
      });

      if (
        import.meta.env.PROD &&
        import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS === "true"
      ) {
        // post score event to Google Analytics
        window.gtag("event", "post_score", {
          score: currentScore,
          level: activeQuestionIndex,
        });

        // post different achievements to Google Analytics
        if (activeQuestionIndex === data.length - 1 && remainingLives === 3) {
          window.gtag("event", "unlock_achievement", {
            achievement_id: "0-Deaths",
          });
        } else if (
          activeQuestionIndex === data.length - 1 &&
          remainingLives > 0
        ) {
          window.gtag("event", "unlock_achievement", {
            achievement_id: "Quiz-Whiz",
          });
        } else if (remainingLives === 0 && currentScore === 0) {
          window.gtag("event", "unlock_achievement", {
            achievement_id: "Defeatist-Dabbler",
          });
        } else if (currentScore > 360) {
          window.gtag("event", "unlock_achievement", {
            achievement_id: "Hackerman",
          });
        }
      }
    } else {
      setActiveQuestionIndex((questionNum) => questionNum + 1);
      setActiveQuizScreen("QUESTION");
    }
  };

  const handlePlayAgain = () => {
    setShuffledData(shuffle(data));

    setCurrentScore(0);
    setRemainingLives(TOTAL_LIVES);

    setActiveQuestionIndex(0);

    setActiveQuizScreen("QUESTION");
    setActiveScreen({
      location: "QUIZ",
      transition: "TRANSITION_FROM_GAME_OVER",
    });
  };

  const shareSupported = Boolean(
    "canShare" in navigator && navigator.canShare(SHARE_DATA)
  );

  const { clipboardSupported, copy, copied } = useClipboard();

  const handleCopyLink = () => {
    if (shareSupported) {
      navigator.share(SHARE_DATA).catch((error) => {
        console.error("Error sharing:", error);
      });

      if (
        import.meta.env.PROD &&
        import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS === "true"
      )
        window.gtag("event", "share", { method: "Native Share" });
    } else {
      copy(import.meta.env.VITE_BASE_URL);

      if (
        import.meta.env.PROD &&
        import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS === "true"
      )
        window.gtag("event", "share", { method: "Copy Link" });
    }
  };

  const registerShareEvent = (platform: SharePlatforms) => () => {
    if (
      import.meta.env.PROD &&
      import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS === "true"
    )
      window.gtag("event", "share", { method: platform });
  };

  const value: GameContextProps = {
    activeScreen,
    setActiveScreen,
    activeQuizScreen,

    currentQuestion,
    nextQuestion: shuffledData[activeQuestionIndex + 1],

    totalLives: TOTAL_LIVES,
    remainingLives,
    currentScore,
    highScore,
    userAnswer,

    handleAnswer,
    handleNext,
    handlePlayAgain,

    shareSupported,
    clipboardSupported,
    copied,
    handleCopyLink,
    registerShareEvent,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};
