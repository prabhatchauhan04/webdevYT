/*
sabse pehle ye dono install kr liye: npm install @reduxjs/toolkit react-redux
*/

import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {

  return (
    <>
      <h1>Learn About Redux Toolkit</h1>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App







/*
In the kingdom of ReactLand, managing state across different components became chaotic, so a 
central vault called the store was created to hold all the important information. 
To organize this vault, the developer wrote slices, each one like a scroll focused on a specific part of the kingdom—like a counter or a user. 
These slices contained the initial state, reducers (rules for how state should change), and actions (magic words to trigger those changes). 
When a villager (component) wanted to update the state, they would dispatch an action using a messenger. The reducer, 
acting like a royal interpreter, would read the scroll and update the vault accordingly. If villagers needed to read from the vault, 
they would use selectors, magical telescopes that zoomed into the exact piece of information they needed. 
For long-distance tasks, like fetching data from another kingdom (an API), special messengers called async thunks were sent.
This well-organized system brought peace and order to ReactLand, making state management simple, predictable, and efficient.
*/

/*
1. Store

The store holds the entire global state of your app.

Created using configureStore() from RTK.

Example:

const store = configureStore({ reducer: rootReducer });

2. Slice

A slice is a piece of the state and logic.

Created using createSlice().

Includes: name, initialState, reducers (functions to update state), and it auto-generates actions.

Example:

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 }
  }
});

3. Reducers

Reducers describe how state changes in response to actions.

In RTK, reducers are part of the slice.

You pass these to the store:

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

4. Actions

Plain JS objects that describe what happened (e.g., increment the counter).

RTK auto-generates action creators from slice:

counterSlice.actions.increment

5. Dispatch

Used to send actions to the store to update state.

dispatch(counterSlice.actions.increment())

6. Selector

Used to get state from the store.

const value = useSelector((state) => state.counter.value);
*/
