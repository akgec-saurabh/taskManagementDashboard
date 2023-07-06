const express = require("express");
const httpError = require("../models/http-error");
const { check } = require("express-validator");
const {
  getTaskById,
  getAllTaskByUserId,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/tasks-controller");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// Checking Authentication
router.use(checkAuth);

router.get("/:tid", getTaskById);

router.get("/user/:uid", getAllTaskByUserId);

router.post(
  "/",
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("dueDate").isDate(),
  ],
  createTask
);

router.patch(
  "/:tid",
  [check("title").notEmpty(), check("description").isLength({ min: 5 })],
  updateTask
);

// To change the status of the task
router.patch("/:tid/status", updateTaskStatus);

router.delete("/:tid", deleteTask);

module.exports = router;
