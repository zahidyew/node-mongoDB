"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("./api/users");
const notes_1 = require("./api/notes");
const connect_1 = __importDefault(require("./connect"));
// Load config
require('dotenv').config();
const app = express_1.default();
connect_1.default();
// middleware for body/form parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// endpoints
app.use('/users', users_1.usersRouter);
app.use('/notes', notes_1.notesRouter);
// define port for the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
