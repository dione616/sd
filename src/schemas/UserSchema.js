"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var validateEmail = function (email) {
    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
};
var UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 30,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 100,
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    token: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", UserSchema);
