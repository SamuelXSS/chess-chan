import { errorHandler } from './handler.js';

const validateSchema = (schema, obj, res) => {
  try {
    const result = schema.validate(obj, { abortEarly: false });

    if (result.error) {
      return errorHandler(400, result.error.details[0].message, res);
    }
    return result.value;
  } catch (err) {
    return errorHandler(500, 'Erro ao tentar validar os dados!', res);
  }
};

export { validateSchema };