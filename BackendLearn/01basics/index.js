/*
installed express and dotenv using npm
npm init -y
npm install express dotenv
*/

require('dotenv').config()
const express = require('express')
const app = express()

// Accessing PORT from .env file 
// ye better than hardcoding the port number
// because we can change the port number in .env file without changing the code
// and also we can use different port numbers for different environments (development, production)
// jaise dusre developers k pc par jo hum port use kr rhe woh available na ho toh unke liye hum easily .env file mein port change kr skte hain
const PORT = process.env.PORT


// ye ab humare server ke routes hain
// jab bhi koi user in routes par GET request bhejega toh yeh response bhejenge
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('About Page')
})

app.get('/contact', (req, res) => {
    res.send('Contact Page')
})


// server is listening on the port
// jab bhi server start hoga toh yeh message console par print hoga
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})










