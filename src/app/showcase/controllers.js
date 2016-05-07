(function (angular, _) {
    "use strict";

    angular.module("huqas.lab_instruments.controllers", [
        "ui.router",
        "huqas.events.services",
        "huqas.auth.services",
        "huqas.common.forms",
        "ng-fx"
    ])

    .controller("huqas.lab_instruments.controllers.main", ["$scope",
        "huqas.events.wrappers", "huqas.auth.services.login","konza.showcases",
        function ($scope, wrappers, loginService, show_case) {
            $scope.loggedInUser = loginService.getUser();
            /*Showcases*/
            /*wrappers.organizations.list()
            .success(function (data) {
                $scope.showcases = data;
            })
            .error(function (data) {
                $scope.errors = data;
            });*/
            $scope.showcases = show_case.showcases;
        }
    ])
    .controller("huqas.lab_instruments.controllers.projects", ["$scope",
        "huqas.events.wrappers", "huqas.auth.services.login","konza.projects",
        function ($scope, wrappers, loginService, projects) {
            $scope.loggedInUser = loginService.getUser();
            $scope.projects = projects.projects;
        }
    ])
    .controller("huqas.lab_instruments.controllers.details", ["$scope",
        "$stateParams", function ($scope, $stateParams) {
            $scope.project_id = $stateParams.project_id;
            $scope.project = _.findWhere($scope.projects,
                {id : $scope.project_id});
        }
    ])
    .controller("huqas.lab_instruments.controllers.crowd_fund", ["$scope",
        "konza.showcases", function ($scope, showcases) {
            $scope.showcases = showcases.showcases;
            $scope.showDetail = function (idea) {
                idea.details = !idea.details;
            };
        }
    ])
    .controller("huqas.lab_instruments.controllers.edit_instrument", ["$scope",
        "huqas.events.wrappers", "huqas.common.forms.changes", "$state",
        "$stateParams", "huqas.auth.services.login",
        function ($scope, wrappers, forms, $state, $stateParams,loginService) {
            $scope.select_values = {};
            $scope.loggedInUser = loginService.getUser();
            $scope.instrument_id = $stateParams.instrument_id;
            $scope.lab_instrument = {
                lab : $scope.loggedInUser.lab_id
            };
            $scope.edit_view = $scope.instrument_id ? true : false;

            /*Listing all existing manufacturers*/
            wrappers.manufacturers.filter({page_size:500})
            .success(function (data) {
                $scope.manufacturers = data.results;
            })
            .error(function (data) {
                $scope.errors = data;
            });

            //Get instruments by manufacturer
            $scope.manufacturerInstruments = function (manu_id) {
                wrappers.instruments.filter({manufacturer: manu_id})
                .success(function (data) {
                    $scope.instruments = data.results;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            };

            //Get models by instrument
            $scope.instrumentModels = function (_id) {
                var instrument = _.filter($scope.instruments,{id:_id});
                $scope.instrument = instrument[0];
            };

            if($scope.edit_view) {
                wrappers.lab_instruments.get($scope.instrument_id)
                .success(function (data) {
                    $scope.lab_instrument = data;
                    $scope.select_values = {
                        manufacturer:{
                            manufacturer_id: $scope.lab_instrument.manufacturer_id,
                            manufacturer_name: $scope.lab_instrument.manufacturer_name
                        },
                        instrument:{
                            instrument_id: $scope.lab_instrument.instrument_id,
                            instrument_name: $scope.lab_instrument.instrument_name
                        },
                        instrument_model:{
                            instrument_model: $scope.lab_instrument.instrument_model,
                            instrument_model_name: $scope.lab_instrument.instrument_model_name
                        }
                    };

                    /*Listing instruments by manufacturer*/
                    wrappers.instruments.filter({manufacturer:data.manufacturer_id})
                    .success(function (data) {
                        $scope.instruments = data.results;
                    })
                    .error(function (data) {
                        $scope.errors = data;
                    });
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            } else {
                $scope.lab_instrument.active = true;
            }
            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);
                if (! _.isEmpty(changed)) {
                    if($scope.edit_view){
                        wrappers.lab_instruments.update($scope.instrument_id,
                        changed)
                        .success(function () {
                            $state.go("lab_instruments");
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    }else{
                        wrappers.lab_instruments
                        .create(_.extend(changed,{lab: $scope.loggedInUser.lab_id}))
                        .success(function (){
                            $state.go("lab_instruments");
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    }
                }
            };
        }
    ]);
})(window.angular, window._);
