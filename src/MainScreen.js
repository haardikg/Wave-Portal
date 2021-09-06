import React, { useEffect, useState } from "react"
import { ethers } from "ethers"
import dotenv from "dotenv"
import abi from "./utils/abi.json"
import "./App.css"
import Wave from "./components/Wave"


export default function MainScreen({currentAccount, setCurrentAccount, enteredApp, zindex}) {
  const [waveCount, setWaveCount] = useState(0)
  const [message, setMessage] = useState("")
  const [waves, setWaves] = useState([])
  const [tx, setTx] = useState({state: '', happening: false})
  dotenv.config()

  function handleChange(event) {
    setMessage(event.target.value)
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contractAddress = process.env.REACT_APP_ETHEREUM_ADDRESS
  const signer = provider.getSigner()
  const waveportalContract = new ethers.Contract(contractAddress, abi.abi, signer)


  const wave = async () => {
    const waveTxn = await waveportalContract.wave(message)
    setTx({state: 'Processing Transaction ....', happening: true})
    await waveTxn.wait()
    setTx({state: 'Processed Transaction', happening: true})
    setTimeout(() => setTx({state: '', happening: false}), 5000)
  }

  const getWaves = async () => {
    const count = await waveportalContract.getTotalWaves()
    setWaveCount(count.toNumber())
    const allWaves = await waveportalContract.getAllWaves()
    setWaves(allWaves)
  }

  useEffect(() => {
    getWaves()
  }, [])

  useEffect(() => {
    waveportalContract.on("NewWave", async (_waver, _message, _timestamp) => {
      const count = await waveportalContract.getTotalWaves()
      setWaveCount(count.toNumber())
      setWaves((prevWaves) => [
        ...prevWaves,
        { waver: _waver, timestamp: _timestamp, message: _message },
      ])
    })
  }, [])


  const wavesTable = waves.map((wave) => (
    <Wave from={wave.waver} message={wave.message} timestamp={new Date(wave.timestamp * 1000).toString()} key={wave.timestamp}/>
  ))

  return (
    <div className='mainContainer' style={zindex}>
      <div className='dataContainer'>
        <div className='header'>👋 Hey there!</div>
        <div className='bio'>
          Wave at me to recive 0.0001 ether!
        </div>
        <textarea onChange={handleChange} value={message} placeholder='Message'>
          Message
        </textarea>
        <button className='waveButton' onClick={wave}>
          Wave at Me
        </button>
        {tx.happening == false ? <h1 className='text'>Number of waves: {waveCount}</h1> : <h1 className='text'>{tx.state}</h1>}
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center'}}>
         {wavesTable}
        </div>
      </div>
      </div>
  )
}
