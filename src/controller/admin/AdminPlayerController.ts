import {logger} from "../../../logger/winston";
import {Request, Response} from "express";
import * as response from "../../msg/message";
import {errorUnknown, jwtNotVerify, limit} from "../../utils/MyVariables";
import {authorizationAdminServices} from "../../service/AuthorizationService";
import {IPlayer} from "../../model/Interface/IPlayer";
import {
    deletePlayerServices,
    findByPagePlayerServices, savePlayerServices,
    updateCustomPlayerServices,
    adminFindOnePlayerServices
} from "../../service/admin/AdminPlayerService";
import {PageTabulatorDto} from "../../model/Interface/IFilterTabulatorDto";

export const savePlayer = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for save player:");
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
            const item = req.body as IPlayer;
            //Logic
            const itemService = await savePlayerServices(item);
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

//Admin update custom player
export const updateCustomPlayer = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for update custom player:");
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
            const item = req.body as IPlayer;
            //Logic
            const itemService = await updateCustomPlayerServices(item);
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

export const deletePlayer = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for delete player:");
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
            const item = req.body as IPlayer;
            //Logic
            const itemService = await deletePlayerServices(item);
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

export const adminFindOnePlayer = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for find one admin:");
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
            const item = req.body as IPlayer;
            //Logic
            const itemService = await adminFindOnePlayerServices(item, verify);
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

export const findByPagePlayer = async function (req: Request, res: Response) {
    //Show log
    logger.info("request for find by page player:");
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
            const user = req.body as IPlayer;
            //Logic
            const pagination: PageTabulatorDto = req.query.page
                ? JSON.parse(String(req.query.page))
                : {page: 1, size: limit, sorters: [], filters: []};
            const itemService = await findByPagePlayerServices(user, pagination);
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
