export function humanReadableTime(time: string) {
  return `${new Date(time).toLocaleDateString()} ${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
}

export const ucFirst = (str: string) :string => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};
export const showPopup = ({ popupId }: { popupId: string }) => {

  const avatar = document.getElementById(popupId) as HTMLElement;
  avatar.classList.add('popup_opened');
};

export const hidePopup = (popup: HTMLElement) => {
  popup.classList.remove('popup_opened');
};

export const getFormData = (formId: string) => {
  const data: Record<string, any> = {};
  const form:HTMLElement = document.getElementById(formId)! as HTMLFormElement;
  const formData = new FormData(form as HTMLFormElement);
  formData.forEach((value, key) => data[key] = value);
  return data;
};

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

