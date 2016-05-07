(function(angular){
    "use strict";

    angular.module("huqas.common.directives.includetpl", [])

    .directive("includeTpl", function() {
        return {
            restrict: "AE",
            templateUrl: function(ele, attrs) {
                return attrs.src;
            }
        };
    });

})(window.angular);
