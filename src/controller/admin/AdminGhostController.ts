import { Request, Response } from "express";
import { logger } from "../../../logger/winston";
import * as response from "../../msg/message";
import { errorUnknown, jwtNotVerify, limit } from "../../utils/MyVariables";
import { authorizationAdminServices } from "../../service/AuthorizationService";
import { IGhost } from "../../model/Interface/IGhost";
import { PageTabulatorDto } from "../../model/Interface/IFilterTabulatorDto";
import {
  deleteGhostServices,
  findByPageGhostServices,
  findOneGhostServices,
  saveGhostServices,
  updateGhostServices,
} from "../../service/admin/AdminGhostService";

export const saveGhost = async function (req: Request, res: Response) {
  // Show log
  logger.info("request for save ghost");
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
      const item = req.body as IGhost;
      // Logic
      const itemService = await saveGhostServices(item);
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

export const updateGhost = async function (req: Request, res: Response) {
  // Show log
  logger.info("request for update ghost");
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
      const item = req.body as IGhost;
      //Logic
      const itemService = await updateGhostServices(item);
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

export const deleteGhost = async function (req: Request, res: Response) {
  //Show log
  logger.info("request for delete ghost:");
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
      const item = req.body as IGhost;
      //Logic
      const itemService = await deleteGhostServices(item);
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

export const findOneGhost = async function (req: Request, res: Response) {
  //Show log
  logger.info("request for find one ghost:");
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
      const item = req.body as IGhost;
      // Logic
      const itemService = await findOneGhostServices(item);
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

export const findByPageGhost = async function (req: Request, res: Response) {
  //Show log
  logger.info("request for find by page ghost:");
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
      const ghost = req.body as IGhost;
      //Logic
      const pagination: PageTabulatorDto = req.query.page
        ? JSON.parse(String(req.query.page))
        : { page: 1, size: limit, sorters: [], filters: [] };
      const itemService = await findByPageGhostServices(ghost, pagination);
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
