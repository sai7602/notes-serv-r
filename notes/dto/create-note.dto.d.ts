import { Categories } from '../entities/note.entity';
export declare class CreateNoteDto {
    readonly noteName: string;
    readonly category: Categories;
    readonly content: string;
    readonly isArchived: boolean;
}
