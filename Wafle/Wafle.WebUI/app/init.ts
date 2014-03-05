﻿requirejs.config({
    paths: {
        "text": "../lib/text",
        "durandal": "../lib/Durandal/js",
        "plugins": "../lib/Durandal/js/plugins",
        "transitions": "../lib/Durandal/js/transitions",
        "knockout": "../lib/knockout-3.0.0.debug",
        "jquery": "../lib/jquery",
        "jquery-ui": "../lib/jquery-ui",
        "handlebars": "../lib/handlebars-v1.3.0",
        "knockout.punches": "../lib/knockout.punches"
    }
});

require(['main'], () => {});