"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaBuilder = void 0;
const joi_1 = __importDefault(require("joi"));
const schemaBuilder = (params) => {
    let schema = joi_1.default.object({});
    for (const schemaParamObiect in params) {
        const param = params[schemaParamObiect];
        if (param.required) {
            if (param.min && param.max) {
                schema = schema.append({
                    ["" + param.name]: joi_1.default.string()
                        .min(param.min)
                        .max(param.max)
                        .required(),
                });
            }
            else if (param.min) {
                schema = schema.append({
                    ["" + param.name]: joi_1.default.string().min(param.min).required(),
                });
            }
            else if (param.max) {
                schema = schema.append({
                    ["" + param.name]: joi_1.default.string().max(param.max).required(),
                });
            }
            else
                schema = schema.append({ ["" + param.name]: joi_1.default.string().required() });
        }
        else {
            if (param.min && param.max) {
                schema = schema.append({
                    ["" + param.name]: joi_1.default.string().min(param.min).max(param.max),
                });
            }
            else if (param.min) {
                schema = schema.append({
                    ["" + param.name]: joi_1.default.string().min(param.min),
                });
            }
            else if (param.max) {
                schema = schema.append({
                    ["" + param.name]: joi_1.default.string().max(param.max),
                });
            }
            else
                schema = schema.append({ ["" + param.name]: joi_1.default.string() });
        }
    }
    return schema;
};
exports.schemaBuilder = schemaBuilder;
