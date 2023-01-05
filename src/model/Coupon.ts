import mongoose, {Schema} from "mongoose";
import {ICodeManual, ICoupon} from "./Interface/ICoupon";

const schema = new Schema<ICoupon>({
    name: {type: String, maxlength: 4000},
    value: {type: Number, min: 0},
    unit: {type: String, maxlength: 4000, default: '%'},
    codeManualList: {type: [] as ICodeManual[]},
    free: {type: "Boolean"},
    probability: {type: Number, max: 99, min: 0},
    count: {type: Number, min: 0},
    autoProbability: {type: "Boolean"},
    enable: {type: "Boolean"},
}, {timestamps: true, autoCreate: true});

// 3. Create a Model.
const Coupon = mongoose.model<ICoupon>("Coupon", schema);
export default Coupon;