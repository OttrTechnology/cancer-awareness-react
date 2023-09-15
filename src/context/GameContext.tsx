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
  activeScreen: CurrentScreenType;
  setActiveScreen: React.Dispatch<
    React.SetStateAction<"LANDING" | "QUIZ" | "GAME_OVER">
  >;

  activeQuizIndex: QuizScreenType;
  currentQuestion: IQuiz;

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

  const [activeScreen, setActiveScreen] =
    useState<CurrentScreenType>("LANDING");

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
    activeScreen,
    setActiveScreen,

    activeQuizIndex,
    currentQuestion,

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
