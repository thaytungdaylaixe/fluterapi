const UserService = require("./user.services");

exports.register = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const user = await UserService.checkUser(phone);

    if (!user) {
      const tokenData = await UserService.registerUser(phone, password);

      const token = await UserService.generateToken(tokenData);

      res.status(200).json({ status: true, token });
    }

    res.json({ status: false, success: "So dien thoai da ton tai" });
  } catch (err) {
    throw err;
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const user = await UserService.checkUser(phone);

    if (!user) {
      throw new Error("User not found.");
    }

    // console.log(user);

    const isMatch = await UserService.comparePassword(password, user.password);
    if (isMatch === false) {
      throw new Error("Password khong dung.");
    }

    let tokenData = {
      _id: user._id,
      phone: user.phone,
      roles: user.roles,
      active: user.active,
    };

    const token = await UserService.generateToken(tokenData);
    res.status(200).json({ status: true, token });

    // res.json({ status: true, success: "Dang nhap thanh cong" });
  } catch (err) {
    throw err;
  }
};
