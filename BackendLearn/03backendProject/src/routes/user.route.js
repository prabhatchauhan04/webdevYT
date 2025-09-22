import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory, 
    updateAccountDetails
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

// this means : This creates a mini Express app (called a router) that you can use to define routes separately from your main app. I’ll plug it into the main app later.
const router = Router(); 



// ab jab koi /api/v1/users hit krega then ab aage kis route pr jaana hai woh yha define krdenge
// ab route ban jaega 'http://localhost:8000/api/v1/users/register' 
router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1 // sirf ek hi file accept krunga
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]), // fields se multiple data le paenge . ye multer hi provide krta options .
    registerUser
); // ab jaegi post request . aur function run hoga registerUser wala 
// request se pehle ek middleware lga diya 'upload'


router.route("/login").post(loginUser)

//secured routes
// bcoz inmein actual controller run krne se pehle verification lga diya
router.route("/logout").post(verifyJWT,  logoutUser) // verifyJWT k end mein next() call horakha hai then uski wajah se phir logoutUser run hojaega
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router


