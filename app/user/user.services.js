const UserModel = require("./user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
  static async registerUser(phone, password) {
    try {
      const createUser = new UserModel({ phone, password });
      //   console.log(createUser);
      return await createUser.save();
    } catch (err) {
      throw err;
    }
  }

  static async checkUser(phone) {
    try {
      return await UserModel.findOne({ phone });
    } catch (err) {
      throw err;
    }
  }

  static async comparePassword(userPassword, passwordInDatabase) {
    try {
      return await bcrypt.compare(userPassword, passwordInDatabase);
    } catch (err) {
      throw err;
    }
  }

  static async generateToken(tokenData) {
    const secreKey = "@Mydung123456789";
    const jwt_expire = "7d";

    console.log(tokenData);
    return await jwt.sign(tokenData, secreKey, { expiresIn: jwt_expire });
  }
}

module.exports = UserService;
