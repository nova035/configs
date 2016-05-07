(function (angular, jQuery) {
    "use strict";

    /**
     * @ngdoc module
     * @name huqasAppConfig
     *
     * @description
     * The main configuration file for the application
     */

    angular.module("huqasAppConfig", [
        "common.logging",
        "api.wrapper",
        "sil.grid",
        "angular-loading-bar",
        "huqas.auth.oauth2",
        "ui.router",
        "angular-toasty",
        "huqas.auth.services",
        "ngIdle",
        "huqas.common.forms",
        "jcs-autoValidate",
        "ncy-angular-breadcrumb"
    ])

    .constant("SERVER_URL", angular.copy(window.HUQAS_SETTINGS.SERVER_URL))
    .constant("CREDENTIALS", angular.copy(window.HUQAS_SETTINGS.CREDENTIALS))
    .constant("SESSION_TIMEOUT", angular.copy(window.HUQAS_SETTINGS.TIMEOUT))

    .constant("HOME_PAGE_NAME", "admin")

    .config(["loggingConfigProvider", function(loggingConfig){
        loggingConfig.LOG_TO_SERVER = false;
        loggingConfig.LOG_SERVER_URL = undefined;
        loggingConfig.LOG_TO_CONSOLE = true;
    }])

    .config(["silGridConfigProvider", function(silGridConfig) {
        silGridConfig.apiMaps = {
            events: ["huqas.events.services", "huqas.events.wrappers"],
            labs: ["huqas.labs.services", "labsApi"]
        };
    }])

    .config(["$urlRouterProvider", function($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    }])

    .config(["$httpProvider", function($httpProvider) {
        var val = "no-cache, no-store, max-age=0";
        $httpProvider.defaults.headers.common["Cache-Control"] = val;
        jQuery.ajaxSetup({
            headers: {
                "Cache-Control": val
            }
        });
    }])

    .config(["IdleProvider", "SESSION_TIMEOUT", function (ip, st) {
        ip.idle(st.kickout);
        ip.timeout(st.warning);
        ip.keepalive(false);
    }])
    .config(["toastyConfigProvider", function(toastyConfigProvider) {
        toastyConfigProvider.setConfig({
            sound: false,
            timeout: 3000,
            clickToClose:true,
            position: "top-right",
            theme: "default"
        });
    }])

    .config(["$breadcrumbProvider", function(breadcrumbProvider) {
        breadcrumbProvider.setOptions({
            sound: false,
            timeout: 3000,
            clickToClose:true,
            position: "top-right",
            theme: "default"
        });
    }])

    .run(["huqas.auth.services.login", function (loginService) {
        loginService.startTimeout();
    }])

    .run(["api.oauth2",function (oauth2) {
        oauth2.setXHRToken(oauth2.getToken());
    }])

    .run(["huqas.auth.services.statecheck", function (statecheck) {
        statecheck.startListening();
    }])

    .run(["bootstrap3ElementModifier", function (bootstrap3ElementModifier) {
        bootstrap3ElementModifier.enableValidationStateIcons(false);
    }]);

})(window.angular, window.jQuery);
