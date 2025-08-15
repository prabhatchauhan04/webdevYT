import { useState } from 'react'
import './App.css'

function App() {

  const [counter, setCounter] = useState(0)

  /*
  
  Output: The counter increases by 1, not 4.
  
  🧠 Why?
  React batches state updates made during the same event loop.
  Each call to setCounter(counter + 1) uses the same stale value of counter (e.g., 0).
  React groups (or batches) multiple state updates together so it can update the UI only once, not again and again for each change.
  React sees these 4 updates happening quickly, so it batches them.
  But since they all use the same counter value, only 1 update actually applies.
  
        const addValue = () => {
        setCounter(counter+1);
        setCounter(counter+1);
        setCounter(counter+1);
        setCounter(counter+1);
      }
  */


/*
  Output: The counter increases by 4.

    🧠 Why?
      Using the functional form of setCounter tells React:
      “Use the latest value, even if other updates are queued.”
      React waits for its turn to update the state, and when it does, 
      it calls this function passed, passing the most recent value(prevCounter), even if other updates are happening at the same time.
      prevCounter is just a name you give the argument.
      It represents the current value of the counter state when that particular update is applied.
      You could name it anything: prev, current, banana — it's just a variable!
*/
  const addValue = () => {
    setCounter(prevCounter => prevCounter + 1);
    setCounter(prevCounter => prevCounter + 1);
    setCounter(prevCounter => prevCounter + 1);
    setCounter(prevCounter => prevCounter + 1);
  }

  const removeValue = () => {
    setCounter(counter - 1)
  }

  return (
    <>
      <h1>Counter value: {counter}</h1>
      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={removeValue}>remove value</button>
    </>
  )
}

export default App