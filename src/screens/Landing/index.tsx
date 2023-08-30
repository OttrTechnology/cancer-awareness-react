import { Button } from "components";
import Smile from "assets/resultEmoji/right.png";

export const Landing = () => {
  return (
    <>
      <h1 className="ca-heading--one">Hello Cancer Culture</h1>

      <div className="flex">
        <img src={Smile} alt="Logo of React" />
      </div>

      <Button label="Test" />
    </>
  );
};
