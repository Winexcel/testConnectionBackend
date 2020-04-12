"use strict"

/**
 * Codoend entry point
 */

const express = require("express");
const bodyParser = require('body-parser');
const routes = require("@routers/appRoutes");

class Provider  {
    constructor() {
        this.app = express();
        this.models = [];
        this.controllers = [];
        this.routers = [];
    }

    /**
     * Initialize server
     */
    init(){
        this.app.use(bodyParser.json()); // support json encoded bodies
        this.app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
        routes(this.app);
        this.app.listen(3000);
    }

    /**
     * Close server
     */
    close(){

    }
}

module.exports = Provider;