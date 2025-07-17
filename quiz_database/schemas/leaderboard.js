const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['weekly', 'monthly', 'global'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  entries: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    quizzesTaken: {
      type: Number,
      required: true
    },
    rank: {
      type: Number,
      required: true
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
leaderboardSchema.index({ type: 1, startDate: -1 });
leaderboardSchema.index({ 'entries.userId': 1 });
leaderboardSchema.index({ 'entries.score': -1 });

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;
