import { isEmpty, startCase } from 'lodash';

export const validateForm = <T, k = Record<string, string>>(data: T) => {
  let isValid = true;
  let errorObj: k = {} as k;

  for (const key in data) {
    if (isEmpty(data[key as keyof T])) {
      isValid = false;
      errorObj = { ...errorObj, [key]: `${startCase(key)} is required` };
    }
  }

  return { isValid, errorObj };
};
