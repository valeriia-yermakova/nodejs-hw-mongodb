import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: { type: String, enum: ['personal', 'business', 'home'] },
  },
  { timestamps: true },
);

export const ContactsCollection = mongoose.model('Contact', contactSchema);
