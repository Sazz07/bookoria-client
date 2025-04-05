import { TError } from '../types/global.type';

/**
 * Type guard to check if an unknown error matches our API error structure
 * @param err The error to check
 * @returns Boolean indicating if the error is an API error
 */
export const isApiError = (err: unknown): err is TError => {
  return typeof err === 'object' && err !== null && 'status' in err;
};