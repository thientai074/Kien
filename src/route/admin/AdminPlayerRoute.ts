import e from "express";
import {
    adminFindOnePlayer,
    deletePlayer,
    findByPagePlayer, savePlayer,
    updateCustomPlayer,
} from "../../controller/admin/AdminPlayerController";

export const adminPlayerRoute = function (app: e.Application) {
    app.route("/api/player/save").post(savePlayer);
    app.route("/api/player/update-custom-player").post(updateCustomPlayer);
    app.route("/api/player/delete").post(deletePlayer);
    app.route("/api/player/admin-find-one").post(adminFindOnePlayer);
    app.route("/api/player/find-by-page").post(findByPagePlayer);
};
