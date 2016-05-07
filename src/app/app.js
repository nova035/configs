(function (angular) {
    "use strict";

    /**
     * @ngdoc module
     * @name huqasApp
     *
     * @description
     * The main application module.
     * It combines the various components to make the application.
     *
     */
    angular.module("huqasApp", [
        "templates-app",
        "templates-common",
        "common.logging",
        "api.wrapper",
        "huqasAppConfig",
        "huqas.common",
        "huqas.auth",
        "huqas.dashboard",
        "huqas.events",
        "huqas.lab_instruments",
        "huqas.users",
        "huqas.results",
        "ui.calendar",
        "jcs-autoValidate"
    ]);

})(window.angular);
