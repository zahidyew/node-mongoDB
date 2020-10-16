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
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const note_1 = __importDefault(require("../models/note"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.usersRouter = express_1.default.Router();
// find user with the given id
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            user = yield user_1.default.findById(req.params.id);
            if (user == null) {
                return res.status(404).json({ message: "Cannot find user with that id" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        // add new key/value pair to the res obj
        Object.assign(res, { user: user });
        next(); // pass control to the next handler
    });
}
// get all users
exports.usersRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// get a specific user
exports.usersRouter.get('/:id', getUser, (_req, res) => {
    res.json(res.user);
});
// create new user
exports.usersRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPass = yield bcrypt_1.default.hash(req.body.password, 10);
    const user = new user_1.default({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    });
    try {
        const newUser = yield user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// update user's info
exports.usersRouter.patch('/:id', getUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    try {
        const updatedUser = yield res.user.save();
        res.json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// delete user
exports.usersRouter.delete('/:id', getUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.user.remove();
        res.json({ message: "User has been successfully deleted" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// login
exports.usersRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ name: req.body.name }).exec();
    if (user == null) {
        return res.status(400).send('User does not exist.');
    }
    try {
        if (yield bcrypt_1.default.compare(req.body.password, user.password)) {
            //res.json(user)
            res.send('Login successful');
        }
        else {
            res.send('Wrong password.');
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// get a user's notes
exports.usersRouter.get('/:id/getnotes', getUser, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = res.user.name;
    try {
        const notes = yield note_1.default.find({ user: username }).exec();
        res.json(notes);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Sally = 5f86ffbebedaee15e4044ab1
// Reese = 5f870003bedaee15e4044ab2
