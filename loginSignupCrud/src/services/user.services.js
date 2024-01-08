const UserModel = require("../models/user.schema");
const bcrypt = require("bcrypt");
const createUser = async (userData) => {
  return await UserModel.create(userData);
};
const getUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};
const updateUserById = async (userId, updatedData) => {
  return await UserModel.findByIdAndUpdate(userId, updatedData, { new: true });
};
const changePassword = async (userId, newPassword) => {
  const salt = await bcrypt.genSalt(10);
  const newPasswordHash = await bcrypt.hash(newPassword, salt);
  return await UserModel.findByIdAndUpdate(
    userId,
    { password: newPasswordHash },
    { new: true }
  );
};
const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// const deleteUser = async (req,res)=>{

// };
module.exports = {
  createUser,
  getUserByEmail,
  updateUserById,
  // deleteUser,
  changePassword,
  validatePassword,
};
