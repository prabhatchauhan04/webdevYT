// ye import & from wala syntax module js wala hai hai 
import express from "express"; // this is modern way of importing modules in node js
// old way was 'const express = require('express');'
// by default commonjs hi hota hai
// so to import using module js syntax, we have to change ' "type": "commonjs" ' to ' "type": "module" ' in package.json file
// commonjs mein synchronous loading hoti hai
// module js mein asynchronous loading hoti hai

const app = express();


// get a list of 5 jokes 
app.get("/api/jokes", (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "Math Joke",
            content: "Why was the equal sign so humble? Because it knew it wasn't less than or greater than anyone else."
        },
        {
            id: 2,
            title: "Programming Joke",
            content: "Why do programmers prefer dark mode? Because light attracts bugs!"
        },
        {
            id: 3,
            title: "Dad Joke",
            content: "I only know 25 letters of the alphabet. I don't know y."
        },
        {
            id: 4,
            title: "Tech Support Joke",
            content: "Have you tried turning it off and on again?"
        },
        {
            id: 5,
            title: "Coffee Joke",
            content: "How does a Java developer take their coffee? With a class and an interface."
        }
    ];
    res.send(jokes);
});


// abhi k liye bs ye likh diya '||' lgakr just in case local pr hum env file mein PORT define krna bhool jate hain
// to hume default 3000 miljaega
const port = process.env.PORT || 3000; // production par for sure process.env.PORT pr hi run honi chaiye warna app nhi chalegi

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




