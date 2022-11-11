import Joi from "joi";

interface SchemaParam {
  name: string;
  required: boolean;
  min: number | null;
  max: number | null;
}

const schemaBuilder = (params: Array<SchemaParam>) => {
  let schema = Joi.object({});

  for (const schemaParamObiect in params) {
    const param: SchemaParam = params[schemaParamObiect];

    if (param.required) {
      if (param.min && param.max) {
        schema = schema.append({
          ["" + param.name]: Joi.string()
            .min(param.min)
            .max(param.max)
            .required(),
        });
      } else if (param.min) {
        schema = schema.append({
          ["" + param.name]: Joi.string().min(param.min).required(),
        });
      } else if (param.max) {
        schema = schema.append({
          ["" + param.name]: Joi.string().max(param.max).required(),
        });
      } else
        schema = schema.append({ ["" + param.name]: Joi.string().required() });
    } else {
      if (param.min && param.max) {
        schema = schema.append({
          ["" + param.name]: Joi.string().min(param.min).max(param.max),
        });
      } else if (param.min) {
        schema = schema.append({
          ["" + param.name]: Joi.string().min(param.min),
        });
      } else if (param.max) {
        schema = schema.append({
          ["" + param.name]: Joi.string().max(param.max),
        });
      } else schema = schema.append({ ["" + param.name]: Joi.string() });
    }
  }
  return schema;
};

export { schemaBuilder, SchemaParam };
