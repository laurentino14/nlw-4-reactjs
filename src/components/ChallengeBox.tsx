import styles from "../styles/components/ChallengeBox.module.css";
import {FaLevelUpAlt} from "react-icons/fa";
export function ChallengeBox() {
  const hasActiveChallenge = true;

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>
          <main>
            <strong>Novo desafio</strong>
            <p>Levante e faca uma caminhada de 3 minutos.</p>
          </main>
          <footer>
            <button type='button' className={styles.challengeFailedButton}>
              Falhei
            </button>
            <button type='button' className={styles.challengeSucceededButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <FaLevelUpAlt
              style={{
                width: "100%",
                height: "4rem",
                color: "var(--green)",
                marginBottom: "1rem",
              }}
            />
            <span>Avance de level completando desafios</span>
          </p>
        </div>
      )}
    </div>
  );
}
