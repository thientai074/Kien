import {errorMsg, errorNoLife, errorUnknown} from "../utils/MyVariables";
import mongoose from "mongoose";
import {ICouponDetail, IPlayer} from "../model/Interface/IPlayer";
import Player from "../model/Player";
import SettingGame from "../model/SettingGame";
import {decrypt} from "../utils/MyFunction";

export const loginPlayerServices = async function (data: IPlayer): Promise<any> {
    try {
        let itemCreateUpdate: any;
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu chưa thì tạo mới, nếu có thì update
        itemCreateUpdate = await Player.findOne({email: data.email});
        //nếu tồn tại -> update
        if (itemCreateUpdate) {
            itemCreateUpdate.phone = data.phone;
            itemCreateUpdate.fullname = data.fullname;
            itemCreateUpdate.avatar = data.avatar;
            itemCreateUpdate.affSource = itemCreateUpdate.affSource ? itemCreateUpdate.affSource : data.affSource;
            await itemCreateUpdate.save();
        }
        ///nếu ko tồn tại -> save
        else {
            //Lấy bản ghi default trong setting game
            const settingGameFind = await SettingGame.findOne({isDefault: true});
            if (settingGameFind) {
                itemCreateUpdate = new Player({
                    email: data.email,
                    fullname: data.fullname,
                    phone: data.phone,
                    avatar: data.avatar,
                    life: settingGameFind.playLife,
                    settingGameId: settingGameFind._id,
                    isAdmin: false,
                });
                await itemCreateUpdate.save();
            }
        }
        return itemCreateUpdate;
    } catch (e: unknown) {
        let err: string;
        if (e instanceof Error) {
            err = e.message;
        } else {
            err = errorUnknown;
        }
        return {error: err};
    }
};

export const findOnePlayerServices = async function (data: IPlayer, verify: string): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì delete
        const itemFind = await Player.findOne({_id: new mongoose.Types.ObjectId(verify),})
            .populate("settingGameId")
            .select("+isAdmin");
        if (itemFind) {
            //Kiểm tra có aff không, nếu có thì update
            if (!itemFind.affSource && data.affSource) {
                itemFind.affSource = data.affSource;
                await itemFind.save();
            }
            //Trả kết quả
            return itemFind;
        } else {
            return errorMsg;
        }
    } catch (e: unknown) {
        let err: string;
        if (e instanceof Error) {
            err = e.message;
        } else {
            err = errorUnknown;
        }
        return {error: err};
    }
};

export const beginPlayPlayerServices = async function (data: IPlayer, verify: string): Promise<any> {
    try {

        const settingGame = await SettingGame.findOne({isDefault: true})

        // Kiểm tra xem quá ngày hết event chưa, nếu đã qua thì
        if (settingGame && (new Date(settingGame.endEvent) > new Date(Date.now()))) {
            //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì update
            const itemUpdate = await Player.findOne({_id: new mongoose.Types.ObjectId(verify),});
            //Cập nhật
            if (itemUpdate) {
                if (itemUpdate.life > 0) {
                    //init object
                    itemUpdate.life--;
                    //Update
                    await itemUpdate.save();
                    //Trả kết quả
                    return itemUpdate;
                } else {
                    return errorNoLife;
                }
            } else {
                return errorMsg;
            }
        } else {
            return errorMsg;
        }

    } catch (e: unknown) {
        let err: string;
        if (e instanceof Error) {
            err = e.message;
        } else {
            err = errorUnknown;
        }
        return {error: err};
    }
};

export const addLifePlayerServices = async function (data: IPlayer, verify: string): Promise<any> {
    try {
        const settingGame = await SettingGame.findOne({isDefault: true})
        // Kiểm tra xem quá ngày hết event chưa, nếu đã qua thì
        if (settingGame && (new Date(settingGame.endEvent) > new Date(Date.now()))) {
            //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì update
            const itemUpdate = await Player.findOne({_id: new mongoose.Types.ObjectId(verify),});
            //Cập nhật
            if (itemUpdate) {
                //các logic đạt điều kiện thì mới thêm life
                if (itemUpdate.life === 0 && settingGame.playLife >= itemUpdate.life) {
                    //giải mã
                    const sharedFbDate = new Date(decrypt(data.sharedFbDate));
                    //logic nếu ngày giải mã lớn hn thời gian hiện tại và nhỏ hơn thời gian tương lai <= 10p thì pass
                    const dateNow = new Date();
                    const dateMax = new Date();
                    dateMax.setMinutes(dateNow.getMinutes() + 10)
                    if(sharedFbDate > dateNow && sharedFbDate <= dateMax){
                        //set life
                        itemUpdate.life = 3;
                        //Update
                        await itemUpdate.save();
                    }
                    //Trả kết quả
                    return itemUpdate;
                } else {
                    return errorNoLife;
                }
            } else {
                return errorMsg;
            }
        } else {
            return errorMsg;
        }

    } catch (e: unknown) {
        let err: string;
        if (e instanceof Error) {
            err = e.message;
        } else {
            err = errorUnknown;
        }
        return {error: err};
    }
};
