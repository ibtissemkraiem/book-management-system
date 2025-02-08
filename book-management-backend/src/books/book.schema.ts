import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;
}
export interface IBook extends Document {
  title: string;
  author: string;
 }
export const BookSchema = SchemaFactory.createForClass(Book);
