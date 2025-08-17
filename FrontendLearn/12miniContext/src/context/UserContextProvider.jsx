/*
| File                      | Contains                 | Extension | Reason                        |
| ------------------------- | ------------------------ | --------- | ----------------------------- |
| `UserContext.js`          | Just context logic       | `.js`     | No JSX, just JavaScript       |
| `UserContextProvider.jsx` | JSX component with logic | `.jsx`    | Contains JSX (HTML-like code) |
*/

import React from "react";
import UserContext from "./UserContext";

// This component acts as a Context Provider for UserContext
// It will allow any child component to access and update the "user" state


// In React, children is a special prop that automatically includes whatever is wrapped inside a component when it's used.
// as children kuch bhi rakh sakte ab . jise access provide krana uski ko as children dedenge
const UserContextProvider = ({ children }) => {

    // Declare a state variable 'user' and its setter 'setUser' using the useState hook
    // Initially, the user is set to null (no user logged in)
    const [user, setUser] = React.useState(null);

    // Provide the 'user' and 'setUser' to all child components via Context
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children} {/* This renders all the nested components that are wrapped inside this provider but now with access to the 'value' prop*/}
        </UserContext.Provider>
    );
}

export default UserContextProvider;

/*
What is UserContext.Provider?
It’s a special React component that comes with every context you create.
Its job is to hold the data you want to share (called the value).
It wraps other components (its children) and makes that shared data available to all of them.
How does it work?
You pass the data you want to share as a value prop to the provider.
Any child component inside this provider can access that value using useContext(UserContext).
If the value changes, React will automatically update all those child components that are using the context.
*/

/*
When you create a context with const UserContext = React.createContext(), React creates two things behind the scenes:
-> The context object (UserContext)
-> A matching Provider component (UserContext.Provider)
So, UserContext.Provider is directly tied to the UserContext you created.
When you write <UserContext.Provider value={...}>, React knows that any component using useContext(UserContext) will 
get that value from this Provider.
It doesn’t matter where in your files you put the Provider, as long as the components that use the context are inside (wrapped by) 
that Provider in the component tree.
*/

/*
In App.jsx ,  <UserContextProvider> <Login /> <Profile /> </UserContextProvider>, the Login and Profile components become the children 
of UserContextProvider. Inside UserContextProvider, rendering {children} means those components get 
rendered inside the UserContext.Provider. This setup lets Login and Profile access the shared user data from the context without
passing props manually.
*/
/*
children is a special prop that React automatically provides to every component.
It contains whatever you place between the opening and closing tags of that component when you use it.
*/




























