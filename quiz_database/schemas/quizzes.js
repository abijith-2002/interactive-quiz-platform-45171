const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  timeLimit: {
    type: Number, // in minutes
    required: true,
    min: 1,
    max: 180
  },
  passingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  totalAttempts: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes
quizSchema.index({ title: 1 });
quizSchema.index({ category: 1 });
quizSchema.index({ difficulty: 1 });
quizSchema.index({ tags: 1 });
quizSchema.index({ createdBy: 1 });
quizSchema.index({ isPublished: 1 });

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
