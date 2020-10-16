"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    tag: {
        type: String,
        required: false,
        default: "none"
    },
    user: {
        type: String,
        required: true
    }
});
const Note = mongoose_1.default.model('Note', noteSchema);
exports.default = Note;
/* function getDate() {
   const today = new Date()

   const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
   return date
}

function getTime() {
   const today = new Date();

   const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
   return time
} */ 
