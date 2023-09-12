import { Lives } from "./Lives";
import { Score } from "./Score";

export const Header = () => {
  return (
    <div className="flex justify-between items-center ca-mt--56 mx-auto ca-header-container">
      <Lives />
      <Score />
    </div>
  );
};
