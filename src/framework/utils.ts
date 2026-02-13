export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const arrCopy = obj.map((item) => cloneDeep(item));
    return arrCopy as unknown as T;
  }

  const objCopy: { [K in keyof T]: T[K] } = {} as T;
  Object.keys(obj).forEach((k) => {
    const key = k as keyof T;
    objCopy[key] = cloneDeep(obj[key]);
  });

  return objCopy;
}

type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function trim(string: string, chars: string) {
  const str = ' ' + string + ' ';

  if (str && chars === undefined) {
    return string.trim();
  }

  if (!str || !chars) {
    return (string || '');
  }

  const regFirst = new RegExp(` ${chars}`, 'gi');
  const regSecond = new RegExp(`${chars} `, 'gi');

  return str
    .replace(regFirst, '')
    .replace(regSecond, '')
    .trim();
}
