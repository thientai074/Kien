import e from "express";
import {
    deleteGhost,
    findByPageGhost,
    findOneGhost,
    saveGhost,
    updateGhost
} from "../../controller/admin/AdminGhostController";

export const adminGhostRoute = function (app: e.Application) {
    app.route("/api/ghost/save").post(saveGhost);
    app.route("/api/ghost/update").post(updateGhost);
    app.route("/api/ghost/delete").post(deleteGhost);
    app.route("/api/ghost/find-one").post(findOneGhost);
    app.route("/api/ghost/find-by-page").post(findByPageGhost);
};