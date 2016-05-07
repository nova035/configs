(function (angular) {
    "use strict";
    /**
    * @ngdoc module
    * @name huqas events
    *
    * @description
    * The events module.
    * It is the module that sets up the events.
    *
    */
    angular.module("huqas.events", [
        "huqas.events.controllers",
        "huqas.events.services",
        "huqas.events.states"
    ]);
})(window.angular);
