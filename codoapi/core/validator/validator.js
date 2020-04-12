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

const is = require('is_js');

const validateParams = (params, config) => {
  let isValid = true;
  let paramsName = null;
  if (config) {
    paramsName = Object.keys(config);
  } else {
    paramsName = [];
  }

  let errorMessages = [];

  // paramsName.forEach((item, index) => {
  //     isValid = validate(params[item], config[item], params, item) && isValid;
  //     errorMessages.push(`${item} was missing or invalid`);
  // });

  for (let i = 0; i < paramsName.length; i++) {
    let item = paramsName[i];
    isValid = validate(params[item], config[item], params, item) && isValid;
    if (!isValid) {
      errorMessages.push(item);
      break;
    }
  }

  return {
    isValid: isValid,
    errorMessages: [].concat(errorMessages)
  };
};

const validate = (value, validation, obj = null, item = null) => {
  if (!validation) {
    return true;
  }

  if (value === undefined) {
    return validation.required ? false : true;
  }

  //if it's objects then typesasting object to string
  if (is.object(value)) value = JSON.stringify(value);
  //before validation typecasting parameter to string
  value = value + '';

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (validation.notEmpty) {
    isValid = value.trim() !== '' && isValid;
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }

  if (validation.validFunc) {
    isValid = validation.validFunc(value) && isValid;
  }

  if (validation.maxLength) {
    isValid = value.length <= validation.maxLength && isValid;
  }

  if (validation.greaterThan !== undefined) {
    isValid = value > validation.greaterThan && isValid;
  }

  if (validation.greaterThanEqualTo !== undefined) {
    isValid = value >= validation.greaterThanEqualTo && isValid;
  }

  if (validation.lessThan !== undefined) {
    isValid = value <= validation.lessThan && isValid;
  }

  if (validation.lessThanEqualTo !== undefined) {
    isValid = value <= validation.lessThanEqualTo && isValid;
  }

  if (validation.email) {
    isValid = is.email(value) && isValid;
  }

  if (validation.string) {
    isValid = is.string(value) && isValid;
  }

  if (validation.integer) {
    isValid = +value === parseInt(value) && isValid;
    if (isValid) {
      obj[item] = +value.trim();
    }
  }

  if (validation.decimal) {
    isValid = +value === parseFloat(value) && isValid;
    if (isValid) {
      obj[item] = +value.trim();
    }
  }

  if (validation.telephone) {
    isValid = is.string(value) && isValid;
  }

  if (validation.array) {
    try {
      let array = is.array(value) ? value : JSON.parse(value);
      array.forEach((item, i) => {
        isValid = validate(item, validation.item, array, i) && isValid;
      });
    } catch (e) {
      isValid = false;
    }
  }

  if (validation.object) {
    isValid = is.object(value) && isValid;
  }

  if (validation.json) {
    isValid = is.json(value) && isValid;
  }

  if (validation.boolean) {
    isValid = (value.trim().toLowerCase() === 'true' || value.trim()
    .toLowerCase() === 'false' ? true : false) && isValid;
  }

  if (validation.children && isValid) {
    try {
      //console.log("BEFORE JSON parsing: ", is.object(value) ? Object.keys(value) : value);
      let obj = is.object(value) ? value : JSON.parse(value);
      // console.log("AFTER JSON parsing: ", obj);
      // console.log("AFTER JSON parsing: ", validation.children);
      isValid = validateParams(obj, validation.children).isValid && isValid;
    } catch (e) {
      //console.log("error children", e);
      isValid = false;
    }
  }
  return isValid;
};

module.exports.validate = validate;
module.exports.validateParams = validateParams;
