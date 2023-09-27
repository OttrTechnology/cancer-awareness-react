import { Lives } from "./Lives";
import { Score } from "./Score";

export const Header = () => {
  return (
    <div className="ca-header-container m-auto flex justify-between items-center h-20 lg:h-32">
      <Lives />
      <Score />
    </div>
  );
};
