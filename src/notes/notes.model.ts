export enum Categories {
  Task,
  RandomThought,
  Idea,
  Quote,
}

export class NotesModel {
  _id: string;
  noteName: string;
  createDate: string;
  category: Categories;
  content: string;
  modificationDate: string;
  isArchived: any;
  archivedAmount: number;
  unArchivedAmount: number;
}
