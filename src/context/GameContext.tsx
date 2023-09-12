import { createContext, useEffect, useState } from "react";
import mockData from "screens/Quiz/cancer-findings-data.json";

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
  remainingLives: number;
  answer: boolean;

  handleNext: (currentScore: number) => void;
  handlePlayAgain: () => void;
  handleAnswer: (newAnswer: boolean) => void;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameContextProvider = (props: { children: React.ReactNode }) => {
  const [shuffledData, setShuffledData] = useState<IQuiz[]>([]);

  const [activeScreen, setActiveScreen] = useState<CurrentScreenType>("QUIZ");

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const currentQuestion = shuffledData[activeQuestionIndex];

  const [answer, setAnswer] = useState(true);

  const [activeQuizIndex, setActiveQuizIndex] =
    useState<QuizScreenType>("QUESTION");

  const [currentScore, setCurrentScore] = useState(0);

  const initialHighScore = parseInt(localStorage.getItem("highScore") ?? "0");

  const [highScore, setHighScore] = useState(initialHighScore);

  const [remainingLives, setRemainingLives] = useState(3);

  const shuffle = (array: IQuiz[]) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  useEffect(() => {
    const data = mockData;
    const shuffledArray = shuffle(data);
    setShuffledData(shuffledArray);
  }, []);

  const handleNext = (currentScore: number) => {
    let index = activeQuizIndex;

    if (index === "RESULT") index = "QUESTION";
    else index = "RESULT";

    setActiveQuestionIndex((prev) => prev + 1);
    setActiveQuizIndex(index);

    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem("highScore", currentScore.toString());
    }
    if (remainingLives === 0) {
      setActiveScreen(CurrentScreen.GAME_OVER);
    } else {
      setActiveQuizIndex(index);
    }
  };

  const handlePlayAgain = () => {
    setActiveScreen(CurrentScreen.QUIZ);
    setRemainingLives(3);
    setCurrentScore(0);
    setActiveQuestionIndex(0);
    setActiveQuizIndex("QUESTION");
  };

  const handleAnswer = (newAnswer: boolean) => {
    let index = activeQuizIndex;

    if (index === "RESULT") index = "QUESTION";
    else index = "RESULT";

    if (newAnswer !== currentQuestion.fact) {
      setRemainingLives((prevLive) => prevLive - 1);
    } else {
      setCurrentScore((prevScore) => prevScore + 1);
    }

    setActiveQuizIndex(index);
    setAnswer(newAnswer);
  };

  const value: GameContextProps = {
    currentScore,
    highScore,
    activeQuizIndex,
    remainingLives,
    handleNext,
    handlePlayAgain,
    handleAnswer,
    activeScreen,
    currentQuestion,
    answer,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};
