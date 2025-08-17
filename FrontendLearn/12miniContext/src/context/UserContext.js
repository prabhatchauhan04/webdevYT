/*
The Context API in React is used to manage and share state or data across components 
without having to pass props down manually at every level (called "prop drilling").
🧠 Why use the Context API?
1. Avoid Prop Drilling
Imagine a deeply nested component tree where a value needs to be accessed by components deep down.
Passing props through each layer can get messy. and also jis component ko actually jarurat hai prop ki wahi use karega. but agar props pass 
krenge toh har component ko pass karna padega. even woh bhi jis component ko prop ki jarurat nahi hai.
Context allows you to define global-like variables and share them across any component directly.
2. Centralized State Management (for small to medium apps)
Great for managing:
Theme (dark/light mode)
Auth state (user logged in or not)
Language settings
Cart items in a small e-commerce app
3. Simpler than Redux or other libraries
Redux offers powerful tools, but it can be overkill for smaller applications.
Context is built-in and simpler to use when your state management needs are limited.
*/

import React, { createContext } from 'react';

// ye ek mail box ki tarah hai jisme hum data store krenge
const UserContext = React.createContext(); // ye bngya ek context object jisme hum data store krenge

export default UserContext; 

// context k saath ek provider bhi bnana pdta hai jo data provide krega


/*
Summary:

// 1. Create
const MyContext = React.createContext();

// 2. Provide
<MyContext.Provider value={ some data }>
  <YourComponent />
</MyContext.Provider>

// 3. Consume
const data = useContext(MyContext);

// 4. Use
<MyComponent data={data} />
*/















