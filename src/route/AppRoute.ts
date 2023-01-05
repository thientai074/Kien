import e from "express";
import { playerRoute } from "./PlayerRoute";
import { ghostRoute } from "./GhostRouter";
import { adminSettingGameRoute } from "./admin/AdminSettingGameRoute";
import { adminGhostRoute } from "./admin/AdminGhostRoute";
import { adminPlayerRoute } from "./admin/AdminPlayerRoute";
import {adminCouponRoute} from "./admin/AdminCouponRoute";

export const useRoute = function (app: e.Application) {
  //Route player
  playerRoute(app);
  adminSettingGameRoute(app);
  ghostRoute(app);
  //admin area
  adminGhostRoute(app);
  adminPlayerRoute(app);
  adminCouponRoute(app);
};
