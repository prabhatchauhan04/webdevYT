// database connection k time hum bohot sab kuch likh rhe the try catch and async await . ab ho sakta hai woh dobara bhi likhna pade
// toh ek kaam kiya humne yha ki ek wrapper function bna diya jo har baar try catch aur async await ka kaam kr dega
// utils folder mein rkh rhe hai taki baar baar use kr ske
// utils means utility functions


// > this is promise wala method
const asyncHandler = (requestHandler) => {
    // we will be passing asyncHandler(async fn) hence ye fn/requestHandler will be async and async functions return promise 
    // whi promise yha resolve krdiya
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }








// // > ye wala is the try catch wala method ()
// // basically ek express jo samjh paye aisa function return hojaega when asyncHandler is called i.e., asyncHandler()
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next) // next means ki agr aage middleware hai toh usko bhi call kr de
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }