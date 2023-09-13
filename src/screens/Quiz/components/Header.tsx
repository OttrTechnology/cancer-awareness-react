import { Lives } from "./Lives";
import { Score } from "./Score";

export const Header = () => {
  return (
    <div className=" ca-header-container flex justify-between items-center  ca-mt--40 md:ca-mt--56  ">
      <Lives />
      <Score />
    </div>
  );
};
