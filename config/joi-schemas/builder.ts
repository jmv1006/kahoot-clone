import Joi from "joi";

interface SchemaParam {
  name: string;
  required: boolean;
}

const schemaBuilder = (params: Array<SchemaParam>) => {
  let schema = Joi.object({});

  for (const schemaParamObiect in params) {
    const param: SchemaParam = params[schemaParamObiect];

    if (param.required)
      schema = schema.append({ ["" + param.name]: Joi.string().required() });
    else schema = schema.append({ ["" + param.name]: Joi.string().required() });
  }

  return schema;
};

export { schemaBuilder, SchemaParam };
