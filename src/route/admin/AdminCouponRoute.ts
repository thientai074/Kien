import e from "express";
import {
    deleteCoupon, findAllCoupon,
    findByPageCoupon,
    findOneCoupon,
    saveCoupon,
    updateCoupon
} from "../../controller/admin/AdminCouponController";

export const adminCouponRoute = function (app: e.Application) {
    app.route("/api/coupon/save").post(saveCoupon);
    app.route("/api/coupon/update").post(updateCoupon);
    app.route("/api/coupon/delete").post(deleteCoupon);
    app.route("/api/coupon/find-one").post(findOneCoupon);
    app.route("/api/coupon/find-by-page").post(findByPageCoupon);
    app.route("/api/coupon/find-all").post(findAllCoupon);
};
