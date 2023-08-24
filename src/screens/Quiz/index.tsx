import { Info } from "./components/Info";
import { Question } from "./Question";
// import { Result } from "./Result";

export const Quiz = () => {
  return (
    <>
      <Info />
      <div className="flex justify-center">
        <Question />
        {/* <Result /> */}
      </div>
    </>
  );
};
