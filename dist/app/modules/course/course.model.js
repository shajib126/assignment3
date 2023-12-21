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
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
//course model
const tagsSchema = new mongoose_1.Schema({
    name: { type: String },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { _id: false, timestamps: true });
const detailsSchema = new mongoose_1.Schema({
    level: String,
    description: String
}, { _id: false, timestamps: true });
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId, //store Category Id
        ref: 'Category'
    },
    price: {
        type: Number
    },
    instructor: {
        type: String,
        required: true,
    },
    tags: [tagsSchema],
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    durationInWeeks: {
        type: Number,
        required: true
    },
    details: detailsSchema
}, { timestamps: true });
courseSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isTitleExist = yield exports.Course.findOne({ title: this.title });
        if (isTitleExist) {
            throw new AppError_1.default(400, 'title is already exists!');
        }
        next();
    });
});
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
