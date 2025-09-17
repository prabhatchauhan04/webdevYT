import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// 'app' here is like a big object with methods you call to tell it what to do when requests come in.
// isse express k methods wagerah sab 'app' mein load hogye hai
const app = express(); // isse express ka ek instance banega

// to handle cross origin requests
app.use(cors({
    origin: process.env.CORS_ORIGIN, // kon konse origin allowed hai
    credentials: true, // When credentials: true is enabled, you're saying: "Yes, it's okay for the browser to include credentials (like cookies or HTTP auth headers) when making cross-origin requests to this server."
})); // use is a method to register middleware

app.use(express.json({limit: "16kb"})); // Parses incoming JSON payloads from the request body and makes them available under req.body.
app.use(express.urlencoded({extended: true, limit: "16kb"})); // form data ko parse krta hai jo submit hota hai
// extended: true means it can parse nested objects
// limit: "16kb" means maximum size of payload is 16kb
app.use(express.static("public")); // public folder ko static folder bana diya hai
app.use(cookieParser()); // taki hum server se cookies on browser read kr ske aur set bhi kr sake  


// ismein aur ' export const app = express(); ' mein koi farak nhi hai
export { app }; // these are named exports . it means jaha import krenge waha same name se import krna padega







