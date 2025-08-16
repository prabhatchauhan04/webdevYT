import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import User from './components/User/User'

// Import required functions/components from React Router for routing setup
import { RouterProvider, createBrowserRouter , createRoutesFromElements, Route} from 'react-router-dom';
import Github, { githubInfoLoader } from './components/Github/Github.jsx'


// Here’s what React Router does under the hood:
// Matches the route path: 'about'
// Finds the element: <About />
// Looks for the parent layout: <Layout />
// Sees that <Layout /> has <Outlet /> inside it
// Injects <About /> into <Outlet />

/*
// ye bhi ek way hai routes create krne ka
const router = createBrowserRouter([
  {
    path: '/',               // Base route (example: http://localhost:3000/) / Top level route
    element: <Layout />,     // The layout component wraps all child routes
    children: [
      {
        path: '',            // Matches the exact base route ('/')
        element: <Home />    // Shows the Home component
      },
      {
        // url mein jab /about likhenge toh yha aaega react aur iske element ko uthakr Outlet mein inject krdega
        // agar Layout mein outlet tag nhi hoga toh About tag kahi nhi dikhega on web page 
        path: 'about',       // Matches '/about' 
        element: <About />   // Shows the About component
      },
      {
        path: 'contact',     // Matches '/contact'
        element: <Contact /> // Shows the Contact component
      }
    ]
  }
]);
*/

// aur ye bhi ek way hai
// (use what u like , done tarike same hi kaam krrhe)
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      {/* Ab ye humne jo :userid (userid is parameter) dala hai , iska access miljata hai element mein jo component do uske andar directly */}
      <Route path='user/:userid' element={<User />} /> 
      <Route 
        loader={githubInfoLoader}
        path='github' 
        element={<Github />} 
      />
    </Route>
  )
)
// A loader is a special function that allows you to load data before rendering a component in a route.
// It runs before the route’s component (element) is shown — like a pre-fetch.



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />  
  </StrictMode>,
)

/*
What is <RouterProvider>?
<RouterProvider> is a special React Router component that takes your router configuration (the routes, paths, elements, nested structure) 
and wires it all up.
It makes React Router work by:
Listening to URL changes (like when the user navigates)
Matching the current URL to your routes
Rendering the right components (and injecting them into <Outlet />s)
Managing navigation history and other internals
*/
// RouterProvide tag nhi kaam krta bina 'router' prop k 
