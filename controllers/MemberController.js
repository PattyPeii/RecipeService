const memberService = require("../services/MemberService");

exports.getAllMembers = async (req, res) => {
  try {
    const members = await memberService.getAllMembers();
    res.json({ data: members, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMember = async (req, res) => {
  console.log(req.body);
  try {
    const member = await memberService.createMember(req.body);
    res.json({ data: member, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const member = await memberService.getMemberById(req.params.id);
    res.json({ data: member, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await memberService.updateMember(req.params.id, req.body);
    if (member) res.json({ data: member, status: "success" });
    else res.json({status: "fail", message: `id : ${req.params.id} not found` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await memberService.deleteMember(req.params.id);
    res.json({ data: member, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
