(function (angular) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name huqas.common.errors
     *
     * @description
     * Central location for all the error messages used in the application
     */
    angular.module("huqas.common.errors", [])

    /**
     *
     * @name PWD_RULE
     *
     * @description
     * Rules all passwords must abide by
     *
     */
    .constant(
        "PWD_RULE",
        "The password must be at least 8 characters and contain both letters and numbers"
    );

})(window.angular);
