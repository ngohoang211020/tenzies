export default function Die(props) {
  return (
    <button 
    onClick={() => props.heldDie(props.dieObj.id)}
      style={{ backgroundColor: props.dieObj.isHeld ? 'hsla(144, 71%, 62%, 1)' : 'white' }}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, 
      ${props.dieObj.isHeld ? "held" : "not held"}`}
   >
      {props.dieObj.value}
    </button>
  )
}