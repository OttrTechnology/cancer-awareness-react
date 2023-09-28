import { Lives } from "./Lives";
import { Score } from "./Score";

export const Header = () => {
  return (
    <div className="ca-header-container m-auto flex justify-between items-end">
      <Lives />
      <Score />
    </div>
  );
};
