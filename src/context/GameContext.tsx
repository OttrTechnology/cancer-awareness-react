import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import data from "screens/Quiz/cancer-findings-data.json";

const TOTAL_LIVES = 3;

interface IQuiz {
  fact: boolean;
  claim: string;
  explanation: string;
  imgSrc: string;
  source: string;
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

interface GameContextProps {
  activeScreen: LocationType;
  setActiveScreen: (navigateData: CustomNavigationSetter) => void;

  activeQuizIndex: QuizScreenType;
  currentQuestion: IQuiz;
  nextQuestion?: IQuiz;

  totalLives: number;
  remainingLives: number;
  currentScore: number;
  highScore: number;
  userAnswer: boolean;

  handleAnswer: (newAnswer: boolean) => () => void;
  handleNext: () => void;
  handlePlayAgain: () => void;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameContextProvider = (props: { children: React.ReactNode }) => {
  const [shuffledData, setShuffledData] = useState<IQuiz[]>([]);

  const [activeScreen, activeScreenSetter] = useState<LocationType>("LANDING");
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
      default:
        activeScreenSetter(navigateData.location);
        break;
    }

    setTimeout(() => {
      activeScreenSetter(navigateData.location);
    }, (navigateData.duration ?? 0) * 1000);
  };

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const currentQuestion = shuffledData[activeQuestionIndex];

  const [activeQuizIndex, setActiveQuizIndex] =
    useState<QuizScreenType>("QUESTION");

  const [userAnswer, setUserAnswer] = useState(true);

  const [currentScore, setCurrentScore] = useState(0);

  const [highScore, setHighScore] = useLocalStorage("highScore", 0);

  const [remainingLives, setRemainingLives] = useState(TOTAL_LIVES);

  const shuffle = (array: IQuiz[]) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  useEffect(() => {
    const shuffledArray = shuffle(data);
    setShuffledData(shuffledArray);
  }, []);

  const handleAnswer = (newAnswer: boolean) => () => {
    let index = activeQuizIndex;

    if (index === "RESULT") index = "QUESTION";
    else index = "RESULT";

    if (newAnswer !== currentQuestion.fact) {
      setRemainingLives((prevLife) => prevLife - 1);
    } else {
      setCurrentScore((prevScore) => prevScore + 1);
    }

    setActiveQuizIndex(index);
    setUserAnswer(newAnswer);
  };

  const handleNext = () => {
    let index = activeQuizIndex;

    if (index === "RESULT") index = "QUESTION";
    else index = "RESULT";

    if (currentScore > highScore) setHighScore(currentScore);

    if (remainingLives === 0 || activeQuestionIndex === data.length - 1) {
      setActiveScreen({
        location: "GAME_OVER",
        transition: "TRANSITION_FROM_QUIZ",
        duration: 1,
      });
    } else {
      setActiveQuestionIndex((prev) => prev + 1);
      setActiveQuizIndex(index);
    }
  };

  const handlePlayAgain = () => {
    setShuffledData(shuffle(data));

    setRemainingLives(TOTAL_LIVES);
    setCurrentScore(0);

    setActiveQuestionIndex(0);

    setActiveQuizIndex("QUESTION");
    setActiveScreen({
      location: "QUIZ",
      transition: "TRANSITION_FROM_GAME_OVER",
    });
  };

  const value: GameContextProps = {
    activeScreen,
    setActiveScreen,

    activeQuizIndex,
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
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};
