//models
import { Window } from "../models/window.model.js"
import { Count } from "../models/count.model.js"

//utils
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import isEmpty from "../utils/isEmpty.js";

const createWindowData = async (req, res) => {
    try {
        let { windowOne, windowTwo, windowThree } = req.body;

        if ([windowOne, windowTwo, windowThree].some(field => isEmpty(field))) {
            return res.status(400).json(new ApiError(400, "All fields are required"));
        }


        const newWindowData = await Window.create({ windowOne, windowTwo, windowThree });

        if (!newWindowData) return res.status(500).json(new ApiResponse(500, null, "Something went wrong while saving window data."));

        //CREATING NEW ENTRY IN COUNT TABLE
        await Count.create({ type:'ADD' });

        return res.status(201).json(new ApiResponse(201, newWindowData, "Saved successfully"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal server error", error?.errors || error));
    }
}

const getWindowData = async (req, res) => {
    try {
        let latestWindowData = await Window.aggregate([
            { $sort: { createdAt: -1 } },
            { $limit: 1 }
        ]);
        let totalCount = await Count.countDocuments();

        return res.status(200).json(new ApiResponse(200, { data: latestWindowData, totalCount }, "Success"));

    } catch (error) {
        console.log('error = ', error);
        return res.status(500).json(new ApiError(500, "Internal server error", error?.errors || error));
    }
}

const updateWindowData = async (req, res) => {
    try {
        let { id, windowOne, windowTwo, windowThree } = req.body;

        if ([id, windowOne, windowTwo, windowThree].some(field => isEmpty(field))) {
            return res.status(400).json(new ApiError(400, "All fields are required"));
        }

        const fieldsToBeUpdated = { windowOne, windowTwo, windowThree }

        const updatedWindowData = await Window.findOneAndUpdate(
            { _id: id },
            { $set: fieldsToBeUpdated },
            { new: true } // Return the updated document
        );

        if (!updatedWindowData) return res.status(500).json(new ApiResponse(500, null, "Something went wrong while updating window data."));

        //CREATING NEW ENTRY IN COUNT TABLE
        await Count.create({ type:'UPDATE' });

        return res.status(201).json(new ApiResponse(201, updatedWindowData, "Updated successfully"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal server error", error?.errors || error));
    }
}




export {
    createWindowData,
    getWindowData,
    updateWindowData
}