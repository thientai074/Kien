import mongoose, {Schema} from "mongoose";
import {ICouponDetail, IPlayer} from "./Interface/IPlayer";

const schema = new Schema<IPlayer>({
    life: {type: Number},
    settingGameId: {type: String, ref: 'SettingGame'},
    email: {type: String},
    phone: {type: String},
    fullname: {type: String},
    avatar: {type: String},
    couponDetailList: [] as ICouponDetail[],
    affSource: {type: String},
    isAdmin: {type: "Boolean", select: false},
}, {timestamps: true, autoCreate: true});

// 3. Create a Model.
const Player = mongoose.model<IPlayer>("Player", schema);
export default Player;
