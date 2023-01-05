import { IGhost } from "../../model/Interface/IGhost";
import Ghost from "../../model/Ghost";
import { errorMsg, errorUnknown, limit } from "../../utils/MyVariables";
import mongoose from "mongoose";
import { PageTabulatorDto } from "../../model/Interface/IFilterTabulatorDto";

export const saveGhostServices = async function (data: IGhost): Promise<any> {
  try {
    const itemCreate = new Ghost({
      width: data.width,
      height: data.height,
      name: data.name,
      coupon: data.coupon,
      chance: data.chance,
      image: data.image,
      releaseTime: data.releaseTime,
      countSpace: data.countSpace,
      speed: data.speed,
      enable: data.enable,
    });
    // Lưu
    await itemCreate.save();
    // Trả về kết quả
    return itemCreate;
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

export const updateGhostServices = async function (data: IGhost): Promise<any> {
  try {
    //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì update
    const itemUpdate = await Ghost.findOne({
      _id: new mongoose.Types.ObjectId(data._id),
    });
    //Cập nhật
    if (itemUpdate) {
      //init object
      itemUpdate.width = data.width;
      itemUpdate.height = data.height;
      itemUpdate.name = data.name;
      itemUpdate.coupon = data.coupon;
      itemUpdate.chance = data.chance;
      itemUpdate.image = data.image;
      itemUpdate.releaseTime = data.releaseTime;
      itemUpdate.countSpace = data.countSpace;
      itemUpdate.speed = data.speed;
      itemUpdate.enable = data.enable;
      //Update
      await itemUpdate.save();
      //Trả kết quả
      return itemUpdate;
    }
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

export const deleteGhostServices = async function (data: IGhost): Promise<any> {
  try {
    //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì delete
    const itemDelete = await Ghost.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(data._id),
    });
    if (itemDelete) {
      //Trả kết quả
      return itemDelete;
    } else {
      return errorMsg;
    }
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

export const findOneGhostServices = async function (
  data: IGhost
): Promise<any> {
  try {
    //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì delete
    const itemFind = await Ghost.findOne({
      _id: new mongoose.Types.ObjectId(data._id),
    });
    if (itemFind) {
      //Trả kết quả
      return itemFind;
    } else {
      return errorMsg;
    }
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

export const findByPageGhostServices = async function (
  data: IGhost,
  pagination: PageTabulatorDto
): Promise<any> {
  try {
    //Kiểm tra trong hệ thống đã tồn tại chưa, nếu tồn tại thì find
    const condition: any = {};
    if (data._id) condition._id = new mongoose.Types.ObjectId(data._id);
    //Filter (nếu có)
    const pageNo = Number(pagination.page);
    const itemCount = await Ghost.find(condition).count();
    const maxPage = pagination.size < limit ? pagination.size : limit;
    const lastPage = Math.ceil(itemCount / maxPage); // tổng số các page
    const itemFind = await Ghost.find(condition)
      .skip(maxPage * pageNo - maxPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(maxPage)
      .sort({ updatedAt: -1 });
    if (itemFind) {
      return { data: itemFind, last_page: lastPage, max_item: itemCount };
    } else {
      return errorMsg;
    }
  } catch (e: unknown) {
    let err: string;
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};
