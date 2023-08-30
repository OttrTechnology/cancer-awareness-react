import { Lives } from "./Lives";
import { Score } from "./Score";

export const Header = () => {
  return (
    <div className="flex justify-between items-center mt-14 mx-16">
      <Lives />
      <Score />
    </div>
  );
};
