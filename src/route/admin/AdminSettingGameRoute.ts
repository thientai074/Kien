import e from "express";
import {
  findOneSettingGame,
  updateSettingGame,
  saveSettingGame,
  deleteSettingGame,
  findByPageSettingGame, findAllSettingGame
} from "../../controller/admin/AdminSettingGameController";

export const adminSettingGameRoute = function (app: e.Application) {
  app.route("/api/setting-game/save").post(saveSettingGame);
  app.route("/api/setting-game/update").post(updateSettingGame);
  app.route("/api/setting-game/find-one").post(findOneSettingGame);
  app.route("/api/setting-game/delete").post(deleteSettingGame);
  app.route("/api/setting-game/find-by-page").post(findByPageSettingGame);
  app.route("/api/setting-game/find-all").post(findAllSettingGame);
};
