import {
    errorMsg,
    errorUnknown, requestGetCoupon,
} from "../utils/MyVariables";
import {IGhost} from "../model/Interface/IGhost";
import Ghost from "../model/Ghost";
import SettingGame from "../model/SettingGame";
import Player from "../model/Player";
import mongoose from "mongoose";
import Coupon from "../model/Coupon";
import ProbabilityPick from "probability-pick";
import {ICouponDetail} from "../model/Interface/IPlayer";
import axios from "axios";

export const findAllGhostServices = async function (_data: IGhost): Promise<any> {
    try {
        //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì find
        const condition: any = {};
        condition.enable = true;
        const itemFind = await Ghost.find(condition)
            .sort({speed: -1});
        if (itemFind) {
            //init value return
            const ghostAppearList: IGhost[] = [];
            //Giảm số lượng ghost theo tùy chỉnh game
            const settingGame = await SettingGame.findOne();
            if (settingGame && !settingGame.stopGame) {
                for (let i = 0; i < settingGame.appearGhost; i++) {
                    if (itemFind[i]) {
                        ghostAppearList.push(itemFind[i]);
                    }
                }
            }

            return ghostAppearList;
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

export const catchedGhostServices = async function (data: ICouponDetail, verify: string): Promise<any> {
    try {
        const settingGame = await SettingGame.findOne({isDefault: true})

        const playerFind = await Player.findOne({_id: new mongoose.Types.ObjectId(verify),});

        // Kiểm tra xem quá ngày kết thúc sự kiện chưa và check xem số lượt chơi còn lại của khác hàng, nếu sai thì ko cho bắt ma và nhận phần thưởng
        if (settingGame && playerFind && (playerFind.life >= 0) && (new Date(settingGame.endEvent) > new Date(Date.now()))) {
            let couponDetailResult: ICouponDetail = {
                _id: '',
                ghostId: '',
                data: '',
                couponId: '',
                affSource: '',
                code: '',
                customerEmail: '',
                description: '',
                endDate: new Date(),
                promotionValue: 0,
                type: ''
            };
            //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì tìm tiếp ghost
            const playerFind = await Player.findOne({_id: new mongoose.Types.ObjectId(verify),});
            //Cập nhật
            if (playerFind) {
                //find setting game
            const settingGameFind = await SettingGame.findOne({_id: new mongoose.Types.ObjectId(playerFind.settingGameId)});
            if(settingGameFind){
                //Kiểm tra số lượt chơi không vượt quá cấu hình lượt chơi
                // const countCoupon = playerFind.couponDetailList ? playerFind.couponDetailList.length : 0;
                if(settingGameFind.playLife > playerFind.life){
                    //find ghost
                    const ghostFind = await Ghost.findOne({_id: new mongoose.Types.ObjectId(data._id), enable: true});
                    if (ghostFind) {
                        //init value
                        const dataPicker: any = {};
                        //Lấy toàn bộ phần thưởng với điều kiện
                        const couponFind = await Coupon.find({enable: true});
                        if (couponFind) {
                            //Duyệt từng phần thưởng
                            for (const coupon of couponFind) {
                                //Check nếu count > 0 thì mới gán vào xác suất
                                if (coupon.count > 0) {
                                    if (coupon.autoProbability) {
                                        dataPicker[coupon._id] = "auto";
                                    } else {
                                        dataPicker[coupon._id] = coupon.probability;
                                    }
                                }
                            }
                            if (Object.keys(dataPicker).length > 0) {
                                //init logic xác suất
                                const picker = new ProbabilityPick(dataPicker);
                                let couponGet = picker.get();
                                //Dựa vào thông số chance để tạo vòng lặp, tìm coupon có probability thấp nhất
                                for (let i = 0; i < ghostFind.chance; i++) {
                                    const couponChance = picker.get();
                                    const probabilityPick: any = picker;
                                    if (probabilityPick.config[couponChance.value as string] < probabilityPick.config[couponGet.value as string]) {
                                        couponGet = couponChance;
                                    }
                                }
                                //Dựa vào kết quả được lấy ra , tìm theo _id trong hệ thống để trả kết quả
                                if (couponGet.value) {
                                    const idCouponGeted = couponGet.value as string;
                                    const dataCouponFind = await Coupon.findOne({
                                        _id: new mongoose.Types.ObjectId(idCouponGeted),
                                        enable: true
                                    });
                                    if (dataCouponFind) {
                                        //Giảm số lần xuất hiện
                                        dataCouponFind.count--;
                                        //Set các giá trị cần để trả về hoặc gọi request
                                        couponDetailResult.affSource = playerFind.affSource;
                                        couponDetailResult.customerEmail = playerFind.email;
                                        couponDetailResult.description = dataCouponFind.name;
                                        couponDetailResult.promotionValue = dataCouponFind.value;
                                        if (dataCouponFind.free) couponDetailResult.type = 'free-domain';
                                        //Kiểm tra còn mã thủ công được thêm vào không, nếu có thì ưu tiên dùng mã thủ công trước
                                        if(dataCouponFind.codeManualList && dataCouponFind.codeManualList.length > 0){
                                            couponDetailResult.code = dataCouponFind.codeManualList[0].code;
                                            couponDetailResult.endDate = dataCouponFind.codeManualList[0].expired;
                                            //Loại bỏ coupon đã sử dụng
                                            const couponIndex = dataCouponFind.codeManualList.findIndex(data => data.code === couponDetailResult.code);
                                            if(couponIndex >= 0){
                                                dataCouponFind.codeManualList.splice(couponIndex, 1);

                                        }
                                        }else{
                                            //Gọi request iNET để lấy mã coupon
                                            const instance = axios.create({
                                                baseURL: requestGetCoupon,
                                                timeout: 10000,
                                                headers: {'x-token-api': '8hGAd_4xwCx9e2WVIUK5LlMN7fUhKk'}
                                            });
                                            const responseGetCoupon = await instance.post('', couponDetailResult);
                                            if(responseGetCoupon.data){
                                                const couponDetailResponse = responseGetCoupon.data as ICouponDetail;
                                                //Set các giá trị còn lại để trả response
                                                couponDetailResult.code = couponDetailResponse.code;
                                                couponDetailResult.endDate = couponDetailResponse.endDate;
                                            }
                                        }
                                        //Lưu danh sách quà cho player
                                        playerFind.couponDetailList.push(couponDetailResult);
                                        //lưu db
                                        await dataCouponFind.save();
                                        await playerFind.save();
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    return errorMsg;
                    }
                }
                //Trả kết quả sau khi xử lý
                return couponDetailResult;
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
