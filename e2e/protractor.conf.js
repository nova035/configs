"use strict";


var protractorConfig = {

    specs: [
        "../src/app/**/*.e2e.js"
    ],

    getPageTimeout: 2000,

    multiCapabilities: [
        { "browserName": "chrome" }
    ],

    baseUrl: "http://localhost:8062/",

    framework: "jasmine",

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: parseInt(process.env.DEFAULT_TIMEOUT_INTERVAL, 10) || 30000,
        isVerbose: true,
        includeStackTrace: true,
        realtimeFailure: false
    },

    directConnect: true,

    params: {
        page_timeout:  parseInt(process.env.E2E_PAGE_TIMEOUT, 10) || 3000,
        users: {
            lab_admin: {
                username: "10001",
                password: "password1"
            },
            lab_user: {
                username: "10002",
                password: "password1"
            },
            huqas_user: {
                username: "10003",
                password: "password1"
            },
            huqas_admin: {
                username: "10004",
                password: "password1"
            }
        }
    }
};

exports.config = protractorConfig;
