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
}

const authSvc = new AuthService();
module.exports = authSvc;
