import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken; // ye daal diya refreshToken bhi
        // ye validateBeforeSave false kra hai to tell db ki hume pta hai hum kya kr rhe hai so pls validate mt kro bcoz humne password , username , fullname , aur email pr required true kiya hua hai
        // and save() krte hi validations bhi hoti hai . woh na ho iske liye humne validateBeforeSave ko false krdiya
        await user.save({ validateBeforeSave: false }); // isse ab jo humne refreshToken daala hai woh changes save hojaenge

        return { accessToken, refreshToken };

        /*
            Access token toh hum user ko dedete hai but refresh token hum apne db mein bhi rakhte hai . taki baar baar user se
            password na maangna pade .
        */
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token!");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // Steps :--
    // 1. get user details from frontend
    // 2. validation (kuch empty toh nhi hai kuch galat toh nhi bhej diya)
    // 3. check if user already exists 
    // 4. check for images , check for avatar (bcoz avatar is required)
    // 5. upload them to cloudinary
    // 6. create user object - create entry in db
    // 7. remove password and refresh token field from response (bcoz db jo bhi entry create krega usee hi as response return krdega)
    // 8. check for user creation
    // 9. return response

    const { fullName, email, username, password } = req.body;

    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {// some method tab tk chalega jab tk true na return hojae and end of array na reach hojae
        throw new ApiError(400, "All fields are required");
    }

    /*
        💡 What this does:
        User.findOne(...): looks for one user in the database.
        $or: matches either condition — username or email here.
        { username }: shorthand for { username: username }
        This is commonly used during registration to prevent duplicate accounts.
    */
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    // req.files k aage question mark lga diya taki ye check hojae ki mili bhi hai ya nhi ye
    // jo 'avatar' name se bna . uss array k 0th index pr ek object hoga jismein path mil jaega . ex -> path: 'public/temp/originalname.jpg'
    const avatarLocalPath = req.files?.avatar[0]?.path; // req.files ka access aagya bcoz multer ka jo middleware dala tha humne upload.single() uski wajah se ab req mein files bhi aagyi
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    // After creating or saving a user, we now want to fetch their full info from the database. isse ye bhi check hojaega ki actually db mein bna user ya nhi.
    // But we want to exclude sensitive fields like 'password' and 'refreshToken'
    // Explanation of select():
    // - Mongoose's .select() lets you choose which fields to include or exclude
    // - A field with a "-" means: "Do NOT include this field in the result"
    // - You can exclude multiple fields by separating them with a space
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" // weird sa syntax hai but yaad hojaega
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user.");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully.")
    );

});

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "username or email is required!");
    }

    // 'or' is here a mongodb operator . it brings back a user with either matching email or username jo pehle mil jae
    // 'User' pr lga rhe hum method bcoz ye mongodb mongoose wale methods hai
    const user = await User.findOne({
        $or: [{ email }, { username }] // username: username wala syntax le rha yha
    });

    if (!user) {
        throw new ApiError(404, "User doesnt exist!");
    }

    // yha humne 'user' par lgaya hai method . humara khud ka method hai bcoz ye .
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials!");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // ab dikkat bs itni si hai ki humne generate tokens wale method mein user ko update toh krdiya in db . but abhi jo yha 'user' hai woh reference nhi data hai purane wala toh ab firse call krna padega db se to get updated data from db
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken"); // password & refreshToken nhi chaiye

    const options = {
        httpOnly: true, // isse ab cookie ko using js nhi select or modify kr paega client
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, // ye req.user humne daal diya tha using auth middleware (secure route wale part mein)
        {   // unset ek operator hi hai mongodb mein
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

// basically agar mera access token expire hojae then refreshtoken k basis pr accesstoken renew krwalenge 
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken // mobile app jab user use kr rha hoga then token req.body se aaraha hoga na

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        // bcoz jo user pr hoga woh encrypted token hoga 
        // hume chaiye decoded wala . pura jaisa hum payload ye woh pass krte woh details
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body



    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})


const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        { new: true } // 'new' true krne se update hone k baad jo information hoti hai woh bhi return hojati hai

    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    //TODO: delete old image - assignment

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")

    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Avatar image updated successfully")
        )
})

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is missing")
    }

    //TODO: delete old image - assignment


    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading on avatar")

    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Cover image updated successfully")
        )
})

// jo hume kisi k channel profile ko kholne pr dikhega woh details
// subscription schema mein jo entries hongi woh ek tarike se connections hai b/w kis channel ko subscribe kra aur kisne kra i.e., bs aisa maan lo users k beech aapas mein ek arrow aaraha ki isne usko subscribe kiya hua hai
// ab issi basis pr hum ye pura function likhenge
const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params

    if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
    }

    // ye Aggregation pipeline likhdi hai humne
    const channel = await User.aggregate([
        // 📌 Stage 1: Match the user by username (case-insensitive)
        {
            $match: {
                username: username?.toLowerCase() // Find the user whose username matches the input
            }
        },

        // 📌 Stage 2: Lookup subscribers for this user (i.e., people who have subscribed to this channel)
        {
            $lookup: {
                from: "subscriptions",           // The name of the collection to join (subscriptions)
                /*
                    🔹 localField is the field from your current collection,
                    🔹 foreignField is the field from the other collection,
                    🔄 MongoDB matches documents where these two fields are equal during a $lookup.
                */
                localField: "_id",               // Local field from the User collection (_id of the channel)
                foreignField: "channel",         // Foreign field in subscriptions where 'channel' matches the User _id
                as: "subscribers"                // Output array field to store matched documents
            }
        },

        // 📌 Stage 3: Lookup channels that this user has subscribed to
        {
            $lookup: {
                from: "subscriptions",           // Again, using the subscriptions collection
                localField: "_id",               // Current user’s _id
                foreignField: "subscriber",      // Find records where this user is the subscriber
                as: "subscribedTo"               // Output array field for channels this user is subscribed to
            }
        },

        // 📌 Stage 4: Add computed fields
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"        // Count of subscribers (people who follow this user/channel)
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"       // Count of channels this user is subscribed to
                },
                isSubscribed: {
                    $cond: {
                        if: {
                            // $in checks if a value exists inside an array.
                            $in: [
                                req.user?._id,                   // Check if current logged-in user’s ID
                                "$subscribers.subscriber"        // exists in the list of subscribers
                            ]
                        },
                        then: true,                              // If yes, user is subscribed
                        else: false                             // Otherwise, not subscribed
                    }
                }
            }
        },

        // 📌 Stage 5: Project the final fields to include in the response
        {
            // $project is used to pick which fields you want in the final output — like a filter for fields. You can also rename, hide, or create new fields.
            $project: {
                fullName: 1,                      // Include fullName
                username: 1,                      // Include username
                subscribersCount: 1,              // Include total number of subscribers
                channelsSubscribedToCount: 1,     // Include total number of subscriptions
                isSubscribed: 1,                  // Whether the current user is subscribed
                avatar: 1,                        // Include profile image URL
                coverImage: 1,                    // Include cover image URL
                email: 1                          // Include email
            }
        }
    ]);


    if (!channel?.length) {
        throw new ApiError(404, "channel does not exists")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, channel[0], "User channel fetched successfully")
        )
})

// yha subpipeline likhenge 
const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                // We use new mongoose.Types.ObjectId() to convert the string _id from req.user into a proper MongoDB ObjectId, so that the $match stage works correctly.
                _id: new mongoose.Types.ObjectId(req.user._id)
                // In MongoDB, the _id field is of type ObjectId (not a plain string). But in most applications (like Express), req.user._id is received as a string.
            }
        },
        {
            $lookup: {
                from: "videos",                   // 🔁 Join with the 'videos' collection

                localField: "watchHistory",      // 👈 This is an array of ObjectIds in the User schema
                // Schema: watchHistory: [{ type: ObjectId, ref: "Video" }]

                foreignField: "_id",             // 🔍 We're matching each video ID in 'watchHistory' with the _id of documents in 'videos' collection

                as: "watchHistory",              // 📦 Output will be saved in a new array field also called 'watchHistory', 
                // but now containing full video documents instead of just ObjectIds

                pipeline: [                      // 🛠️ Sub-pipeline to further process each matched video
                    {
                        $lookup: {
                            from: "users",             // 🔁 Join with 'users' collection to get video owner's info
                            localField: "owner",       // 👈 Field in 'videos' schema that holds the owner's user ID
                            // Schema: owner: { type: ObjectId, ref: "User" }

                            foreignField: "_id",       // 🔍 Match video.owner with user._id
                            as: "owner",               // 📦 Temporarily creates an array with matching user(s)

                            pipeline: [                // 🔍 Sub-pipeline to project only needed fields of the owner
                                {
                                    $project: {
                                        fullName: 1,         // Only include fullName
                                        username: 1,         // Include username
                                        avatar: 1            // Include avatar (profile picture)
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"         // 👤 Convert 'owner' array to a single object (since each video has only one owner)
                                // This makes the structure cleaner in the final output
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user[0].watchHistory,
                "Watch history fetched successfully"
            )
        )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
}


/*
What is the MongoDB Aggregation Pipeline?
The Aggregation Pipeline in MongoDB is a framework for data transformation and analysis.
It allows developers to process data records and return computed results by passing documents through a multi-stage
pipeline, where each stage performs a specific operation on the input data.

🔧 How It Works

The pipeline is defined as an array of stages, with each stage represented as a document that uses aggregation operators to perform tasks like:
Filtering ($match)
Projection ($project)
Grouping ($group)
Sorting ($sort)
Joining ($lookup)
Pagination ($skip, $limit)
Reshaping ($unwind, $addFields, etc.)
Each stage takes in a stream of documents, performs its operation, and passes the resulting documents to the next stage.

simply means ki har stage mein in pipeline data refine hota ja rha based on different factors / conditions .   
*/









