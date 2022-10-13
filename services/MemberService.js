const MemberModel = require("../models/Member");

exports.getAllMembers = async () => {
  return await MemberModel.find();
};

exports.createMember = async (member) => {
  return await MemberModel.create(member);
};

exports.getMemberById = async (id) => {
  return await MemberModel.findById(id);
};

exports.updateMember = async (id, member) => {
  return await MemberModel.findByIdAndUpdate(id, member);
};

exports.deleteMember = async (id) => {
  return await MemberModel.findByIdAndDelete(id);
};
