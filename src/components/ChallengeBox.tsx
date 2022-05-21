import styles from "../styles/components/ChallengeBox.module.css";
import {FaLevelUpAlt} from "react-icons/fa";
import {useContext} from "react";
import {ChallengesContext} from "../contexts/ChallengesContext";
import Image from "next/image";
export function ChallengeBox() {
  const {activeChallenge, resetChallenge} = useContext(ChallengesContext);

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <Image
              src={`/icons/${activeChallenge.type}.png`}
              alt={`Ilustracao de um exercicio para o/os ${activeChallenge.type}.`}
              width='100%'
              height='100%'
            />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type='button'
              onClick={resetChallenge}
              className={styles.challengeFailedButton}
            >
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
