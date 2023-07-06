const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  assignedUsersStatus: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "completed", "in_progress"],
        default: "pending",
      },
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
