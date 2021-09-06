import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import "./App.css"

export default function SplashScreen({ currentAccount, setCurrentAccount, setEnteredApp, word, setWord, enteredApp, setZindex }) {
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  }

  async function click() {
    await setWord("hidden")
    await setEnteredApp(true)
    await setTimeout(() => setZindex({zIndex: '2'}), 2000)
    }
  

  const checkIfWalletIsConnected = () => {
    const { ethereum } = window
    ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length !== 0) {
          const account = accounts[0]
          setCurrentAccount(account)
        } else {
        }
      })
      .catch((err) => console.log(err))
  }

  function connectWallet() {
    const { ethereum } = window
    if (!ethereum) {
      alert("Get metamask!")
      return
    }
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        setCurrentAccount(accounts[0])
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  

  return (
    <motion.div
      className='motionContainer'
      initial='visible'
      animate={word}
      variants={variants}
      transition={{ duration: 2 }}
    >
      <h1 style={{ fontSize: "100px", marginBottom: "0px" }}>Wave Portal 👋</h1>
      <h3 style={{ fontSize: "30px" }}>Connect your wallet and enter Wave Portal</h3>
      {!currentAccount ? (
        <button className='waveButton-Black' onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <button className='waveButton-Black' onClick={click}>
          Enter Wave Portal
        </button>
      )}
    </motion.div>
  )
}
