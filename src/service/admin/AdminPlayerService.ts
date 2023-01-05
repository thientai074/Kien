import {
    errorMsg,
    errorUnknown,
    existedMsg,
    limit,
} from "../../utils/MyVariables";
import mongoose from "mongoose";
import {IPlayer} from "../../model/Interface/IPlayer";
import {PageTabulatorDto} from "../../model/Interface/IFilterTabulatorDto";
import Player from "../../model/Player";

export const savePlayerServices = async function (data: IPlayer): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì báo lỗi
        let itemCreate = await Player.findOne({email: data.email});
        //Thêm mới
        if (!itemCreate) {
            itemCreate = new Player({
                email: data.email,
                fullname: data.fullname,
                phone: data.phone,
                avatar: data.avatar,
                life: data.life,
                isAdmin: data.isAdmin,
                settingGameId: data.settingGameId,
                couponDetailList: data.couponDetailList,
            });
            //Lưu
            await itemCreate.save();
            //Trả kết quả
            return itemCreate;
        }
        //Báo lỗi
        else {
            return existedMsg;
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

export const updateCustomPlayerServices = async function (
    data: IPlayer
): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì update
        const itemUpdate = await Player.findOne({
            _id: new mongoose.Types.ObjectId(data._id),
        });
        //Cập nhật
        if (itemUpdate) {
            //init object
            itemUpdate.life = data.life;
            itemUpdate.email = data.email;
            itemUpdate.phone = data.phone;
            itemUpdate.fullname = data.fullname;
            itemUpdate.avatar = data.avatar;
            itemUpdate.isAdmin = data.isAdmin;
            itemUpdate.settingGameId = data.settingGameId;
            itemUpdate.couponDetailList = data.couponDetailList;
            //Update
            await itemUpdate.save();
            //Trả kết quả
            return itemUpdate;
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

export const deletePlayerServices = async function (
    data: IPlayer
): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì delete
        const itemDelete = await Player.findOneAndDelete({
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

export const adminFindOnePlayerServices = async function (
    data: IPlayer, verify: string
): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì delete
        const itemFind = await Player.findOne({
            _id: new mongoose.Types.ObjectId(data._id ? data._id : verify),
        })
            .populate("settingGameId")
            .select("+isAdmin");
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

export const findByPagePlayerServices = async function (
    data: IPlayer,
    pagination: PageTabulatorDto
): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì find
        const condition: any = {};
        if (data._id) condition._id = new mongoose.Types.ObjectId(data._id);
        if (data.email) condition.email = data.email;
        if (data.phone) condition.phone = data.phone;
        //Filter (nếu có)
        const pageNo = Number(pagination.page);
        const itemCount = await Player.find(condition).count();
        const maxPage = pagination.size < limit ? pagination.size : limit;
        const lastPage = Math.ceil(itemCount / maxPage); // tổng số các page
        const itemFind = await Player.find(condition)
            .skip(maxPage * pageNo - maxPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(maxPage)
            .populate('settingGameId')
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
}
