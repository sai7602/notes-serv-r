import { IsString, IsBoolean, IsEnum } from 'class-validator';
import { Categories } from '../entities/note.entity';

export class CreateNoteDto {
  @IsString()
  readonly noteName: string;
  @IsEnum(Categories, {
    message: `category must be a valid enum value (TASK | RANDOM THOUGHT | IDEA | QUOTE)`,
  })
  readonly category: Categories;
  @IsString()
  readonly content: string;
  @IsBoolean()
  readonly isArchived: boolean;
}
