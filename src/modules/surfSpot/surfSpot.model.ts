// import { prop, getModelForClass } from "@typegoose/typegoose";

import pkg from '@typegoose/typegoose';
const { prop, getModelForClass } = pkg;
import {ObjectID} from 'bson';


export class SurfSpotClass {
    @prop({required: true})
    public spot: string

    @prop({required: true})
    public location: string

    @prop({required: true})
    public region: string

    @prop({required: true})
    public latlng: string

    @prop({required: true})
    public buoyId: string
}

export const SurfSpotModel = getModelForClass(SurfSpotClass)