(function (angular) {
    "use strict";

    /**
     * @ngdoc module
     * @name huqas dashboard
     *
     * @description
     * The dashboard module.
     * It is the module that sets up the dashboard.
     *
     */

    angular.module("huqas.dashboard", [
        "huqas.dashboard.controllers",
        "huqas.dashboard.states"
    ]);

})(window.angular);
