(function (angular) {
    "use strict";
    /**
    * @ngdoc module
    *
    * @name huqas.results.states
    *
    * @description
    * States for the results views
    *
    */
    angular.module("huqas.results.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("messages", {
            url : "/messages/{user_id}",
            views : {
                "main" : {
                    templateUrl : "common/tpls/main.tpl.html"
                },
                "header@messages": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "common/tpls/header-on-login.tpl.html"
                },
                "body@messages": {
                    controller: "huqas.results.controllers.results",
                    templateUrl: "results/tpls/main.tpl.html"
                },
                "side-view@messages" : {
                    controller: "huqas.results.controllers.results",
                    templateUrl : "results/tpls/programs.tpl.html"
                },
                "nested-view@messages" : {
                    controller : "huqas.results.controllers.results",
                    templateUrl : "results/tpls/nested_content.tpl.html"
                },
                "footer@messages" : {
                    templateUrl : "common/tpls/footer.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Results"
            }
        })
        .state("results.programs", {
            url : "/programs",
            views : {
                "side-view@results" : {
                    templateUrl : "results/tpls/programs.tpl.html"
                },
                "nested-view@results.programs" : {
                    controller : "huqas.results.controllers.enrollments",
                    templateUrl : "results/tpls/nested_content.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Program"
            }
        })
        .state("results.programs.quantitative_results", {
            url : "/:sample_id/quantitative_results",
            views : {
                "nested-view@results.programs" : {
                    controller : "huqas.results.controllers.quantitative_results",
                    templateUrl : "results/tpls/quantitative_results.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label : "Quantitative Results"
            }
        })
        .state("results.programs.subscription", {
            url : "/subscription",
            views : {
                "nested-view@results.programs" : {
                    templateUrl : "results/tpls/confirm_subscription.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Subscription"
            }
        })
        .state("results.programs.program_samples", {
            url : "/program_samples",
            views : {
                "side-view@results.programs" : {
                    templateUrl : "results/tpls/programs.tpl.html"
                },
                "nested-view@results.programs" : {
                    controller : "huqas.results.controllers.program_samples",
                    templateUrl : "results/tpls/program_samples.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Program Samples"
            }
        })
        .state("results.programs.reverse_enrollment", {
            url : "/reverse_enrollment",
            views : {
                "delete@results.programs" : {
                    controller : "huqas.results.controllers.enrollments",
                    templateUrl : "results/tpls/reverse_enrollment.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Reverse Enrollment"
            }
        });
    }]);
})(window.angular);
