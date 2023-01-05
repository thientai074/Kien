import mongoose, {Schema} from "mongoose";
import {IGhost} from "./Interface/IGhost";

const schema = new Schema<IGhost>({
        width: {type: Number, max: 9999, min: 0},
        height: {type: Number, max: 9999, min: 0},
        name: {type: String, maxlength: 4000},
        coupon: {type: String, maxlength: 4000},
        chance: {type: Number, max: 100, min: 0},
        image: {type: String, maxlength: 4000},
        releaseTime: {type: Number, max: 9999, min: 0},
        countSpace: {type: Number, max: 9999, min: 0},
        enable: {type: "Boolean"},
        speed: {type: Number, max: 9999999, min: 0},
    },
    {timestamps: true, autoCreate: true}
);

// 3. Create a Model
const Ghost = mongoose.model<IGhost>("Ghost", schema);
export default Ghost;
