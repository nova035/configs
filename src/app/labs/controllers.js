(function (angular) {
    "use strict";

    /*
     * @ngdoc module
     *
     * @name huqas.labs.controllers
     *
     * @description
     * Contains labs controller modules
     */

    angular.module("huqas.labs.controllers", [
        "huqas.labs.controllers.labs",
        "huqas.labs.controllers.lab_instruments",
        "huqas.labs.controllers.lab_programs"
    ]);

})(window.angular);
