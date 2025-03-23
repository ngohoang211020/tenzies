import Die from "./Die"
import { useEffect, useRef, useState } from "react"
import { nanoid } from "nanoid/non-secure"
import Confetti from "react-confetti"
import { useWindowSize } from 'react-use'

export default function App() {
  // Create an array of 10 dice objects with random values and isHeld set to false by default but when App() renders for the first time

  const [dice, setDice] = useState(() => generateAllNewDice())

  // Check if all dice are held and have the same value every time the dice state changes
  const gameWon = dice.every(dieObj => dieObj.isHeld) && dice.every(dieObj => dieObj.value === dice[0].value)

  const buttonRef = useRef(null)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])
  
  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice())
      return
    }
    setDice(dice.map(dieObj => {
      return dieObj.isHeld ? dieObj : {
        ...dieObj,
        value: Math.floor(Math.random() * 6) + 1
      }
    }))
  }

  function heldDie(id) {
    setDice(dice.map(dieObj => {
      return dieObj.id === id ?
        {
          ...dieObj,
          isHeld: !dieObj.isHeld
        } : dieObj
    }
    ))
  }

  const diceElements = dice
    .map(dieObj => <Die key={dieObj.id} dieObj={dieObj} heldDie={heldDie}
    />
    )

  const { width, height } = useWindowSize()

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice} className="roll-dice" ref={buttonRef}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )

}
