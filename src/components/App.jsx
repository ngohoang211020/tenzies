import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid/non-secure"

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice())

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
    setDice(dice.map(dieObj => {
      return dieObj.isHeld ? dieObj : {
        ...dieObj,
        value: Math.floor(Math.random() * 6) + 1
      }
    }
    ))
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

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice} className="roll-dice">Roll</button>
    </main>
  )

}
