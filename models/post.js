const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
