// slice almost bas reducer ka hi bda version hai
import { createSlice , nanoid } from "@reduxjs/toolkit"; // nanoid unique id generate krne k liye hai

// initial state Array ya object mein se kuch bhi ho sakti hai 
const initialState = {
    // state k andar todos array hai jisme todo objects hain
    todos: [
        // { id: '1', text: 'Learn React'},
    ]
}


// slice bna di ye
export const todoSlice = createSlice({
    name: 'todo', // slice ka name
    initialState, // initial state hai ye jo upar define ki hai (har slice ka apna initial state hota hai)
    reducers: { // ye reducers hain jo state ko update karenge (reducers mein aati hai properties aur functions)
        // contextAPI mein hum bas declaration likh rhe the function ka aur baadmein override kr rhe the but yha hum function ki definition bhi likh rhe hain
        // humesha state aur action ko argument ke roop mein pass krte hain reducer function mein
        // state humari current state hoti hai aur action wo object hota hai jisme type aur payload hota hai
        // jaise removeTodo krne k liye id chahiye hota hai to wo payload mein aata hai in action object(payload apne aap mein ek object hota hai)
        addTodo: (state , action) => {
            const todo = {
                id: nanoid(), // unique id generate krne k liye nanoid use kiya hai
                text: action.payload, // payload mein jo bhi text hoga wo yha aa jayega 
            }
            // upar jo state hai wo current state hai aur usme hum todos array mein naya todo add kr rhe hain
            state.todos.push(todo); // state ko directly mutate kr rhe hain yha (RTK mein ye allowed hai kyuki ye immer library use krta hai jo immutability ko handle krti hai)
            // redux mein ye allowed nahi hai ki hum state ko directly mutate krein
        },
        removeTodo: (state , action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload) 
        },
    }
})


// ye individual functionality humne export kri hai bcoz ye humare components mein kaam aaega
export const { addTodo , removeTodo } = todoSlice.actions; // ye actions hain jo humne upar define kiye hain (ye actions humare components mein use honge)


// ab store ko btana hai ki ye reducer use krna hai
export default todoSlice.reducer; // ye reducer hai jo humne upar define kiya hai (ye reducer humare store mein use hoga)



/*
Actual mein kuch aisa ban kr aaega 'todoSlice' object:

{
  name: "todo",   // ✅ name you provided

  reducer: function(state, action) {
    // 👈 this function was generated for you
    // It knows how to call addTodo or removeTodo internally based on action.type
    // jaise koi if else statement likh ke ye check krta hai ki action.type kya hai aur uske accordingly state ko update krta hai
  },

  actions: {
    addTodo: function(payload) {
      return { type: 'todo/addTodo', payload }
    },
    removeTodo: function(payload) {
      return { type: 'todo/removeTodo', payload }
    }
  },

  caseReducers: {
    addTodo: function(state, action) {
      // 👈 your raw addTodo reducer function
    },
    removeTodo: function(state, action) {
      // 👈 your raw removeTodo reducer function
    }
  },

  getInitialState: function() {
    return {
      todos: []
    };
  }
}
*/

/*

It works like this : 

dispatch(addTodo("Learn Redux")) 
        ↓
Generates action: { type: 'todo/addTodo', payload: 'Learn Redux' }
        ↓
Redux calls todoSlice.reducer(state, action)
        ↓
Redux Toolkit looks up caseReducers['todo/addTodo']
        ↓
Runs your addTodo function → updates the state

So, createSlice is like a magic box that takes your reducer functions and 
turns them into a full-featured Redux setup with actions and a reducer function that knows how to handle those actions.

*/
