import {logger} from "../../logger/winston";
import {Request, Response} from "express";
import * as response from "../msg/message";
import {errorUnknown, jwtNotVerify} from "../utils/MyVariables";
import {authorizationUserServices} from "../service/AuthorizationService";
import {IGhost} from "../model/Interface/IGhost";
import {
    catchedGhostServices, findAllGhostServices,
} from "../service/GhostService";
import {ICouponDetail} from "../model/Interface/IPlayer";
import {decrypt} from "../utils/MyFunction";

export const findAllGhost = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for find all:");
    logger.debug(req.body);
    try {
        //Init author
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return response.err(jwtNotVerify, res);
        }
        //Verify author trước khi gọi service
        const verify = await authorizationUserServices(authorization);
        if (verify) {
            //Init value
            const ghost = req.body as IGhost;
            //Logic
            const itemService = await findAllGhostServices(ghost);
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

export const catchedGhost = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for catched ghost:");
    logger.debug(req.body);
    try {
        //Init author
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return response.err(jwtNotVerify, res);
        }
        //Verify author trước khi gọi service
        const verify = await authorizationUserServices(authorization);
        if (verify) {
            //Init value
            const item = req.body as ICouponDetail;
            const body: ICouponDetail = {
                _id: '',
                ghostId: '',
                affSource: '',
                data: '',
                couponId: '',
                code: '',
                customerEmail: '',
                description: '',
                endDate: new Date(),
                promotionValue: 0,
                type: ''
            };
            //decode object
            if (item.data) {
                const data = JSON.parse(decrypt(item.data)) as ICouponDetail;
                body._id = data.ghostId;
            }
            //Logic
            const itemService = await catchedGhostServices(body, verify);
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
