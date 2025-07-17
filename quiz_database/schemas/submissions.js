const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  selectedOptions: [{
    type: String,
    trim: true
  }],
  textAnswer: {
    type: String,
    trim: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  timeSpent: {
    type: Number, // in seconds
    required: true
  }
});

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  totalScore: {
    type: Number,
    required: true
  },
  percentageScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  answers: [answerSchema],
  status: {
    type: String,
    enum: ['completed', 'timed-out', 'abandoned'],
    required: true
  },
  timeSpent: {
    type: Number, // in seconds
    required: true
  },
  isPassed: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

// Indexes
submissionSchema.index({ userId: 1, quizId: 1 });
submissionSchema.index({ quizId: 1, totalScore: -1 }); // For leaderboard
submissionSchema.index({ createdAt: -1 });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
