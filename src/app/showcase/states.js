(function (angular) {
    "use strict";

    angular.module("huqas.lab_instruments.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("lab_instruments", {
            url : "/showcase",
            views : {
                "main" : {
                    templateUrl : "common/tpls/main.tpl.html"
                },
                "body@lab_instruments" : {
                    controller : "huqas.lab_instruments.controllers.main",
                    templateUrl : "showcase/tpls/instruments_grid.tpl.html"
                },
                "header@lab_instruments": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "footer@lab_instruments" : {
                    templateUrl : "common/tpls/footer.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Lab Instruments"
            },
            requireUser: false,
            requireLogin: false
        })
        .state("projects", {
            url : "/projects",
            views : {
                "main" : {
                    templateUrl : "common/tpls/main.tpl.html"
                },
                "body@projects" : {
                    controller : "huqas.lab_instruments.controllers.projects",
                    templateUrl : "showcase/tpls/projects_list.tpl.html"
                },
                "header@projects": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "footer@projects" : {
                    templateUrl : "common/tpls/footer.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Lab Instruments"
            },
            requireUser: false,
            requireLogin: false
        })
        .state("projects.details", {
            url : "/:project_id/detail",
            views : {
                "project-detail@projects" : {
                    controller: "huqas.lab_instruments.controllers.details",
                    templateUrl : "showcase/tpls/project_details.tpl.html"
                }
            },
            requireUser: false,
            requireLogin: false
        })
        .state("crowd_fund", {
            url : "/crowdfunding",
            views : {
                "main" : {
                    templateUrl : "common/tpls/main.tpl.html"
                },
                "body@crowd_fund" : {
                    controller : "huqas.lab_instruments.controllers.crowd_fund",
                    templateUrl : "showcase/tpls/crowd_fund.tpl.html"
                },
                "header@crowd_fund": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "footer@crowd_fund" : {
                    templateUrl : "common/tpls/footer.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Lab Instruments"
            },
            requireUser: false,
            requireLogin: false
        });
    }]);
})(window.angular);
