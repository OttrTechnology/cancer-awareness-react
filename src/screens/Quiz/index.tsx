import { Info } from "./components/Info";
import { Question } from "./Question";
// import { Result } from "./Result";
import { Button } from "./Button";

export const Quiz = () => {
  return (
    <div className="quiz_screen">
      <Info />

      <Question />
      {/* <Result /> */}
      <Button />
    </div>
  );
};
