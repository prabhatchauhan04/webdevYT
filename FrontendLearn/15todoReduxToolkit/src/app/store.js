// ye configureStore core redux se aaya hai na ki react se 
import { configureStore } from "@reduxjs/toolkit";
// This line means: "Hey, go to todoSlice.js, get the default thing being exported (which is todoSlice.reducer), and call it todoReducer here."
import todoReducer from "../features/todo/todoSlice.js";

/*
So, by doing ' reducer: todoReducer ' you’re telling Redux:
"Hey, here’s the function that knows how to respond to actions like addTodo or removeTodo. Use this function to manage the state."
*/
export const store = configureStore({
    reducer: todoReducer
}); // ye store bana diya ab isme reducer add karna hai


