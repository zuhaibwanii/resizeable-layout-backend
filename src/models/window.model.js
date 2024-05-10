import mongoose, { Schema } from "mongoose";


const windowSchema = new Schema(
    {
        active: {
            type: Boolean,
            default: true
        },
        windowOne: {
            type: String,
            required: true,
            trim: true,
        },  
        windowTwo: {
            type: String,
            required: true,
            trim: true,
        },  
        windowThree: {
            type: String,
            required: true,
            trim: true,
        },  
    },
    {
        timestamps: true
    }
)



export const Window = mongoose.model("Window", windowSchema)
