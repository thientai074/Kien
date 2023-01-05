import e from "express";
import {
  loginPlayer,
  findOnePlayer, beginPlayPlayer, addLifePlayer,
} from "../controller/PlayerController";

export const playerRoute = function (app: e.Application) {
  app.route("/api/player/login").get(loginPlayer);
  app.route("/api/player/begin-play").post(beginPlayPlayer);
  app.route("/api/player/find-one").post(findOnePlayer);
  app.route("/api/player/add-life").post(addLifePlayer);
};
