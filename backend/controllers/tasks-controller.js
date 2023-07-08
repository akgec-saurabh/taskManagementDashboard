const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const httpError = require("../models/http-error");

const Task = require("../models/task");
const User = require("../models/user");

const getTaskById = async (req, res, next) => {
  const taskId = req.params.tid; //{tid: 't1'}

  let task;
  try {
    task = await Task.findById(taskId).exec();
  } catch (error) {
    console.log(task);

    return next(httpError("Error Occured while finding Task", 500));
  }

  if (!task) {
    return next(httpError("Could not find task for the provided task Id", 404));
  }

  res.status(200).json({ task: task.toObject({ getters: true }) });
};

const getAllTaskByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let tasks;
  try {
    tasks = await Task.find({ "assignedUsers.userId": userId }).exec();
  } catch (error) {
    console.log(error);
    return next(httpError("Some Errror occured while finding the tasks", 500));
  }

  if (tasks.length === 0) {
    return next(
      httpError("Could not found the task for the provided user Id", 404)
    );
  }
  res
    .status(200)
    .json({ tasks: tasks.map((task) => task.toObject({ getters: true })) });
};

// for Creating Task
const createTask = async (req, res, next) => {
  // Express Validator Validating
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(httpError("Cannot be Empty", 422));
  }

  const { title, description, dueDate, status, userId, userEmail } = req.body;
  const createdTask = new Task({
    title,
    description,
    dueDate,
    status,
    assignedUsers: [{ userId, userEmail }],
    assignedUsersStatus: [{ userId, status, title, description, dueDate }],
    userId,
  });

  // Finding the user creating the id

  let creator;
  try {
    creator = await User.findById(userId).exec();
  } catch (error) {
    console.log(error);
  }

  try {
    // await createdTask.save();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTask.save({ session: sess });
    await creator.assignedTasks.push(createdTask);
    await creator.save({ session: sess });
    sess.commitTransaction();
  } catch (error) {
    console.log(error);
    console.log(createdTask);
    return next(httpError("Error Occured while Saving Task", 500));
  }

  const createdTaskObj = createdTask.toObject({ getters: true });

  res.status(201).json({
    message: "Task Successfully Created",
    createdTask: { ...createdTaskObj, id: createdTaskObj.id },
  });
};

// For Deleting the task
const deleteTask = async (req, res, next) => {
  const { userId } = req.body;
  const taskId = req.params.tid;
  let task;
  try {
    task = await Task.findById(taskId);
  } catch (error) {
    return next(httpError("Some Error Occured while finding Task", 500));
  }

  // Finding the user deleting the task
  let creator;
  try {
    creator = await User.findById(userId).exec();
  } catch (error) {
    console.log(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    //Not deleting the task the task will only be able to deleted by the admin
    // await Task.deleteOne({ _id: taskId }, { session: sess });
    task.assignedUsers.pull({ userId });
    task.assignedUsersStatus.pull({ userId });
    await task.save({ session: sess });
    // Remove the task ID from assignedTasks array of the creator
    creator.assignedTasks.pull(taskId);
    await creator.save({ session: sess });
    sess.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(httpError("Some Error Occured while deleting", 500));
  }

  res
    .status(200)
    .json({ message: "Task Removed", task: task.toObject({ getters: true }) });
};

// // For Patch Task
// const updateTask = async (req, res, next) => {
//   // Express Validator Validating
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     console.log(errors);
//     return next(httpError("Cannot be Empty", 422));
//   }

//   const { title, description } = req.body;
//   const taskId = req.params.tid;

//   let task;
//   try {
//     task = await Task.findById(taskId);
//   } catch (error) {
//     return next(httpError("Some Error Occured while finding Task", 500));
//   }
//   task.title = title;
//   task.description = description;

//   try {
//     await task.save();
//   } catch (error) {
//     console.log(task);
//     return next(httpError("Some Error Occured while updating", 500));
//   }

//   res.status(201).json({ message: "Task Updated" });
// };

// For changing the status of the task
const updateTaskStatus = async (req, res, next) => {
  const { userId, status, title, description, dueDate } = req.body;
  const tid = req.params.tid;

  console.log(tid);

  //finding the task
  let task;
  try {
    task = await Task.findById(tid);
  } catch (error) {
    return next(httpError("Error on finding the task", 500));
  }

  if (!task) {
    return next(httpError("Task could not be found", 500));
  }

  const assignedUser = await task.assignedUsersStatus.find(
    (userStatus) => userStatus.userId.toString() === userId.toString()
  );

  if (assignedUser) {
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.status = status;
    assignedUser.title = title;
    assignedUser.description = description;
    assignedUser.dueDate = dueDate;
    assignedUser.status = status;
  } else {
    return next(httpError("The task is not assined to the user", 401));
  }

  try {
    await task.save();
  } catch (error) {
    console.log(error);
    return next(
      httpError("Some error occured, not able to change status", 500)
    );
  }

  res.status(201).json({
    message: "Status Changed",
    assignedUser: assignedUser.toObject({ getters: true }),
  });
};

const getAllTasks = async (req, res, next) => {
  // Check if the user making the request has the "admin" role
  if (req.user.role !== "admin") {
    return next(
      httpError("Access denied. Only admin users can access this route.", 403)
    );
  }

  let tasks;
  try {
    tasks = await Task.find().exec();
  } catch (error) {
    console.log(error);
    return next(httpError("Some error occurred while finding the tasks", 500));
  }

  if (tasks.length === 0) {
    return next(httpError("No tasks found", 404));
  }

  res
    .status(200)
    .json({ tasks: tasks.map((task) => task.toObject({ getters: true })) });
};

exports.getTaskById = getTaskById;
exports.getAllTaskByUserId = getAllTaskByUserId;
exports.createTask = createTask;
// exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.updateTaskStatus = updateTaskStatus;

//For Admin
exports.getAllTasks = getAllTasks;
