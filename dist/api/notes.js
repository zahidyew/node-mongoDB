"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = void 0;
const express_1 = __importDefault(require("express"));
const note_1 = __importDefault(require("../models/note"));
exports.notesRouter = express_1.default.Router();
// get all notes
exports.notesRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield note_1.default.find();
        res.json(notes);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// get a specific note
exports.notesRouter.get('/:id', getNote, (_req, res) => {
    res.json(res.note);
});
// create new note
exports.notesRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = new note_1.default({
        title: req.body.title,
        content: req.body.content,
        tag: req.body.tag,
        user: req.body.user
    });
    try {
        const newNote = yield note.save();
        res.status(201).json(newNote);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// update a note
exports.notesRouter.patch('/:id', getNote, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.title != null) {
        res.note.title = req.body.title;
    }
    if (req.body.content != null) {
        res.note.content = req.body.content;
    }
    if (req.body.tag != null) {
        res.note.tag = req.body.tag;
    }
    try {
        const updatedNote = yield res.note.save();
        res.json(updatedNote);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// delete a note
exports.notesRouter.delete('/:id', getNote, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.note.remove();
        res.json({ message: "Success" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// func to find a specific note
function getNote(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let note;
        try {
            note = yield note_1.default.findById(req.params.id);
            if (note == null) {
                return res.status(404).json({ message: "Cannot find note with that id" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        Object.assign(res, { note: note });
        next();
    });
}
