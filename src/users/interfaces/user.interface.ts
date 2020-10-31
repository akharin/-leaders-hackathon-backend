import { Document } from 'mongoose';

export interface IDbUserDoc extends Document {
  phone: string;
  password: string;
  name: string;
  organization: string;
  position: string;
}
