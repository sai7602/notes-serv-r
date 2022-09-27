import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { NotesModel } from './notes.model';

@Controller('notes')
export class NotesController {
  @Post('/')
  async create(@Body() dto: Omit<NotesModel, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async edit(@Param('id') dto: NotesModel) {}

  @Get('/')
  async getAll(@Param('id') dto: NotesModel) {}

  @Get(':id')
  async retrieve(@Param('id') id: string) {}

  @Get('/stats')
  async getStats(@Param('id') dto: string) {}
}
