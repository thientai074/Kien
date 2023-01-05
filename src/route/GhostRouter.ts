import e from "express";
import {catchedGhost, findAllGhost} from "../controller/GhostController";

export const ghostRoute = function (app: e.Application) {
    app.route("/api/ghost/find-all").post(findAllGhost);
    app.route("/api/ghost/catched").post(catchedGhost);
};
