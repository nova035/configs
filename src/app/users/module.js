(function (angular) {
    "use strict";

    /*
     * @ngdoc module
     *
     * @name huqas.users
     *
     * @description
     * Contains users app modules
     */

    angular.module("huqas.users", [
        "huqas.users.controllers",
        "huqas.users.states",
        "huqas.labs.services"
    ]);

})(window.angular);
