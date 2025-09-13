import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './app/store.js' // ye humara 'prop store' ko denge

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)



/*
Same jaise humne ContextAPI mein wrap kiya tha waise hi yha bhi krdenge wohi Provider mein wrap
yha pr prop ko value ki jagah store bolte hai 
*/