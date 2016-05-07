(function (angular) {
    "use strict";

    angular.module("huqas.labs.states.lab_programs", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("labs.lab_programs", {
            url : "/lab_programs/{lab_id:int}",
            views : {
                "main" : {
                    templateUrl : "common/tpls/main.tpl.html"
                },
                "body@labs" : {
                    controller : "huqas.labs.controllers.lab_programs_analytes",
                    templateUrl : "labs/tpls/lab-programs/programs_grid.tpl.html"
                },
                "header@lab_programs": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Lab Analytes"
            }
        })
        .state("labs.lab_programs.create_subscription", {
            url : "/add/{program_id:int}/{lab_program_id:int}",
            views : {
                "form@labs.lab_programs": {
                    controller : "huqas.labs.controllers.edit_subscription",
                    templateUrl: "labs/tpls/lab-programs/lab-program-edit.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Add Analyte"
            }
        })
        .state("labs.lab_programs.edit_subscription", {
            url : "/edit/{program_id:int}/{lab_program_id:int}/{subscription_id:int}",
            views : {
                "form@labs.lab_programs": {
                    controller : "huqas.labs.controllers.edit_subscription",
                    templateUrl: "labs/tpls/lab-programs/lab-program-edit.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Edit Analyte"
            }
        });
    }]);
})(window.angular);
