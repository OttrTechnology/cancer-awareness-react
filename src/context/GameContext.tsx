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

enum CurrentScreen {
  LANDING = "LANDING",
  QUIZ = "QUIZ",
  GAME_OVER = "GAME_OVER",
}

enum QuizScreen {
  QUESTION = "QUESTION",
  RESULT = "RESULT",
}

export type CurrentScreenType = keyof typeof CurrentScreen;

export type QuizScreenType = keyof typeof QuizScreen;

interface GameContextProps {
  currentQuestion: IQuiz;
  currentScore: number;
  highScore: number;
  activeQuizIndex: QuizScreenType;
  activeScreen: CurrentScreenType;
  totalLives: number;
  remainingLives: number;
  setActiveScreen: React.Dispatch<
    React.SetStateAction<"LANDING" | "QUIZ" | "GAME_OVER">
  >;
  userAnswer: boolean;

  handleNext: (currentScore: number) => void;
  handlePlayAgain: () => void;
  handleAnswer: (newAnswer: boolean) => () => void;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameContextProvider = (props: { children: React.ReactNode }) => {
  const [shuffledData, setShuffledData] = useState<IQuiz[]>([]);

  const [activeScreen, setActiveScreen] =
    useState<CurrentScreenType>("LANDING");

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const currentQuestion = shuffledData[activeQuestionIndex];

  const [userAnswer, setUserAnswer] = useState(true);

  const [activeQuizIndex, setActiveQuizIndex] =
    useState<QuizScreenType>("QUESTION");

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
      setRemainingLives((prevLive) => prevLive - 1);
    } else {
      setCurrentScore((prevScore) => prevScore + 1);
    }

    setActiveQuizIndex(index);
    setUserAnswer(newAnswer);
  };

  const handleNext = (currentScore: number) => {
    let index = activeQuizIndex;

    if (index === "RESULT") index = "QUESTION";
    else index = "RESULT";

    if (currentScore > highScore) setHighScore(currentScore);

    if (remainingLives === 0) {
      setActiveScreen(CurrentScreen.GAME_OVER);
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
    setActiveScreen(CurrentScreen.QUIZ);
  };

  const value: GameContextProps = {
    currentScore,
    highScore,
    activeQuizIndex,
    totalLives: TOTAL_LIVES,
    remainingLives,
    handleAnswer,
    handleNext,
    handlePlayAgain,
    activeScreen,
    currentQuestion,
    setActiveScreen,
    userAnswer,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};
