export interface ICoupon {
    _id: string;
    name: string; //tên coupon
    value: number; //giá trị giảm
    unit: string; //đơn vị giảm
    codeManualList: ICodeManual[]; // mã thủ công
    free: boolean; //check coupon này giảm 100% phí hay ko
    probability: number; //tỷ lệ xuất hiện random %
    autoProbability: boolean; //tự động tính xác suất
    count: number; //giảm dần số lần đã xuất hiện
    enable: boolean; //kích hoạt phần thưởng hay ko
}

export interface ICodeManual{
    code: string;
    expired: Date;
}