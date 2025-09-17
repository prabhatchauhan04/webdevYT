import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // ye mongoose package allow krta hai aggregation queries likhne k liye

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, // cloudinary hi bta deta hai ki video ki kitni duration hai after upload
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true
    }
)

// ye khud ka plugin add krdiya
// ab hum yha aggregation queries bhi likh sakte hai
// ye plugin bhi ek hook hi hai mongoose ka
videoSchema.plugin(mongooseAggregatePaginate) 

export const Video = mongoose.model("Video", videoSchema)