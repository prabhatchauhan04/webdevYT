// hum yha dotenv ko setup krne ki jagah scripts in package.json mein ' "dev": "nodemon -r dotenv/config src/index.js" ' ye bhi kr sakte
// -r means required . ye pre load kr deta hai dotenv ko before running the index.js file
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

// jitni jaldi ho sake environment variables ko load krna chahiye
// bcoz ye environment variables hai aur inka use kahi na kahi ho hi rha hoga
// as first file jo load ho rhi hai it is this file so hum yhi pr load krenge env variables ko
// taki baki sb files mein inka access mil jae
dotenv.config({
    path: './.env'
}); // ye line likhne se .env file mein jo bhi variables hain wo process.env mein aa jate hain


// bcoz connectDB ek promise return krta hai to hum .then .catch use kr skte hain
// bcoz async methods always return a promise
connectDB()
.then(() => {
    // bcoz hum chahte listen krne se pehle ki agar koi error ho express app mein to wo catch ho jae pehle hi
    app.on("error", (error) => {
        console.log("ERRR: ", error);
        throw error
    });
    app.listen(process.env.PORT || 8000 , () => {
        console.log("Server is running at port :" , process.env.PORT || 8000);
    });
})   
.catch((error) => {
    console.log("MongoDB connection failed" , error);
})




// agar hum env file mein kuch bhi change krte hain to hume server ko restart krna padega taki changes reflect ho sake
// nodemon iss baar kuch nhi kr paega

/*

// hum usually ye approach nhi follow krte bcoz code saara index.js mein likhne se messy ho jata hai
// but for understanding purpose we are doing this

import mongoose from "mongoose"
import { DB_NAME } from "./constants.js"

import express from "express"
const app = express()

// Immediately Invoked Function Expression (IIFE) is used here . syntax : ' ;(function(){})() '
// ; before an IIFE defensively ends the previous statement, avoiding ambiguous parsing.
// It’s not always required, but it's a safe and common convention when writing 
// IIFEs — especially if your code might follow code that omits semicolons.

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        // this checks if express hi for some reason baat nhi kr paa rhi database se 
        // ye ek listener jese hi hai jo error event ko listen krta hai
        app.on("error", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()

// two things to note here :
// > we used async await bcoz database connection is a time taking process bcoz ho sakta hai database kisi 
// aur continent mein ho aur codebase kisi aur
// > we used try catch bcoz agar database se connect hone mein koi error aata hai to wo catch block mein chala jaye 
// and hum us error ko handle kr ske
*/

