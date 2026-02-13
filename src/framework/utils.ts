type StringIndexed = Record<string, any>;

export function queryStringify(data: StringIndexed): string | never {
    if (typeof data !== "object") {
        throw new Error("Data must be object");
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        const value = data[key];
        const endLine = index < keys.length - 1 ? "&" : "";

        if (Array.isArray(value)) {
            const arrayValue = value.reduce<StringIndexed>(
                (result, arrData, index) => ({
                    ...result,
                    [`${key}[${index}]`]: arrData
                }),
                {}
            );

            return `${result}${queryStringify(arrayValue)}${endLine}`;
        }

        if (typeof value === "object") {
            const objValue = Object.keys(value || {}).reduce<StringIndexed>(
                (result, objKey) => ({
                    ...result,
                    [`${key}[${objKey}]`]: value[objKey]
                }),
                {}
            );

            return `${result}${queryStringify(objValue)}${endLine}`;
        }

        return `${result}${key}=${value}${endLine}`;
    }, "");
}

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

type Indexed<T = any> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
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
    let str = ' ' + string + ' ';

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
