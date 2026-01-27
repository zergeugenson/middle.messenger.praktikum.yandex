const getElement = (e: Event) : string => {
    if (!(e.target instanceof HTMLInputElement)) {
        return '';
    }
    return e.target.value;
}
const validateLogin = (e: Event): string => {
    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(getElement(e))) {
        return 'от 3 до 20 символов, латиница, без пробелов'
    }
    return ''
}
const validatePassword = (e: Event): string => {
    if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(getElement(e))) {
        return 'от 8 до 40 символов, + одна заглавная буква и цифра.'
    }
    return ''
}

export { validateLogin, validatePassword };
