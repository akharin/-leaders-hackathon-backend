import { Schema } from 'mongoose';
import { IDbUserDoc } from '../interfaces/user.interface';

export const UserSchema = new Schema<IDbUserDoc>({
  phone: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: /^\+[1-9]\d{10}$/i,
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  organization: { type: String, required: true },
  position: { type: String, required: true },
});
