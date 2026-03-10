import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
  
});

export default mongoose.model('Character', emailSchema);