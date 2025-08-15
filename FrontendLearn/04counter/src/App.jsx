import { useState } from 'react'

function App() {
  let count = 0; // initially count
/*
  This creates a normal local variable 'count', not a React state variable.
  So even though count changes in your console.log, React doesn't re-render the component — so the UI still shows 0.
*/

  const increaseCount = () => {
    count = count+1;
    console.log(count);
  }

  const decreaseCount = () => {
    count = count-1;
    console.log(count);
  }

  return (
    <>
      <h1>Counter : {count}</h1>
      <button onClick={increaseCount}>Inc count</button>
      <button onClick={decreaseCount}>Dec count</button>
    </>
  )
}

export default App
