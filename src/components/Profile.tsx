import styles from "../styles/components/Profile.module.css";
import {ImArrowUp} from "react-icons/im";
export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src='https://github.com/laurentino14.png' alt='Lucas Laurentino' />
      <div>
        <strong>Lucas Laurentino</strong>
        <p className={styles.bs}>
          <ImArrowUp className={styles.icon} />
          Level 1
        </p>
      </div>
    </div>
  );
}
