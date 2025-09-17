// 'Error' class hai in javascript ka jo hum extend kr rhe hai
// isse hum jaha bhi error handling krenge woh har jagah same format mein hoga
// jaise kya message ya kya variables honge in response or anything woh har jagah same honge
class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        // ye message hi set kr rha 
        super(message) // calls parent class constructor with this message
        this.statusCode = statusCode // these are custom properties jo hum add kr rhe and pehle nhi thi by default
        this.data = null
        this.message = message // ye bhi msg hi set kr rha just in case purana js engines mein super() se msg set nhi hua
        this.success = false // bcoz hum errors handle kr rhe hai yha pr toh success variable false jaega  
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}