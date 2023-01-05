import {Request, Response} from "express";
import {logger} from "../../../logger/winston";
import * as response from "../../msg/message";
import {errorUnknown, jwtNotVerify, limit} from "../../utils/MyVariables";
import {authorizationAdminServices} from "../../service/AuthorizationService";
import {PageTabulatorDto} from "../../model/Interface/IFilterTabulatorDto";
import {ICoupon} from "../../model/Interface/ICoupon";
import {
    deleteCouponServices, findAllCouponServices, findByPageCouponServices,
    findOneCouponServices,
    saveCouponServices,
    updateCouponServices
} from "../../service/admin/AdminCouponService";

export const saveCoupon = async function (req: Request, res: Response) {
    // Show log
    logger.info("request for save coupon");
    logger.debug(req.body);
    try {
        // Init author
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return response.err(jwtNotVerify, res);
        }
        //Verify author trước khi gọi service
        const verify = await authorizationAdminServices(authorization);
        if (verify) {
            // Init value
            const item = req.body as ICoupon;
            // Logic
            const itemService = await saveCouponServices(item);
            //  Trả về client
            return response.ok(itemService, res);
        } else {
            return response.err(jwtNotVerify, res);
        }
    } catch (e: unknown) {
        let err: string;
        if (e instanceof Error) {
            err = e.message;
        } else {
            err = errorUnknown;
        }
        return response.err(err, res);
    }
};

export const updateCoupon = async function (req: Request, res: Response) {
    // Show log
    logger.info("request for update coupon");
    logger.debug(req.body);
    try {
        // Init author
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return response.err(jwtNotVerify, res);
        }
        //Verify author trước khi gọi service
        const verify = await authorizationAdminServices(authorization);
        if (verify) {
            //Init value
            const item = req.body as ICoupon;
            //Logic
            const itemService = await updateCouponServices(item);
            //Trả về client
            return response.ok(itemService, res);
        } else {
            return response.err(jwtNotVerify, res);
        }
    } catch (e: unknown) {
        let err: string;
        if (e instanceof Error) {
            err = e.message;
        } else {
            err = errorUnknown;
        }
        return response.err(err, res);
    }
};

export const deleteCoupon = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for delete coupon:");
    logger.debug(req.body);
    try {
        //Init author
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return response.err(jwtNotVerify, res);
        }
        //Verify author trước khi gọi service
        const verify = await authorizationAdminServices(authorization);
        if (verify) {
            //Init value
            const item = req.body as ICoupon;
            //Logic
            const itemService = await deleteCouponServices(item);
            //Trả về client
            return response.ok(itemService, res);
        } else {
            return response.err(jwtNotVerify, res);
        }
    } catch (e: unknown) {
        let err: string;
        if (e instanceof Error) {
            err = e.message;
        } else {
            err = errorUnknown;
        }
        return response.err(err, res);
    }
};

export const findOneCoupon = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for find one coupon:");
    logger.debug(req.body);
    try {
        //Init author
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return response.err(jwtNotVerify, res);
        }
        //Verify author trước khi gọi service
        const verify = await authorizationAdminServices(authorization);
        if (verify) {
            // Init value
            const item = req.body as ICoupon;
            // Logic
            const itemService = await findOneCouponServices(item);
            // Trả về client
            return response.ok(itemService, res);
        } else {
            return response.err(jwtNotVerify, res);
        }
    } catch (e: unknown) {
        let err: string;
        if (e instanceof Error) {
            err = e.message;
        } else {
            err = errorUnknown;
        }
        return response.err(err, res);
    }
};

export const findByPageCoupon = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for find by page coupon:");
    logger.debug(req.body);
    try {
        //Init author
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return response.err(jwtNotVerify, res);
        }
        //Verify author trước khi gọi service
        const verify = await authorizationAdminServices(authorization);
        if (verify) {
            //Init value
            const ghost = req.body as ICoupon;
            //Logic
            const pagination: PageTabulatorDto = req.query.page
                ? JSON.parse(String(req.query.page))
                : {page: 1, size: limit, sorters: [], filters: []};
            const itemService = await findByPageCouponServices(ghost, pagination);
            //Trả về client
            return response.ok(itemService, res);
        } else {
            return response.err(jwtNotVerify, res);
        }
    } catch (e: unknown) {
        let err: string;
        if (e instanceof Error) {
            err = e.message;
        } else {
            err = errorUnknown;
        }
        return response.err(err, res);
    }
};

export const findAllCoupon = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for find all coupon:");
    logger.debug(req.body);
    try {
        //Init author
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return response.err(jwtNotVerify, res);
        }
        //Verify author trước khi gọi service
        const verify = await authorizationAdminServices(authorization);
        if (verify) {
            // Init value
            const item = req.body as ICoupon;
            // Logic
            const itemService = await findAllCouponServices(item);
            // Trả về client
            return response.ok(itemService, res);
        } else {
            return response.err(jwtNotVerify, res);
        }
    } catch (e: unknown) {
        let err: string;
        if (e instanceof Error) {
            err = e.message;
        } else {
            err = errorUnknown;
        }
        return response.err(err, res);
    }
};