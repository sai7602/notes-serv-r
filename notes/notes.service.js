"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const note_entity_1 = require("./entities/note.entity");
let NotesService = class NotesService {
    constructor(noteModel) {
        this.noteModel = noteModel;
    }
    create(createNoteDto) {
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
    async findOne(id) {
        const note = await this.noteModel.findOne({ _id: id }).exec();
        if (!note) {
            throw new common_1.NotFoundException(`Note found id # ${id}`);
        }
        return note;
    }
    async update(id, updateNoteDto) {
        const existingNote = await this.noteModel
            .findOneAndUpdate({ _id: id }, { $set: updateNoteDto }, { new: true })
            .exec();
        if (!existingNote) {
            throw new common_1.NotFoundException(`Note found id # ${id}`);
        }
        return existingNote;
    }
    async remove(id) {
        const note = await this.findOne(id);
        return note.remove();
    }
};
NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(note_entity_1.Note.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotesService);
exports.NotesService = NotesService;
//# sourceMappingURL=notes.service.js.map