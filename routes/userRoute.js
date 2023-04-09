const express = require("express");
const {
  registerUser,
  enterProject,
  logout,
  loginUser,
  userDetails,
  userInfo,
  addMatch,
  getAllUsers,
  leftSwipe,
  addMessage,
  getMessage,
  getMatchedUser,
  getimage,
} = require("../controllers/userController");
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/register").put(userDetails);
router.route("/userinfo").get(userInfo);
router.route("/addmatch").put(addMatch);
router.route("/getallusers").get(getAllUsers);
router.route("/leftswipe").put(leftSwipe);
router.route("/message").post(addMessage);
router.route("/message").get(getMessage);
router.route("/enterProject").post(enterProject);
router.route("/matchedUser").get(getMatchedUser);
router.route("/image").put(getimage);

// Todo Routes Temporary
router.route("/createTodo").post(createTodo);
router.route("/getTodos").get(getTodos);
router.route("/deleteTodo/:id").delete(deleteTodo);
router.route("/updateTodo/:id").put(updateTodo);
module.exports = router;
