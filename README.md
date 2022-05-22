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