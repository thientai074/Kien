import { logger } from "../../../logger/winston";
import { Request, Response } from "express";
import * as response from "../../msg/message";
import { errorUnknown, jwtNotVerify, limit } from "../../utils/MyVariables";
import { authorizationAdminServices } from "../../service/AuthorizationService";
import { ISettingGame } from "../../model/Interface/ISettingGame";
import {
  findOneSettingGameServices,
  updateSettingGameServices,
  saveSettingGameServices,
  deleteSettingGameServices,
  findByPageSettingGameServices, findAllSettingGameServices,
} from "../../service/admin/AdminSettingGameService";
import { PageTabulatorDto } from "../../model/Interface/IFilterTabulatorDto";

export const saveSettingGame = async function (req: Request, res: Response) {
  // Show log
  logger.info("request for save setting game");
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
      const item = req.body as ISettingGame;
      // Logic
      const itemService = await saveSettingGameServices(item);
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

export const updateSettingGame = async function (req: Request, res: Response) {
  //Show log
  logger.info("request for update setting game:");
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
      const item = req.body as ISettingGame;
      //Logic
      const itemService = await updateSettingGameServices(item);
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

export const deleteSettingGame = async function (req: Request, res: Response) {
  //Show log
  logger.info("request for delete setting game:");
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
      const item = req.body as ISettingGame;
      //Logic
      const itemService = await deleteSettingGameServices(item);
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

export const findByPageSettingGame = async function (
  req: Request,
  res: Response
) {
  //Show log
  logger.info("request for find by page setting game:");
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
      const settingGame = req.body as ISettingGame;
      //Logic
      const pagination: PageTabulatorDto = req.query.page
        ? JSON.parse(String(req.query.page))
        : { page: 1, size: limit, sorters: [], filters: [] };
      const itemService = await findByPageSettingGameServices(
        settingGame,
        pagination
      );
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

export const findOneSettingGame = async function (req: Request, res: Response) {
  //Show log
  logger.info("request for find one setting game:");
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
      const item = req.body as ISettingGame;
      //Logic
      const itemService = await findOneSettingGameServices(item);
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

export const findAllSettingGame = async function (req: Request, res: Response) {
  //Show log
  logger.info("request for find all setting game:");
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
      const item = req.body as ISettingGame;
      //Logic
      const itemService = await findAllSettingGameServices(item);
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
