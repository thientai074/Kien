import {Response} from "express";

export const ok = function (values: any, res: Response) {
    const data = {
        'status': "200",
        'message': "success",
        'values': values
    };

    res.json(data);
    res.end();
}

export const err = function (values: any, res: Response) {
    const data = {
        'status': "404",
        'message': "error",
        'values': values
    };
    res.json(data);
    res.end();
}

export const dataNotFound = function (values: any, res: Response) {
    const data = {
        'status': "505",
        'message': "not found",
        'values': values
    };

    res.json(data);
    res.end();
}
