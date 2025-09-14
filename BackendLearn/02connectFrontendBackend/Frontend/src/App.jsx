import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        // axios.get('http://localhost:3000/api/jokes')
        // ab proxy(jo vite.config.js mein set ki hai) apne aap localhost:3000 lga dega 
        axios.get('/api/jokes')
            .then((response) => {
                setJokes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    })

    return (
        <>
            <h1>Hello fullstack app!</h1>
            <p>JOKES: {jokes.length}</p>

            {
                jokes.map((joke, index) => {
                    return (
                        <div key={joke.id}>
                            <h3>{joke.title}</h3>
                            <p>{joke.content}</p>
                        </div>
                )})
            }

        </>
    )
}

export default App


/*
Here we used axios and not fetch because axios have some advantages over fetch.
✅ Pros of axios:
Automatically transforms JSON data
Supports older browsers (like IE11)
Built-in request/response interceptors
Automatically handles timeouts and errors better
Automatically stringifies data for POST/PUT requests
Returns response data directly (no need to manually call .json())

❌ Cons of axios:
Requires installing via npm: npm install axios
Slightly larger bundle size

Pros of Axios over Fetch in production:
Automatic JSON parsing – No need to manually call .json().
Better error handling – Axios throws for HTTP errors (like 404, 500).
Request and response interceptors – Useful for auth tokens or logging.
Built-in timeout support – Prevents hanging requests.
Simplified POST requests – Automatically stringifies objects.
Smaller, cleaner responses – Access response.data directly.
Easier to set default headers and base URL – Global config support.
Better support in older browsers – Works with IE11 (with polyfill).
Handles request cancellation – Built-in cancellation support.
Transforms request and response data – Custom logic via config.
*/

/*
🌐 What is CORS Policy?
CORS (Cross-Origin Resource Sharing) is a security feature implemented by browsers to restrict web pages from making requests to a different
origin than the one that served the web page.

🧠 One-liner Definition:
CORS is a browser security policy that controls which domains can access resources on a different domain.

🔒 Why CORS Exists:
To prevent malicious websites from reading sensitive data from other websites the user is authenticated with (like stealing tokens 
or making unauthorized requests).

🧭 What is a "different origin"?
Two URLs are of different origin if their:
Protocol (http vs https)
Domain
Port
are not exactly the same.
Example:
✅ Same Origin: https://example.com/api and https://example.com/home
❌ Cross Origin: https://example.com and https://api.example.com

Toh ab jab frontend chalega port 5173 (localhost:5173) par aur backend chal rha port 3000 par toh CORS ki wajah se error aaega 
toh hum ek solution ye kr sakte ki jakr backend pr CORS middleware install kre pehle and 
then origin / whitelist wagerah set krdo ki kaha se requests allowed hai 
and second solution jo hum yha lgaenge woh hoga 'proxy' set krna . we will just google proxy vite bcoz humne vite se install kri hai react app
and pura process ajaega basically hum vite.config.js file mein export horhe object k andar server key ki value mein ek object dalenge 
with key proxy aur iss proxy ki value mein ek object hoga usmein '/api' k liye hum 'localhost:3000' daal denge
isse hoga ye ki jab bhi humara koi request /api path pr bhej rha hoga code tab 2 cheezein hongi :
> ek toh /api k pehle localhost:3000 apne aap lag jaega (but ye toh hum manually bhi kr hi rhe the but CORS issue aara tha isse)
> dusri ye ki ab server ko lgega ki proxy mein jo url hai i.e., localhost:3000 (backend) humari request whi se origin hui hai(iss wajah se CORS issue nhi aata)

✅ Why it works (and avoids CORS):
The browser thinks the request is going to the same origin (localhost:5173) because that’s where you sent it from and where it returned to.
Since the request never directly leaves your origin from the browser’s point of view, CORS is never triggered.
🔧 Real-World Analogy:
Think of the proxy like a middleman:
You give it a message (API request),
It delivers it to someone else (your backend),
Brings the response back to you without the other party knowing who asked.
*/





