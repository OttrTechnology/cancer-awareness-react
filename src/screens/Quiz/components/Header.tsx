import { Lives } from "./Lives";
import { Score } from "./Score";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Lives />
      <Score />
    </div>
  );
};
