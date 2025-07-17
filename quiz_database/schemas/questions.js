const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  questionText: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'short-answer'],
    required: true
  },
  options: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  }],
  correctAnswer: {
    type: String,
    required: function() {
      return this.type === 'short-answer';
    }
  },
  points: {
    type: Number,
    required: true,
    min: 1
  },
  explanation: {
    type: String,
    trim: true
  },
  orderIndex: {
    type: Number,
    required: true
  },
  timeLimit: { // Optional per-question time limit
    type: Number,
    min: 10, // minimum 10 seconds
    default: null
  }
}, {
  timestamps: true
});

// Indexes
questionSchema.index({ quizId: 1, orderIndex: 1 });
questionSchema.index({ type: 1 });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
