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

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.put("/register", isAuthenticatedUser, userDetails);
router.get("/userinfo", isAuthenticatedUser, userInfo);
router.put("/addmatch", isAuthenticatedUser, addMatch);
router.get("/getallusers", isAuthenticatedUser, getAllUsers);
router.put("/leftswipe", isAuthenticatedUser, leftSwipe);
router.post("/message", isAuthenticatedUser, addMessage);
router.get("/message", isAuthenticatedUser, getMessage);
// router.post("/enterProject", isAuthenticatedUser, enterProject);
router.get("/matchedUser", isAuthenticatedUser, getMatchedUser);
router.put("/image", isAuthenticatedUser, getimage);

// Todo Routes Temporary
router.route("/createTodo").post(createTodo);
router.route("/getTodos").get(getTodos);
router.route("/deleteTodo/:id").delete(deleteTodo);
router.route("/updateTodo/:id").put(updateTodo);
module.exports = router;
