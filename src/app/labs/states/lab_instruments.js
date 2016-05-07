(function (angular) {
    "use strict";

    angular.module("huqas.labs.states.lab_instruments", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("labs.lab_instruments", {
            url : "/lab_instruments/{lab_id:int}",
            views : {
                "main" : {
                    templateUrl : "common/tpls/main.tpl.html"
                },
                "body@labs" : {
                    controller : "huqas.labs.controllers.lab_instrument.main",
                    templateUrl : "labs/tpls/lab-instruments/instruments_grid.tpl.html"
                },
                "header@lab_instruments": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Lab Instruments"
            }
        })
        .state("labs.lab_instruments.add_instrument", {
            url : "/add_instrument",
            views : {
                "body@labs" : {
                    controller : "huqas.labs.controllers.edit_instrument",
                    templateUrl : "labs/tpls/lab-instruments/instruments_form.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Add Instrument"
            }
        })
        .state("labs.lab_instruments.edit_instruments", {
            url : "/edit/{instrument_id:int}",
            views : {
                "body@labs" : {
                    controller : "huqas.labs.controllers.edit_instrument",
                    templateUrl : "labs/tpls/lab-instruments/instruments_form.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Edit Instrument"
            }
        });
    }]);
})(window.angular);
