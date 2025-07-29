import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: String, // Clerk userId (as string, not ObjectId)
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  imageUrl: String,
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
