import React from 'react' // we are not importing anything from 'react'. we are doing this "Give me the default export, and I’ll call it React."
import { createRoot } from 'react-dom/client'
import App from './App.jsx'




function MyApp(){
    return (
        <div>
            <h1>Custom My App</h1>
        </div>
    )
}

// this will not work bcoz actual react element toh type , props , children etc thodi rakhrha as keys uska structure toh alag hai
// isiliye ye ReactElement jo humne bnaya work nhi kiyawhen we tried to pass it in render() function
/*
const ReactElement = {
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'Click me to visit google'
}
*/

// ye work krjaega bcoz ye direct tag hai html ka
const anotherElement = (
    <a href="https://google.com" target='_blank'>Visit google</a>
)



const anotherUser = "prabh and react"

// React element aisa dikhta hai 
// Babel converts tags wagerah into React.createElement() calls, which create objects React uses to build and update the UI.
const reactElement = React.createElement(
    'a',
    {href: 'https://google.com',target: '_blank' }, // keep this object empty if no attributes/props
    'click me to visit google',
    // sabse end mein evaluated expressions / variables 
    anotherElement 
)

// we get element with id root bcoz sirf whi present hai in index.html toh usi k andar daar rhe ye reactElement
createRoot(document.getElementById('root')).render(
  <>
    {anotherUser}
    <App />
    {MyApp()}
    {reactElement}
  </>
)
// tags k andar we use '{}' to tell ki ye js evaluated expression hai . cant write if,loop etc in it . just expressions jo already evaluated hai





// initially ye tha bas :--
/*

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

*/

