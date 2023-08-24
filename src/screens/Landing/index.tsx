import { Button } from "../../components";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";

export const Landing = () => {
  return (
    <>
      <h1 className="ca-heading--one">Hello Cancer Culture</h1>

      <div className="flex">
        <img src={reactLogo} alt="Logo of React" />
        <img src={viteLogo} alt="Logo of Vite" />
      </div>

      <Button label="Test" />
    </>
  );
};
