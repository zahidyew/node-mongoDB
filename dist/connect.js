"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connectToDatabase() {
    const uri = process.env.DATABASE;
    mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch((err) => console.log(err.reason));
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => { console.log("Connected to Database"); });
}
exports.default = connectToDatabase;
