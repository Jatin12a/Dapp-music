const express = require("express");
const {
  getUserController,
  verifyAccount,
  buyCredit,
  followUserController,
  unfollowUserController,
  blockUserController,
  unblockUserController,
  getBlockedUsersController,
  deleteUserController,
  searchUserController,
  uploadProfilePictureController,
  uploadCoverPictureController,
  getAllDappUsers,
  updateUserController,
} = require("../controllers/userController");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/:userId", getUserController);

router.get("/alldaapusers/:userId", getAllDappUsers);


router.put("/update/:userId", updateUserController);

router.put("/verify/:userId", verifyAccount);

router.put("/credit/:userId", buyCredit);

router.post("/follow/:userId", followUserController);

router.post("/unfollow/:userId", unfollowUserController);

router.post("/block/:userId", blockUserController);

router.post("/unblock/:userId", unblockUserController);

router.get("/blocked/:userId", getBlockedUsersController);

router.delete("/delete/:userId", deleteUserController);

router.get("/search/:query", searchUserController);

router.put("/update-profile-picture/:userId", uploadProfilePictureController);

router.put("/update-cover-picture/:userId", uploadCoverPictureController);

module.exports = router;
