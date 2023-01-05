import {errorMsg, errorUnknown, limit} from "../../utils/MyVariables";
import mongoose from "mongoose";
import {PageTabulatorDto} from "../../model/Interface/IFilterTabulatorDto";
import {ISettingGame} from "../../model/Interface/ISettingGame";
import SettingGame from "../../model/SettingGame";
import {ICoupon} from "../../model/Interface/ICoupon";
import Coupon from "../../model/Coupon";

export const saveSettingGameServices = async function (
    data: ISettingGame
): Promise<any> {
    try {
        const itemCreate = new SettingGame({
            name: data.name,
            playTime: data.playTime,
            playLife: data.playLife,
            appearGhost: data.appearGhost,
            stopGame: data.stopGame,
            isDefault: data.isDefault,
            endEvent: data.endEvent,
        });

        if (data.isDefault) {
            await SettingGame.find({isDefault: true}).updateMany({
                isDefault: false,
            });
        }
        // Lưu
        await itemCreate.save();
        // Trả về kết quả
        return itemCreate;
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

export const deleteSettingGameServices = async function (
    data: ISettingGame
): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì delete
        const itemDelete = await SettingGame.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(data._id),
        });
        if (itemDelete) {
            //Trả kết quả
            return itemDelete;
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

export const findByPageSettingGameServices = async function (
    data: ISettingGame,
    pagination: PageTabulatorDto
): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì find
        const condition: any = {};
        if (data._id) condition._id = new mongoose.Types.ObjectId(data._id);
        //Filter (nếu có)
        const pageNo = Number(pagination.page);
        const itemCount = await SettingGame.find(condition).count();
        const maxPage = pagination.size < limit ? pagination.size : limit;
        const lastPage = Math.ceil(itemCount / maxPage); // tổng số các page
        const itemFind = await SettingGame.find(condition)
            .skip(maxPage * pageNo - maxPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(maxPage)
            .sort({updatedAt: -1});
        if (itemFind) {
            return {data: itemFind, last_page: lastPage, max_item: itemCount};
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

export const updateSettingGameServices = async function (
    data: ISettingGame
): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì update
        const itemUpdate = await SettingGame.findOne({
            _id: new mongoose.Types.ObjectId(data._id),
        });
        //Cập nhật
        if (itemUpdate) {
            //init object
            itemUpdate.name = data.name;
            itemUpdate.playTime = data.playTime;
            itemUpdate.playLife = data.playLife;
            itemUpdate.appearGhost = data.appearGhost;
            itemUpdate.stopGame = data.stopGame;
            itemUpdate.isDefault = data.isDefault;
            itemUpdate.endEvent = data.endEvent;

            if (data.isDefault) {
                await SettingGame.find({_id: {$ne: data._id}}).updateMany({
                    isDefault: false,
                });
            }
            //Update
            await itemUpdate.save();
            //Trả kết quả
            return itemUpdate;
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

export const findOneSettingGameServices = async function (
    data: ISettingGame
): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì find
        const itemFind = await SettingGame.findOne({_id: new mongoose.Types.ObjectId(data._id),});
        if (itemFind) {
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

export const findAllSettingGameServices = async function (_data: ISettingGame): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì find
        const condition: any = {};
        const itemFind = await SettingGame.find(condition)
            .sort({name: -1});
        if (itemFind) {
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
