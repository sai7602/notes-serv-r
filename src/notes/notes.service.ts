import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note) private readonly noteModel: typeof Note) {}

  async create(CreateNoteDto) {
    return this.noteModel.create(CreateNoteDto);
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.findAll();
  }

  async getStats() {
    const archived = await this.noteModel.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('isArchived')), 'Archived'],
      ],
      where: {
        isArchived: true,
      },
      group: 'category',
    });
    const unArchived = await this.noteModel.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('isArchived')), 'UnArchived'],
      ],
      where: {
        isArchived: false,
      },
      group: 'category',
    });

    return archived.map((stat, index) => {
      stat.setDataValue(
        'UnArchived',
        unArchived[index].getDataValue('UnArchived'),
      );
      return stat;
    });
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.noteModel.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note found id # ${id}`);
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const existingNote = await this.noteModel.update(updateNoteDto, {
      where: { id },
    });

    if (!existingNote) {
      throw new NotFoundException(`Note found id # ${id}`);
    }
    return existingNote;
  }

  async remove(id: number) {
    await this.noteModel.destroy({ where: { id } });

    return `Note # ${id} successfully deleted`;
  }
}
