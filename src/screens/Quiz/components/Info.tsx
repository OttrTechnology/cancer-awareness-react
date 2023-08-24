import { Lives } from "./Lives";
import { Score } from "./Score";

export const Info = () => {
  return (
    <div className="flex justify-between items-center mt-14 mx-16">
      <Lives />
      <Score />
    </div>
  );
};
