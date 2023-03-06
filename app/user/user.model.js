const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: Array,
      default: ["HV"],
    },

    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(user.password, salt);

    user.password = hashPass;
  } catch (err) {
    throw err;
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
