import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser, UserRole } from '@awg-backend/interfaces';

@Schema()
export class User extends Document<string> implements IUser {
  @Prop()
  displayName?: string;

  @Prop()
  userName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: UserRole, type: String, default: UserRole.Regular })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
