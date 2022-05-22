# React Contexts

<aside>
💡 Usar quando quiser “ligar”, “conectar” os diferentes componentes da página com informações comuns.

</aside>

## Criar 2 type ou interface

- um para tipar o contexto
- outro para tipar o provider

## Para criar um Context

```jsx
const NomeDoContext = createContext({} as ####);
```

## Criar um Provider

- Pra que serve?
    
    Ele que “provê” os dados para o componente/página que ele envolve
    
- Criando a função para facilitar a construção do Provider e não ficar bagunçado
    
    ```jsx
    interface xxxxProviderProps{
    children = ReactNode;
    }
    
    export function xxxProvider({children}:){
    // Aqui é o lugar de colocar todos os métodos e dados que queremos repassar
    // para outros componentes
    
    // const [level, setLevel] = useState(0);
    
    return (
    <NomeDoContext.Provider value={{level, setLevel}}>
    {children}
    </NomeDoContext.Provider>
    )}
    ```
    

## Para utilizar um Context

```jsx
const {
    level, setLevel
  } = useContext(CountdownContext);
```

```jsx
const {/o que quero pegar do contexto/} = useContext(Context)
```

[NLW#4 - Trilha ReactJS](https://www.notion.so/NLW-4-Trilha-ReactJS-1d05401b693e431fa2d276b6fa540ef7)

![image](https://user-images.githubusercontent.com/83848032/169718063-a2cda5ca-4edc-492e-8840-36b66e43f4cb.png)

# Na Prática - Projeto da Trilha ReactJS - NLW#4

---



**[Abrir Deploy](https://moveit-nlw4-05-22.vercel.app/)**


- ChallengesContexts.tsx  -  `Criação da base do Contexto`
    
    ```tsx
    import {createContext, ReactNode, useEffect, useState} from "react";
    import challenges from "../../challenges.json";
    
    interface Challenge {
      type: "body" | "eyes";
      description: string;
      amount: number;
    }
    interface ChallengesContextsData {
      level: number;
      currentExperience: number;
      challengesCompleted: number;
      experienceToNextLevel: number;
      activeChallenge: Challenge;
      levelUp: () => void;
      startNewChallenge: () => void;
      resetChallenge: () => void;
      completeChallenge: () => void;
    }
    
    export const ChallengesContext = createContext({} as ChallengesContextsData);
    
    interface ChallengesProviderProps {
      children: ReactNode;
    }
    
    export function ChallengesProvider({children}: ChallengesProviderProps) {
      const [level, setLevel] = useState(1);
      const [currentExperience, setCurrentExperience] = useState(30);
      const [challengesCompleted, setChallengesCompleted] = useState(0);
      const [activeChallenge, setActiveChallenge] = useState(null);
    
      const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    
      useEffect(() => {
        Notification.requestPermission();
      }, []);
    
      function levelUp() {
        setLevel(level + 1);
      }
    
      function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
    
        setActiveChallenge(challenge);
    
        new Audio("/notification.mp3").play();
    
        if (Notification.permission === "granted") {
          new Notification("Novo desafio", {
            body: `Valendo ${challenge.amount}`,
          });
        }
      }
    
      function resetChallenge() {
        setActiveChallenge(null);
      }
    
      function completeChallenge() {
        if (!activeChallenge) {
          return;
        }
    
        const {amount} = activeChallenge;
        let finalExperience = currentExperience + amount;
    
        if (finalExperience >= experienceToNextLevel) {
          levelUp();
          finalExperience = finalExperience - experienceToNextLevel;
        }
    
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
      }
    
      return (
        <ChallengesContext.Provider
          value={{
            level,
            levelUp,
            currentExperience,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
          }}
        >
          {children}
        </ChallengesContext.Provider>
      );
    }
    ```
    
- _app.tsx  -  `Utilização do Provider - permite todos os outros componentes que está dentro do _app.tsx ou dentro de outro componente que está dentro de _app.tsx utilizar os dados do contexto`
    
    ```tsx
    import {ChallengesProvider} from "../contexts/ChallengesContext";
    import "../styles/global.css";
    
    function MyApp({Component, pageProps}) {
      return (
        <ChallengesProvider>
          <Component {...pageProps} />
        </ChallengesProvider>
      );
    }
    
    export default MyApp;
    ```
    
- ChallengeBox.tsx  -  `Componente que está rodando dentro do _app.tsx capturando os dados`
    
    ```tsx
    import styles from "../styles/components/ChallengeBox.module.css";
    import {FaLevelUpAlt} from "react-icons/fa";
    import {useContext} from "react";
    import {ChallengesContext} from "../contexts/ChallengesContext";
    import Image from "next/image";
    import {CountdownContext} from "../contexts/CountdownContext";
    export function ChallengeBox() {
      const {activeChallenge, resetChallenge, completeChallenge} =
        useContext(ChallengesContext);
    
      const {resetCountdown} = useContext(CountdownContext);
    
      function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();
      }
    
      function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
      }
    
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
                  onClick={handleChallengeFailed}
                  className={styles.challengeFailedButton}
                >
                  Falhei
                </button>
                <button
                  type='button'
                  onClick={handleChallengeSucceeded}
                  className={styles.challengeSucceededButton}
                >
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
    ```
