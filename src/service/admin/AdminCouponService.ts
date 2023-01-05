import {errorGreaterThan, errorMsg, errorUnknown, limit} from "../../utils/MyVariables";
import mongoose from "mongoose";
import {PageTabulatorDto} from "../../model/Interface/IFilterTabulatorDto";
import {ICoupon} from "../../model/Interface/ICoupon";
import Coupon from "../../model/Coupon";

export const saveCouponServices = async function (data: ICoupon): Promise<any> {
    try {
        //Xử lý trường hợp nếu xác suất = auto
        if(data.autoProbability) data.probability = 0;
        else if(data.probability === 0) data.autoProbability = true;
        const itemCreate = new Coupon({
            name: data.name,
            value: data.value,
            unit: data.unit,
            free: data.free,
            codeManualList: data.codeManualList,
            probability: data.probability,
            autoProbability: data.autoProbability,
            count: data.count,
            enable: data.enable,
        });
        //check total sum probability
        const totalProbability = await totalPercentProbability();
        if(data.probability + totalProbability >= 100){
            return errorGreaterThan;
        }
        else{
            // Lưu
            await itemCreate.save();
            // Trả về kết quả
            return itemCreate;
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

export const updateCouponServices = async function (data: ICoupon): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì update
        const itemUpdate = await Coupon.findOne({
            _id: new mongoose.Types.ObjectId(data._id),
        });
        //Cập nhật
        if (itemUpdate) {
            //Xử lý trường hợp nếu xác suất = auto
            if(data.autoProbability) data.probability = 0;
            else if(data.probability === 0) data.autoProbability = true;
            //init object
            itemUpdate.name = data.name;
            itemUpdate.value = data.value;
            itemUpdate.unit = data.unit;
            itemUpdate.free = data.free;
            itemUpdate.codeManualList = data.codeManualList;
            itemUpdate.probability = data.probability;
            itemUpdate.autoProbability = data.autoProbability;
            itemUpdate.count = data.count;
            itemUpdate.enable = data.enable;
            //check total sum probability
            const totalProbability = await totalPercentProbability();
            if(data.probability + totalProbability > 100){
                return errorGreaterThan;
            }
            else{
                //Update
                await itemUpdate.save();
                //Trả kết quả
                return itemUpdate;
            }
        }
        else{
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

export const deleteCouponServices = async function (data: ICoupon): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì delete
        const itemDelete = await Coupon.findOneAndDelete({
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

export const findOneCouponServices = async function (
    data: ICoupon
): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì delete
        const itemFind = await Coupon.findOne({
            _id: new mongoose.Types.ObjectId(data._id),
        });
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

export const findByPageCouponServices = async function (
    data: ICoupon,
    pagination: PageTabulatorDto
): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì find
        const condition: any = {};
        if (data._id) condition._id = new mongoose.Types.ObjectId(data._id);
        //Filter (nếu có)
        const pageNo = Number(pagination.page);
        const itemCount = await Coupon.find(condition).count();
        const maxPage = pagination.size < limit ? pagination.size : limit;
        const lastPage = Math.ceil(itemCount / maxPage); // tổng số các page
        const itemFind = await Coupon.find(condition)
            .skip(maxPage * pageNo - maxPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(maxPage)
            .sort({name: 1});
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

export const findAllCouponServices = async function (_data: ICoupon): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì find
        const condition: any = {};
        condition.enable = true;
        const itemFind = await Coupon.find(condition)
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

//Custom method
async function totalPercentProbability(): Promise<any> {
    //Lấy tổng số phần trăm hiện tại ngoại trừ _id đang xử lý
    return Coupon.aggregate([
        {
            $group: {
                _id: "sum_probability",
                count: {
                    $sum: "$probability"
                }
            }
        }
    ]);
}
