const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  timeFrame: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  metrics: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    passRate: {
      type: Number,
      default: 0
    },
    averageTimeSpent: {
      type: Number, // in seconds
      default: 0
    },
    questionStats: [{
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      },
      correctAnswerRate: {
        type: Number,
        default: 0
      },
      averageTimeSpent: {
        type: Number,
        default: 0
      }
    }]
  }
}, {
  timestamps: true
});

// Indexes
analyticsSchema.index({ quizId: 1, timeFrame: 1, date: -1 });
analyticsSchema.index({ date: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
