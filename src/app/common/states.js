(function (angular) {

    "use strict";

    angular.module("huqas.common.states", [
        "ui.router"
    ])

    .config(["$stateProvider",
        function ($stateProvider) {
            $stateProvider
                .state("common_403", {
                    url: "/403",
                    views: {
                        "main": {
                            templateUrl: "common/tpls/main.tpl.html"
                        },
                        "header@common_403": {
                            controller: "huqas.common.controllers.header",
                            templateUrl: "common/tpls/header.tpl.html"
                        },
                        "body@common_403": {
                            templateUrl: "common/tpls/403.tpl.html"
                        }
                    }
                }).state("about", {
                    url: "/about",
                    views: {
                        "main": {
                            templateUrl: "common/tpls/main.tpl.html"
                        },
                        "header@about": {
                            controller: "huqas.common.controllers.header",
                            templateUrl: "common/tpls/header.tpl.html"
                        },
                        "body@about": {
                            templateUrl: "common/tpls/about.tpl.html"
                        }
                    }
                });
        }
    ]);

})(window.angular);
