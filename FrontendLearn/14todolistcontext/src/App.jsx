import { useEffect, useState } from 'react'
import { useTodo, TodoContext, TodoProvider } from './context/index';
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'


function App() {

    const [todos, setTodos] = useState([]); // empty array de rakha hai

    const addTodo = (todo) => {
        setTodos((prevTodos) => {
            return [{
                id: Date.now(),
                ...todo
            }, ...prevTodos];  // nya array hi bna diya with old todo's too
        })
    }

    const updateTodo = (id, todo) => {
        setTodos((prevTodos) => {
            // map function se pure todos array pr loop kr gye
            // if jo todo update krna hai woh miljae toh daaldo nya todo warna purana currTodo rehne do
            // ye bnakr dega ek array hi 
            return prevTodos.map((currTodo) => {
                return currTodo.id === id ? todo : currTodo
            })
        })
    }

    const deleteTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((currTodo) => {
                return currTodo.id !== id;
            })
        })
    }

    const toggleComplete = (id) => {
        //console.log(id);
        setTodos((prevTodos) =>{
            return prevTodos.map((currTodo) =>{
                return currTodo.id === id ? {...currTodo , completed: !currTodo.completed} : currTodo;
            })
        })
    }

    // bs reload pr wapas purane todos aajae
    // localstorage se item lenge wapas toh woh String hi dega
    useEffect(() => {
        const todosFromStorage = JSON.parse(localStorage.getItem("todos"));
        if(todosFromStorage && todosFromStorage.length > 0){
            setTodos(todosFromStorage);
        }
    }, [])
    
    // ab bs todos mein change hote hi humare local storage mein bhi add krdo nayi list in string format 
    useEffect(() => {
        localStorage.setItem("todos" , JSON.stringify(todos));
    } , [todos])

    return (
        // ye hum direct 'useTodo' destructure hi kr rhe {todos , addTodo ,.......} 
        <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                            <div key={todo.id} className='w-full'>
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ TodoProvider>
    )
}

export default App
