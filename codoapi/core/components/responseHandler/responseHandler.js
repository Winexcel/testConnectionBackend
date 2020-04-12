"use strict";

const is = require("is_js");

const responseHandler = {
    handle(data) {
        if (is.array(data))
            return {
                "response": [].concat(data)
            }
        if (is.object(data))
            return {
                "response": {
                    ...data,
                }
            }

        if (is.not.object(data) && is.not.array(data))
            return {
                "response": data,
            }
    }
};

module.exports = responseHandler;