import {env} from "../utils/MyVariables";
import {logger} from "../../logger/winston";
import Player from "../model/Player";
import jwt from "jsonwebtoken";

export const authorizationUserServices = async function (authorization: string): Promise<string> {
    let getPlayerId = '';
    try {
        await jwt.verify(authorization, env.privateKeyAuthorazition, {}, async function (err, decoded: any) {
            if (err || !decoded) {
                logger.error("error verify jwt : " + err);
                return getPlayerId;
            } else {
                const userRequest = JSON.parse(decoded.account);
                const findItem = await Player.findOne({email: userRequest.email});
                return getPlayerId = findItem ? findItem._id : '';
            }
        });
    } catch (e: unknown) {
        return getPlayerId;
    }
    return getPlayerId;
};

export const authorizationAdminServices = async function (authorization: string): Promise<string> {
    let getPlayerId = '';
    try {
        await jwt.verify(authorization, env.privateKeyAuthorazition, {}, async function (err, decoded: any) {
            if (err || !decoded) {
                logger.error("error verify jwt : " + err);
                return getPlayerId;
            } else {
                const userRequest = JSON.parse(decoded.account);
                //init value super admin
                let admin = false;
                //Kiểm tra nếu là super admin hay ko
                if (env.listEmailAdmin.split(" ").includes(userRequest.email)) {
                    admin = true;
                }
                //là super admin thì ko cần check trường admin trong hệ thống
                if(admin){
                    const findItem = await Player.findOne({email: userRequest.email});
                    if(findItem && !findItem.isAdmin){
                        findItem.isAdmin = true;
                        await findItem.save();
                    }
                    return getPlayerId = findItem ? findItem._id : '';
                }
                //ngược lại thì check
                else {
                    const findItem = await Player.findOne({email: userRequest.email, isAdmin: true});
                    return getPlayerId = findItem ? findItem._id : '';
                }
            }
        });
    } catch (e: unknown) {
        return getPlayerId;
    }
    return getPlayerId;
};