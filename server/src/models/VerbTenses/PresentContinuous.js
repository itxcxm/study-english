import mongoose from "mongoose";

const { Schema } = mongoose;

const presentContinuousSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answers: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length >= 2 && v.length <= 6;
        },
        message: "Answers must contain between 2 and 6 options",
      },
    },
    correctAnswer: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 0 && v < this.answers.length;
        },
        message: "Correct answer index must be valid",
      },
    },
    explanation: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

presentContinuousSchema.index({ isActive: 1 });

const PresentContinuous = mongoose.model(
  "PresentContinuous",
  presentContinuousSchema
);

export { PresentContinuous };
