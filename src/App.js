import React, { useState } from "react"
import MainScreen from "./MainScreen"
import SplashScreen from "./SplashScreen"

function App() {
  const [currentAccount, setCurrentAccount] = useState()
  const [enteredApp, setEnteredApp] = useState(false)
  const [word, setWord] = useState("")
  const [zindex, setZindex] = useState({zIndex: '-1'})

  return (
    <div className='app-container'>
      {word !== "hidden" ? (
        <SplashScreen
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
          setEnteredApp={setEnteredApp}
          word={word}
          setWord={setWord}
          enteredApp={enteredApp}
          setZindex={setZindex}
        />
      ) : (
        <div>
          <SplashScreen
            currentAccount={currentAccount}
            setCurrentAccount={setCurrentAccount}
            setEnteredApp={setEnteredApp}
            word={word}
            setWord={setWord}
            enteredApp={enteredApp}
            setZindex={setZindex}
          />
          <MainScreen
            currentAccount={currentAccount}
            setCurrentAccount={setCurrentAccount}
            enteredApp={enteredApp}
            zindex={zindex}
          />
        </div>
      )}
    </div>
  )
}

export default App
