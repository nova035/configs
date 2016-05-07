(function (angular) {
    "use strict";
    /**
    * @ngdoc module
    *
    * @name huqas.labs.states.labs
    *
    * @description
    * States for the labs views
    *
    */
    angular.module("huqas.labs.states.labs", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("labs", {
            url : "/labs",
            views : {
                "main" : {
                    templateUrl : "common/tpls/main.tpl.html"
                },
                "header@labs": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "body@labs": {
                    templateUrl: "labs/tpls/labs/labs-grid.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Labs"
            }
        })
        .state("labs.create", {
            url : "/add",
            views : {
                "body@labs": {
                    controller : "huqas.labs.controllers.edit",
                    templateUrl: "labs/tpls/labs/lab-edit.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Add Lab"
            }
        })
        .state("labs.edit", {
            url : "/edit/{lab_id:int}",
            views : {
                "body@labs": {
                    controller : "huqas.labs.controllers.edit",
                    templateUrl: "labs/tpls/labs/lab-edit.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Edit Lab"
            }
        })
        .state("labs.report",{
            url:"/reports/{lab_id:int}",
            views: {
                "body@labs": {
                    controller : "huqas.reports.controllers.reports",
                    templateUrl: "labs/tpls/lab-reports/main.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Reports"
            }
        })
        .state("labs.report.lab_report",{
            url:"/lab_report/",
            views: {
                "body@labs": {
                    controller : "huqas.reports.controllers.reports",
                    templateUrl: "reports/tpls/report_view.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Lab Report"
            }
        })
        .state("labs.report.lab_statistics_ql",{
            url:"/lab_statistics_ql",
            views: {
                "body@labs": {
                    controller:"huqas.reports.controllers.statistics.ql",
                    templateUrl: "reports/tpls/statistic_qualitative_view.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Participation Statistics"
            }
        })
        .state("labs.report.lab_statistics_qn",{
            url:"/lab_statistics_qn",
            views: {
                "body@labs": {
                    controller:"huqas.reports.controllers.statistics.qn",
                    templateUrl: "reports/tpls/statistic_quantitative_view.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Participation Statistics"
            }
        });
    }]);
})(window.angular);
