"use strict";

var schoolAPIRouter = require("./apis/school"),
    groupAPIRouter = require("./apis/group");

function register(app) {
    // api routers
    app.use("/api/schools/", schoolAPIRouter);
    app.use("/api/groups/", groupAPIRouter);
}

exports.register = register;
