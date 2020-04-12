/*
const validationTypes = {
    required: true,
    minLength: 6,
    maxLength: 10,
    email: true,
    string: true,
    integer: true,
    decimal: true,
    telephone: true,
    array: true,
    object: true,
    json: true,
    boolean: true,
    notEmpty: true,
}

const params = {
    paramName,
    paramName,
    paramName,
    paramName,
}

const config = {
    paramName: { validationTypes [, children] },
    paramName: { validationTypes [, children] },
    paramName: { validationTypes [, children] },
    paramName: { validationTypes [, children] },
}

*/


/**
 * https://www.codeigniter.com/user_guide/libraries/form_validation.html
 */

//TODO: доработать вывод ошибок, чтобы можно было смотреть какие именно параметры не верно введены

const is = require("is_js");

const validateParams = async (params, config) => {
    console.log("IN validateParams " + params);

    let isValid = true;
    let paramsName = Object.keys(config);

    let errorMessages = [];

    for (let i = 0; i < paramsName.length; i++) {
        let item = paramsName[i];
        isValid = (await validate(params[item], config[item], params, item)) && isValid;
        if (!isValid) {
            errorMessages.push(item);
            break;
        }
    }

    console.log("OUT validateParams " + errorMessages + " " + params);

    if (errorMessages.length === 0)
        return true;
    else
        throw { errorMessages: [].concat(errorMessages) }
}

const validate = async (value, validation, obj = null, item = null) => {
    console.log("IN validate " + value);
    if (!validation) {
        return true;
    }

    if (value === undefined) {
        return validation.required ? false : true;
    }

    //if it's objects then typesasting object to string
    if (is.object(value)) value = JSON.stringify(value);
    //before validation typecasting parameter to string
    value = value + "";

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (validation.notEmpty) {
        isValid = value.trim() !== '' && isValid;
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
    }

    if (validation.maxLength) {
        isValid = value.length <= validation.maxLength && isValid
    }

    if (validation.greaterThan !== undefined) {
        isValid = value > validation.greaterThan && isValid
    }

    if (validation.greaterThanEqualTo !== undefined) {
        isValid = value >= validation.greaterThanEqualTo && isValid
    }

    if (validation.lessThan !== undefined) {
        isValid = value <= validation.lessThan && isValid
    }

    if (validation.lessThanEqualTo !== undefined) {
        isValid = value <= validation.lessThanEqualTo && isValid
    }

    if (validation.email) {
        isValid = is.email(value) && isValid
    }

    if (validation.string) {
        isValid = is.string(value) && isValid
    }

    if (validation.integer) {
        isValid = +value === parseInt(value) && isValid
        if (isValid)
            obj[item] = +value.trim();

        console.log("integer " + isValid);
    }

    if (validation.decimal) {
        isValid = +value === parseFloat(value) && isValid
        if (isValid)
            obj[item] = value.trim();
    }

    if (validation.telephone) {
        isValid = is.string(value) && isValid
    }

    if (validation.array) {
        try {
            let array = is.array(value) ? value : JSON.parse(value);
            for(let i = 0; i < array.length; i++){
                let item = array[i];
                isValid = await validate(item, validation.item, array, i) && isValid;
            }
        } catch (e) {
            isValid = false;
        }
    }

    if (validation.object) {
        isValid = is.object(value) && isValid
    }

    if (validation.json) {
        isValid = is.json(value) && isValid
    }

    if (validation.boolean) {
        isValid = (value.trim().toLowerCase() === "true" || value.trim().toLowerCase() === "false" ? true : false) && isValid
    }

    if (validation.validFunc) {
        if (validation.validFunc.constructor.name === "AsyncFunction" || validation.validFunc.constructor.name === "Promise")
            isValid = (await validation.validFunc(value)) && isValid;
        else
            isValid = validation.validFunc(value) && isValid;
    }

    if (validation.children && isValid) {
        try {
            let obj = is.object(value) ? value : JSON.parse(value);
            console.log("BEFORE NEW IN " + isValid);
            isValid = (await validateParams(obj, validation.children).isValid) && isValid;
            console.log("AFTER NEW IN " + isValid);
        } catch (e) {
            isValid = false;
        }
    }

    console.log("OUT validate " + value + " " + isValid);
    return isValid;
}

module.exports.validate = validate;
module.exports.validateParams = validateParams;