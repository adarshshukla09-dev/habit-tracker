import mongoose from "mongoose";

const habitLogSchema = new mongoose.Schema(
  {
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true,
    },

    completed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// One log per habit per date
habitLogSchema.index({ habit: 1, date: 1 }, { unique: true });

export default mongoose.model("HabitLog", habitLogSchema);
