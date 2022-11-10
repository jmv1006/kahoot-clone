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
        if (param.required)
            schema = schema.append({ ["" + param.name]: joi_1.default.string().required() });
        else
            schema = schema.append({ ["" + param.name]: joi_1.default.string().required() });
    }
    return schema;
};
exports.schemaBuilder = schemaBuilder;
