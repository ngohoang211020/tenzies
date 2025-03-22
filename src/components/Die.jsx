export default function Die(props) {
  return (
    <button 
    onClick={() => props.heldDie(props.dieObj.id)}
      style={{ backgroundColor: props.dieObj.isHeld ? 'hsla(144, 71%, 62%, 1)' : 'white' }}
    >
      {props.dieObj.value}
    </button>
  )
}