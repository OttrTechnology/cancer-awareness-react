import { Lives } from "./Lives";
import { Score } from "./Score";
import styles from "./Header.module.scss";

export const Info = () => {
  return (
    <div className={styles.ca_header}>
      <Lives />
      <Score />
    </div>
  );
};
