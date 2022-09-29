import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Categories {
  Task = 'TASK',
  RandomThought = 'RANDOM THOUGHT',
  Idea = 'IDEA',
  Quote = 'QUOTE',
}

@Schema({ timestamps: true })
export class Note {
  @Prop()
  noteName: string;
  @Prop({ enum: Categories })
  category: Categories;
  @Prop()
  content: string;
  @Prop()
  isArchived: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
