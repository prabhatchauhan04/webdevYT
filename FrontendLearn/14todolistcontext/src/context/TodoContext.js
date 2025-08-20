import { createContext, useContext } from 'react';

/*
todos: [
        { id: 1, todo: 'Learn React', completed: false },
        { id: 2, todo: 'Build a Todo App', completed: false },
    ]
 Kuch aisa hum ek array k andar har todo ko store karenge in form of objects.
*/

export const TodoContext = createContext({
    todos: [],
    addTodo: (todo) => {},
    updateTodo: (id , todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
});

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;

