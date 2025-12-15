import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const dailyTodoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    tasks: [taskSchema],
  },
  { timestamps: true }
);

dailyTodoSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyTodo", dailyTodoSchema);
