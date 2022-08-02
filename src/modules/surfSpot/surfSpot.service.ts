import { ObjectID } from "bson";
import { SurfSpotClass, SurfSpotModel } from "./surfSpot.model.js";

export async function getSurfSpots() {
    return await SurfSpotModel.find().lean()
}

export async function getSurfSpotById(_id: ObjectID){
    return await SurfSpotModel.findOne({_id})
}

export async function createSurfSpot(newSurfSpot: SurfSpotClass) {
    return await SurfSpotModel.create(newSurfSpot)
}