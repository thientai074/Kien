export interface IPlayer {
    _id: string;
    life: number; //số lần chơi
    settingGameId: string;
    email: string; //thông tin KH
    phone: string; //thông tin KH
    fullname: string; //thông tin KH
    avatar: string; //thông tin KH
    isAdmin: boolean;
    affSource: string; //người giới thiệu
    couponDetailList: ICouponDetail[];
    sharedFbDate: string;
}

export interface ICouponDetail {
    _id: string;
    couponId: string;
    code: string; //mã coupon
    affSource: string; //người giới thiệu cho iNET
    description: string; //tên coupon
    promotionValue: number; //giá trị được giảm giá
    customerEmail: string; //email người chơi
    endDate: Date; //ngày hết hạn coupon
    type: string; //kiểu miến phí domain
    ghostId: string; //client only
    data: string; //client only
}