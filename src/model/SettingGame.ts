import mongoose, {Schema} from "mongoose";
import {ISettingGame} from "./Interface/ISettingGame";

const schema = new Schema<ISettingGame>({
    name: {type: String},
    playTime: {type: Number, max: 9999, min: 0},
    playLife: {type: Number, max: 9999, min: 0},
    appearGhost: {type: Number, max: 9999, min: 0},
    stopGame: {type: "Boolean"},
    isDefault: {type: "Boolean"},
    endEvent: {type: Date}
}, {timestamps: true, autoCreate: true});

// 3. Create a Model.
const SettingGame = mongoose.model<ISettingGame>("SettingGame", schema);
export default SettingGame;