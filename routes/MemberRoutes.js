const express = require("express");
const {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember,
} = require("../controllers/MemberController");

const router = express.Router();

router.route("/").get(getAllMembers).post(createMember);
router.route("/:id").get(getMemberById).put(updateMember).delete(deleteMember);

module.exports = router;
