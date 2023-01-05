import {logger} from "../../logger/winston";
import {Request, Response} from "express";
import * as response from "../msg/message";
import {env, errorUnknown, jwtNotVerify} from "../utils/MyVariables";
import {authorizationUserServices} from "../service/AuthorizationService";
import {IPlayer} from "../model/Interface/IPlayer";
import {
    loginPlayerServices,
    findOnePlayerServices, beginPlayPlayerServices, addLifePlayerServices
} from "../service/PlayerService";
import jwt, {VerifyErrors} from "jsonwebtoken";
import {decrypt} from "../utils/MyFunction";

export const loginPlayer = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for login player:");
    logger.debug(req.body);
    try {
        //Lấy param code trong request
        const authorization = req.query.code as string;
        //Verify
        jwt.verify(
            authorization,
            env.privateKeyAuthorazition,
            {},
            async function (err: VerifyErrors | null, decoded: any) {
                if (err) {
                    logger.error("error verify jwt : " + err.message);
                    return response.err(err.message, res);
                } else {
                    //Set cookie
                    let time = 365 * 24 * 60 * 60 * 1000; // lưu cookie trong 1 năm
                    res.cookie(env.nameCookie, authorization, {
                        maxAge: time,
                        httpOnly: false,
                        path: "/",
                        secure: false,
                        domain: env.domainCallback ? env.domainCallback : undefined,
                    });

                    //Init value,
                    const user = JSON.parse(decoded.account) as IPlayer;
                    //Logic
                    const response = await loginPlayerServices(user);
                    //Return
                    if (response) {
                        res.redirect(env.webClient + "/");
                    } else {
                        res.redirect(env.webClient + "/error-page");
                    }
                }
            }
        );
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

export const findOnePlayer = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for find one player:");
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
            const item = req.body as IPlayer;
            //Logic
            const itemService = await findOnePlayerServices(item, verify);
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

export const beginPlayPlayer = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for begin play player:");
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
            const item = req.body as IPlayer;
            //Logic
            const itemService = await beginPlayPlayerServices(item, verify);
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

export const addLifePlayer = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for add life player:");
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
            const item = req.body as IPlayer;
            //Logic
            const itemService = await addLifePlayerServices(item, verify);
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
