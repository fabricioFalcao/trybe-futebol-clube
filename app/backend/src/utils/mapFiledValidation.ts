import { JoiError } from '../types/joiError';
import mapStatusHTTP from './mapStatusHTTP';

const mapFieldValidation = (error: JoiError): number => {
  const errorType = error.details[0].type;
  if (errorType === 'any.required' || errorType === 'string.empty') {
    return mapStatusHTTP('BAD_REQUEST');
  }
  console.log(error);
  return mapStatusHTTP('UNAUTHORIZED');
};

export default mapFieldValidation;
