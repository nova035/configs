(function (angular) {
    "use strict";

    angular.module("huqas.events.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("admin", {
            url : "/administration/",
            views : {
                "main" : {
                    templateUrl : "common/tpls/main.tpl.html"
                },
                "body@admin" : {
                    controller : "huqas.events.controllers.main",
                    templateUrl : "admin/tpls/events_grid.tpl.html"
                },
                "header@admin": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "common/tpls/header-on-login.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Admin"
            }
        })
        .state("dashboard.events.add_event", {
            url : "/new_event",
            views : {
                "grid-view@dashboard" : {
                    controller : "huqas.events.controllers.edit_event",
                    templateUrl : "events/tpls/events_form.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Add Event"
            }
        })
        .state("dashboard.events.edit_event", {
            url : "/edit/:event_id",
            views : {
                "grid-view@dashboard" : {
                    controller : "huqas.events.controllers.edit_event",
                    templateUrl : "events/tpls/events_form.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Edit Event"
            }
        });
    }]);
})(window.angular);
