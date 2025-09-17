// iss file mein bs database se connect krne ka code hai
import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';


const connectDB = async () => {
    try {
        // await use krenge bcoz process.env mein time lgta hai variables aane mein aur connect hone mein bhi time lagta hai
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        // ye isliye kiya hai taki hume pata chale ki hum kis host se connected hai
        // bcoz database production ka alag hota hai aur development ka alag aur testing ka alag toh isliye just to confirm ki kaha connect hua hai
        console.log(`MongoDB connected ! DB Host: ${connectionInstance.connection.host}`);
    }catch (error) {
        console.error('Error connecting to MongoDB:', error);
        /*  In Node.js, process is a global object that provides information and control over the current Node.js process.
            You can access it anywhere in your code without requiring or importing it.  */
        process.exit(1); 
    }
}

export default connectDB;










