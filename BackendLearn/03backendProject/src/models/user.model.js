// yha schemas banaenge hum for storing data in database
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. toh ussi ka use krenge hum yha.
// mongoose.Schema is a constructor you use to define the structure (shape) of the documents in a MongoDB collection.

import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// iski jagah ' new mongoose.Schema({}) ' bhi kr sakte the . but for ease of use humne upar hi nikal liya Schema function from mongoose
// kisi bhi database mein aapko agar woh field searcheable bnani hai optimized tarike se then uska index true krdo
// thoda sa expensive hojata hai but its worth it if bohot jyada searching mein use hone wala hai uss field ka
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        // basically upload krenge image on cloudinary and woh hume ek url bnakr dedegi uska
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    // array of objects
    watchHistory: [
        {
            // this is referencing/population
            type: Schema.Types.ObjectId, // this simply means A special type that stores the ID of another MongoDB document.
            ref: "Video" // Specifies which model (collection) that ID belongs to, enabling Mongoose to link documents.
            /*
                Schema: A Mongoose object used to define the structure of documents in a collection.
                Schema.Types: A collection of built-in data types you can use in your schema (like String, Number, ObjectId, etc).
                Schema.Types.ObjectId: The data type representing MongoDB’s unique identifier for documents, used for references.
            */
        }
    ],
    password: {
        type: String,
        required: [true , "Password is required"] // ye second wala is custom error message agar password na aaya ho from user
    },
    refreshToken: {
        type: String
    }
}, 
{
    timestamps: true
});
// mongodb mein field 'unique: true' krne se bs unique value hi lega ab uss field ki mongodb . great feature bcoz ab manually kuch nhi krna padrha 
// ye timestamps true krne se mongodb apne aap hi 'createdAt' and 'updatedAt' daal deta hai . helpful to know kb bni table aur kab last update hui 
// schema k andar bhi hum mini schema bna sakte hai 


// pre / pre hook : middleware hai in mongoose
// kisi bhi event hone se exact pehle kuch krne k liye we use pre hook
// jaise yha kuch bhi "save" hone se pehle callback fire hojaega
/* 
yha hum arrow function nhi use krenge bcoz : 
In Mongoose middleware like pre('save', callback), the callback’s this refers to the document being saved (or the query in query middleware).
If you use an arrow function:
this is lexically bound to the outer scope (probably undefined or the module), not the document.
So you lose access to the document instance, which you often need to modify or check.
yha pr 'this' hona jaruri hai bcoz hum kisi ek particular user k liye hi krenge na koi kaam toh woh kis k liye krna hai woh 'this' btaega
*/
// thoda time taking hota hai encryption wagerah because algorithm chalti hai , processing hoti hai , cpu processing hoti hai etc .
// so isliye inn functions ko async likhte hai
// next help krega to tell ki ab aage paas krdo humara work . jo hume krna tha woh hogya . 
userSchema.pre('save' , async function(next){
    // ye ek check hai to only hash password and update it agar actually password change ya first time save kr rhe ho
    // agar koi dusri field change hui ho toh kyu password ko chedna
    if(!this.isModified("password")) return next(); // isModified already available hota hai
    
    this.password = await bcrypt.hash(this.password , 10); // ye second argument is rounds . iska use krke bcrypt khud salt generate kr lega
    next();
});

// ye custom methods design krdiye
// this checks if user entered password is correct or not
userSchema.methods.isPasswordCorrect = async function(password){
    // compare methods returns true if user entered 'password' matched with hashed password 'this.password' present in database . 
    // otherwise returns false .
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id, // MongoDB automatically adds a unique _id field to every document you insert if you don’t provide one yourself.
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


// model create kr diya with name "User" and with schema "userSchema" 
// and then iss model ko 'User' const mein store kra ke export kr diya
export const User = mongoose.model("User", userSchema);
/*
> mongodb database mein humne naam daala hai model ka "User" but woh store krega "users" naam se as a collection
> bcoz mongodb model name ko singular to plural kr deta hai convert and also har character lowercase mein convert kr deta hai
> examples :
Model Name	    |  MongoDB Collection Name (auto)
'User'	        |  'users'
'Person'    	|  'people'
'Mouse'	        |  'mice'
'Category'	    |  'categories'
'InventoryItem' |  'inventoryitems'
*/
//Here, 'User' model manages the 'users' collection in MongoDB.


/*
What is JWT?
A compact, URL-safe token format used to securely transmit information between parties.
Commonly used for authentication and authorization in web apps.

Structure:---
JWT consists of 3 parts, separated by dots (.):
Header — metadata (algorithm, token type)
Payload — the actual data/claims (like user ID, expiry)
Signature — verifies token integrity using a secret or key

Example: xxxxx.yyyyy.zzzzz

How it works:
User logs in → server creates a JWT with user info and signs it.
JWT is sent to client (usually in HTTP headers or cookies).
Client sends JWT back with each request.
Server verifies the JWT signature to authenticate the user.
If valid, server processes request; otherwise, rejects it.

Advantages:
Stateless authentication (no need to store session on server).
Compact and easy to pass via URLs, headers, or cookies.
Can store custom user data securely.
Common usage in Node.js

Create token: jwt.sign(payload, secret, options)
Verify token: jwt.verify(token, secret)
Extract info from token payload

Note : jwt is also known as bearer token bcoz jo isko bear krta hai (matlab jiske paas ye hai) uski request serve krdeni hai
*/








