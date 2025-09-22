// ye bs verify krega ki user hai bhi ya nhi

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

// 'res' ki jagah '_' daal diya yha . ye ek production grade code hai bcoz 'res' ka use nhi hua hai ismein so 'res' ki jagah '_' daaldiya
export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        // bcozz ho sakta hai ki header mein ho token . toh uska part bhi sambhal liya .
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user; // daldiya humne user ki details in req before passing the req forward
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})
