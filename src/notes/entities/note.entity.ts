// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum Categories {
  Task = 'TASK',
  RandomThought = 'RANDOM THOUGHT',
  Idea = 'IDEA',
  Quote = 'QUOTE',
}

@Table({ timestamps: true })
export class Note extends Model {
  @Column({
    type: DataType.STRING,
  })
  noteName: string;
  @Column({
    type: DataType.ENUM(...Object.values(Categories)),
  })
  category: Categories;
  @Column({
    type: DataType.STRING,
  })
  content: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isArchived: boolean;
}

// export const NoteSchema = SchemaFactory.createForClass(Note);
