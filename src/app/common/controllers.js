(function (angular) {
    "use strict";

    angular.module("huqas.common.controllers", [
        "huqas.auth.services"
    ])
    .controller("huqas.common.controllers.header",
        ["$rootScope", "$state", "$scope", "huqas.auth.services.login",
        function ($rootScope, $state, $scope, loginService) {
            $scope.user = loginService.getUser();
            $rootScope.$on("IdleTimeout", function () {
                if (loginService.isLoggedIn() || $state.current.name !== "login") {
                    loginService.dumpState($state.current, $state.params);
                    $state.go("logout", {"timeout": "true"});
                }
            });
        }]
    );

})(window.angular);
