import { useState } from 'react'

function App() {

  /*
   Pura dom tree parse krega react jab state variable ki state change hogi and actual website k UI ko change krega jaha jaha woh var hai .
   Hume har jagah khud update nhi krna padega jaise js mein krte the . react khud krdeta hai ye cheez.
  */
  let [counter , setCounter] = useState(0); // '0' is initial value of 'counter' . useState hook will help update value of counter on UI whenver its state/value changes

  const increaseCount = () => {
    setCounter(counter+1);
  }
  
  const decreaseCount = () => {
    setCounter(counter-1);
  }

  return (
    <>
      <h1>Counter : {counter}</h1>
      <button onClick={increaseCount}>Inc Count</button>
      <button onClick={decreaseCount}>Dec Count</button>
    </>
  )
}

export default App



