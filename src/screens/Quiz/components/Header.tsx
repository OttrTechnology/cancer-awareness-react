import { Lives } from "./Lives";
import { Score } from "./Score";

export const Header = () => {
  return (
    <div className="ca-header-container ca-mt--56 mx-auto">
      <div className="flex justify-between items-center  ">
        <Lives />
        <Score />
      </div>
    </div>
  );
};
