import mongoose, { Schema } from "mongoose";


const countSchema = new Schema(
    {
        type: {
            type: String,
            enums: ['ADD', 'UPDATE'],
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true
    }
)



export const Count = mongoose.model("Count", countSchema)