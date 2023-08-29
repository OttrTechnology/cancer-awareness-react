// import no from "../../assets/buttonIcon/no.svg";
// import yes from "../../assets/buttonIcon/yes.svg";
import Next from "../../assets/buttonIcon/next-arrow.svg";
import { Button } from "../../../components/Button";
// import { IconButton } from "../../components/IconButton";

export const GameActions = () => {
  return (
    <div className="flex justify-center mb-24 gap-16">
      <Button label="Next" icon={<img src={Next} />} />
      {/* <IconButton icon={no} />
      <IconButton icon={yes} /> */}
    </div>
  );
};
