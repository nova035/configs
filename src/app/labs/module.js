(function (angular) {
    "use strict";

    /*
     * @ngdoc module
     *
     * @name huqas.labs
     *
     * @description
     * Contains labs app modules
     */

    angular.module("huqas.labs", [
        "ui.select",
        "huqas.labs.controllers",
        "huqas.labs.services",
        "huqas.setup.controllers",
        "huqas.labs.states"
    ]);

})(window.angular);
