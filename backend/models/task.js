const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ["pending", "completed", "inprogress"],
    default: "pending",
  },
  assignedUsers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      userEmail: { type: String },
    },
  ],
  assignedUsersStatus: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "completed", "inprogress"],
        default: "pending",
      },
      title: { type: String, required: true },
      description: { type: String },
      dueDate: { type: Date },
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
