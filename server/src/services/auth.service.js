const UserModel = require("../model/user.model");
const PATModel = require("../model/personal-access-token.model");

class AuthService {
  storeSignUpPayload = async (payload) => {
    try {
      const user = new UserModel(payload);
      return await user.save();
    } catch (error) {
      console.log("StoreSignUpPayload: ", error);
      throw error;
    }
  };

  getUserByFilter = async (filter) => {
    try {
      const response = await UserModel.findOne(filter);

      return response;
    } catch (error) {
      console.log("getUserByFilter: ", error);
      throw error;
    }
  };

  getUsers = async (
    filter,
    paging = { skip: 0, limit: 15 },
    sort = { role: "asc" }
  ) => {
    try {
      const response = await UserModel.find(filter)
        .sort(sort)
        .skip(paging.skip)
        .limit(paging.limit);
      return response;
    } catch (except) {
      console.log("getUsers: ", except);
      throw error;
    }
  };

  updateUser = async (filter, updateData) => {
    try {
      const response = await UserModel.updateOne(filter, updateData);
      return response;
    } catch (error) {
      console.log("updateUser: ", error);
      throw error;
    }
  };

  deleteUser = async (id) => {
    try {
      const response = await UserModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log("Delete user: ", error);
      throw error;
    }
  };

  storePAT = async (data) => {
    try {
      let patObj = new PATModel(data);
      return await patObj.save();
    } catch (except) {
      throw except;
    }
  };

  getPATByToken = async (token) => {
    try {
      let PATData = await PATModel.findOne({ token: token });
      return PATData;
    } catch (excpt) {
      throw excpt;
    }
  };

  deletePAT = async (token) => {
    try {
      let deleted = await PATModel.findOneAndDelete({
        token: token,
      });
      if (deleted) {
        return deleted;
      } else {
        throw { code: 404, message: "Token does not exists" };
      }
    } catch (excpt) {
      throw excpt;
    }
  };
}

const authSvc = new AuthService();
module.exports = authSvc;
