import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<Note>,
  ) {}

  create(createNoteDto: CreateNoteDto) {
    const note = new this.noteModel(createNoteDto);
    return note.save();
  }

  findAll() {
    return this.noteModel.find().exec();
  }

  getStats() {
    const stats = this.noteModel
      .aggregate([
        {
          $group: {
            _id: '$category',
            archived: {
              $sum: { $cond: ['$isArchived', 1, 0] },
            },
            unArchived: {
              $sum: { $cond: ['$isArchived', 0, 1] },
            },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .project({
        _id: 0,
        category: '$_id',
        isArchived: '$archived',
        unArchived: '$unArchived',
      });

    return stats;
  }

  async findOne(id: string) {
    const note = await this.noteModel.findOne({ _id: id }).exec();
    if (!note) {
      throw new NotFoundException(`Note found id # ${id}`);
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const existingNote = await this.noteModel
      .findOneAndUpdate({ _id: id }, { $set: updateNoteDto }, { new: true })
      .exec();
    if (!existingNote) {
      throw new NotFoundException(`Note found id # ${id}`);
    }
    return existingNote;
  }

  async remove(id: string) {
    const note = await this.findOne(id);

    return note.remove();
  }
}
