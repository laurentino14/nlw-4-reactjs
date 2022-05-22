import styles from "../styles/components/Profile.module.css";
import {ImArrowUp} from "react-icons/im";
import {ChallengesContext} from "../contexts/ChallengesContext";
import {useContext} from "react";
export function Profile() {
  const {level} = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src='https://github.com/laurentino14.png' alt='Lucas Laurentino' />
      <div>
        <strong>Lucas Laurentino</strong>
        <p className={styles.bs}>
          <ImArrowUp className={styles.icon} />
          Level {level}
        </p>
      </div>
    </div>
  );
}
