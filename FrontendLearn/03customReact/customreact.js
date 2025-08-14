
function customRender(reactElement, container) {
    // reactElement ko ek DOM element me convert karna hai
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children

    // props ko set karna hai
    for (const prop in reactElement.props) {
        domElement.setAttribute(prop, reactElement.props[prop])
    }

    // ab is DOM element ko container me append karna hai
    // container ek DOM element hai jisme hum render karenge
    // jaise ki div, section, etc.
    container.appendChild(domElement)
}

// ye reactElement ek object hai jo ki React element ko represent karta hai
// ye khud ka reactElement ka syntax maan liya hai humne 
const reactElement = {
    // anchor tag hai toh 'a' use karenge
    type: 'a',
    // attributes
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    // content tag k andar kya hai
    // children ke andar jo bhi likha hai wo innerHTML me set karenge
    children: 'Click me to visit google'
}

const mainContainer = document.querySelector('#root')

// mainContainer mein hum reactElement ko render karenge(inject kr rhe)
customRender(reactElement, mainContainer) // mainContainer me render karenge
// iske andar jo bhi DOM element hai wo render hoga
// jaise ki anchor tag, div, section, etc.

