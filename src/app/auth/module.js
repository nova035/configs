(function (angular) {
    "use strict";

    /*
     * @ngdoc module
     *
     * @name huqas.auth
     *
     * @description
     * Authentication and authorization module
     */

    angular.module("huqas.auth", [
        "huqas.auth.controllers",
        "huqas.auth.services",
        "huqas.auth.states",
        "huqas.auth.oauth2"
    ]);

})(window.angular);
