(function (angular,_) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name huqas.labs.controllers.lab_programs
     *
     * @description
     * Controllers for the programs related views
     *
     */
    angular.module("huqas.labs.controllers.lab_programs", [
        "ui.router",
        "huqas.labs.services"
    ])

    /**
     * @ngdoc controller
     *
     * @name huqas.labs.controllers.programs
     *
     * @description
     * Controller for listing the programs
     * flow)
     */
    .controller("huqas.labs.controllers.lab_programs_analytes",
        ["$scope","labsApi","$stateParams",
        function ($scope,labsApi,$stateParams) {
            $scope.form_present = false;
            labsApi.lab_programs.filter({lab:$stateParams.lab_id})
            .success(function (data) {
                $scope.lab_programs = data.results;

                if(!_.isUndefined($stateParams.labprogram_id)){
                    $scope.lab_program = $stateParams.labprogram_id;
                    var event = _.findIndex(data.results, {id:$scope.lab_program});
                    var lab_prog  = _.findWhere($scope.lab_programs,{id:$scope.lab_program});
                    $scope.program = lab_prog.program;
                    $scope.css = event;
                    labsApi.subscriptions.filter({lab_program:$stateParams.labprogram_id})
                    .success(function (data) {
                        $scope.subscriptions = data.results;
                    })
                    .error(function (e) {
                        $scope.errors = e;
                    });
                } else {
                    $scope.lab_program= $scope.lab_programs[0].id;
                    $scope.program= $scope.lab_programs[0].program;
                    labsApi.subscriptions.filter({lab_program:$scope.lab_programs[0].id})
                    .success(function (data) {
                        $scope.subscriptions = data.results;
                    })
                    .error(function (e) {
                        $scope.errors = e;
                    });
                }
            })
            .error(function (e) {
                $scope.errors = e;
            });
            $scope.css = 0;
            //Get lab details
            $scope.lab_id = $stateParams.lab_id;
            $scope.filters = {"lab" : $scope.lab_id};
            labsApi.labs.get($scope.lab_id)
            .success(function (data) {
                $scope.lab = data;
            })
            .error(function (data) {
                $scope.errors = data;
            });
            $scope.getSubscriptions = function (id, program, event) {
                $scope.form_present = false;
                $scope.lab_program = id;
                $scope.program= program;
                $scope.css = event;
                labsApi.subscriptions.filter({lab_program:id})
                .success(function (data) {
                    $scope.subscriptions = data.results;
                })
                .error(function (e) {
                    $scope.errors = e;
                });
            };
        }]
    )
    .controller("huqas.labs.controllers.edit_subscription", ["$scope",
        "labsApi", "huqas.common.forms.changes", "huqas.events.wrappers", "$state",
        "$stateParams",
        function ($scope, labsApi, forms, wrappers, $state, $stateParams) {
            $scope.$parent.form_present = true;
            $scope.select_values = {};
            $scope.subscription_id = $stateParams.subscription_id;
            $scope.lab_program_id = $stateParams.lab_program_id;
            $scope.program_id = $stateParams.program_id;
            $scope.edit_view = $scope.subscription_id ? true : false;
            wrappers.analytes.filter({program:$scope.program_id})
            .success(function (data) {
                $scope.analytes = data.results;
            })
            .error(function (err) {
                $scope.errors = err;
            });
            labsApi.lab_instruments.filter({lab:$stateParams.lab_id})
            .success(function (data) {
                $scope.analyzers = data.results;
            })
            .error(function (err) {
                $scope.errors = err;
            });
            $scope.getConfigurationsAnalyte = function (id) {
                wrappers.configurations.filter({analyte:id})
                .success(function (data) {
                    $scope.configurations = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
                wrappers.unit_conversions.filter({analyte:id})
                .success(function (data) {
                    $scope.units = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
            };
            $scope.getConfigurationsAnalyteReagent = function (_analyte,_reagent) {
                wrappers.configurations.filter({analyte:_analyte,reagent:_reagent})
                .success(function (data) {
                    $scope.configurations = data.results;
                })
                .error(function (err) {
                    $scope.errors = err;
                });
            };
            if($scope.edit_view) {
                labsApi.subscriptions.get($scope.subscription_id)
                .success(function (data) {
                    $scope.subscription = data;
                    wrappers.unit_conversions.filter({analyte:$scope.subscription.analyte})
                    .success(function (data) {
                        $scope.units = data.results;
                    })
                    .error(function (err) {
                        $scope.errors = err;
                    });
                    $scope.select_values = {
                        analyte: {
                            id: $scope.subscription.analyte,
                            analyte_name: $scope.subscription.analyte_name
                        },
                        unit: {
                            unit: $scope.subscription.unit,
                            name: $scope.subscription.unit_name
                        },
                        analyzer: {
                            analyzer: $scope.subscription.analyzer,
                            analyzer_name: $scope.subscription.analyzer_name
                        },
                        reagent: {
                            reagent_name: $scope.subscription.reagent_name
                        },
                        method: {
                            method: $scope.subscription.method,
                            method_name: $scope.subscription.method_name
                        }
                    };
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            } else{
                $scope.subscription = {
                    "active": true
                };
            }
            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);
                if (! _.isEmpty(changed)) {
                    if($scope.edit_view){
                        labsApi.subscriptions.update($scope.subscription_id, changed)
                        .success(function () {
                            $scope.$parent.form_present = false;
                            $state.go("labs.lab_programs",
                                      {labprogram_id:$scope.lab_program_id},
                                      {reload:true});
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    }else{
                        var sub = {
                            configuration: $scope.configurations[0].id,
                            lab_program:$scope.lab_program_id
                        };
                        labsApi.subscriptions.create(_.extend(changed,sub))
                        .success(function (){
                            $scope.$parent.form_present = false;
                            $state.go("labs.lab_programs",
                                      {labprogram_id:$scope.lab_program_id},
                                      {reload:true});
                        })
                        .error(function (er) {
                            $scope.errors = er;
                        });
                    }
                }
            };
        }
    ]);
})(window.angular,window._);
