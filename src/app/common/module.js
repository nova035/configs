(function (angular) {

    "use strict";

    /**
     * @ngdoc module
     *
     * @name huqas.common
     *
     * @description
     * Bundles up all the common modules
     */
    angular.module("huqas.common", [
        "huqas.common.forms",
        "huqas.common.directives",
        "huqas.common.filters",
        "huqas.common.controllers",
        "huqas.common.states",
        "huqas.common.constants",
        "huqas.common.revision",
        "huqas.common.export",
        "huqas.common.errors"
    ]);

})(window.angular);
