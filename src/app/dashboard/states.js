(function (angular) {
    "use strict";

    angular.module("huqas.dashboard.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("dashboard", {
            url : "/",
            views : {
                "main" : {
                    controller : "huqas.dashboard.controllers.main",
                    templateUrl : "dashboard/tpls/main.tpl.html"
                },
                "lab-view@dashboard" : {
                    controller : "huqas.dashboard.controllers.main",
                    templateUrl : "dashboard/tpls/lab_dashboard.tpl.html"
                },
                "title@dashboard": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "footer@dashboard": {
                    templateUrl : "common/tpls/footer.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Dashboard"
            },
            requireUser: false,
            requireLogin: false
        });
    }]);
})(window.angular);
