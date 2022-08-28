const mongoose = require('mongoose');

const { Schema } = mongoose;

const VideosSchema = new Schema({
  title: {
    type: String,
  },
  external_video_id: {
    type: String,
  },
  description: {
    type: String,
  },
  published_at: {
    type: Date,
  },
  thumbnails: [{
    type: Object,
  }],
  channel_id: {
    type: String,
  },
  chaneel_title: {
    type: String,
  },
  tags: [{
    type: String,
  }],
}, { collection: 'videos', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Videos = mongoose.model('Videos', VideosSchema);

module.exports = Videos;
