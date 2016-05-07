(function (angular) {
    "use strict";
    /**
    * @ngdoc module
    * @name huqas lab instruments
    *
    * @description
    * The lab instruments module.
    * It is the module that sets up the lab instruments.
    *
    */
    angular.module("huqas.lab_instruments", [
        "huqas.lab_instruments.controllers",
        "huqas.lab_instruments.states"
    ]);
})(window.angular);
