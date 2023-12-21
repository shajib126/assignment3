"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(category_validation_1.categroyValidations.createCategoryValidationSchema), category_controller_1.CategoryControllers.createCategory);
router.get('/', category_controller_1.CategoryControllers.allCategory);
exports.CategoryRouter = router;
