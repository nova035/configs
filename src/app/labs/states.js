(function (angular) {
    "use strict";

    /*
     * @ngdoc module
     *
     * @name huqas.labs.states
     *
     * @description
     * Contains labs state  modules
     */

    angular.module("huqas.labs.states", [
        "huqas.labs.states.labs",
        "huqas.labs.states.lab_instruments",
        "huqas.labs.states.lab_programs"
    ]);

})(window.angular);
