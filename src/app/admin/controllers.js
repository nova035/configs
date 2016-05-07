(function (angular, _) {
    "use strict";
    /**
    * @ngdoc module
    *
    * @name huqas.events.controllers
    *
    * @description
    * Controllers for the events related views
    *
    */

    angular.module("huqas.events.controllers", [
        "ui.router",
        "huqas.events.services",
        "720kb.datepicker",
        "ui.bootstrap.tpls",
        "huqas.common.forms",
        "huqas.auth.services"
    ])
    /**
    * @ngdoc controller
    *
    * @name huqas.events.controllers.main
    *
    * @description
    * Controller for events view
    */
    .controller("huqas.events.controllers.main", ["$scope",
        "huqas.events.wrappers", "huqas.auth.services.login",
        "konza.showcases",
        function ($scope, wrapper, loginService, show_case) {
            $scope.loggedInUser = loginService.getUser();
            $scope.showcases = show_case.showcases;
            $scope.user_showcase = _.findWhere($scope.showcases,
                {"id" : $scope.loggedInUser.id});
            $scope.show = {
                idea : true,
                show_case : true,
                contacts : true
            };
            $scope.showDetail = function (idea) {
                idea.details = !idea.details;
            };
            $scope.showIdea = function (frm_name) {
                if(frm_name === "idea_frm"){
                    $scope.show.idea = !$scope.show.idea;
                }
                else if(frm_name === "case_frm"){
                    $scope.show.show_case = !$scope.show.show_case;
                }
                else if(frm_name === "contacts_frm") {
                    $scope.show.contacts = !$scope.show.contacts;
                }
            };
            $scope.save = function (frm) {
                $scope.showIdea(frm.$name);
            };
        }
    ])
    /*TODOs
    *Adding event program workflow
    *during editing or creation of a test event
    */
    .controller("huqas.events.controllers.edit_event", ["$scope", "$state",
        "$stateParams", "huqas.events.wrappers", "huqas.common.forms.changes",
        function ($scope, $state,$stateParams, wrappers, forms) {
            $scope.programs = [];
            wrappers.programs.list()
            .success(function (data) {
                $scope.programs = data.results;
            })
            .error(function (data) {
                $scope.errors = data;
            });
            $scope.event_id = $stateParams.event_id;
            $scope.edit_view = $scope.event_id ? true : false;
            $scope.matchEventPrograms = function (ep, p) {
                if(ep.length > 0) {
                    _.each(p, function (program) {
                        var obj = _.findWhere(ep,
                            {"program" : program.id});
                        if(obj) {
                            program.selected = obj.active ? true : false;
                            program.event_program = obj.id;
                        }
                    });
                }
            };
            $scope.manageProgramEvents = function (prog) {
                if(prog.selected) {
                    if(prog.event_program) {
                        wrappers.event_programs.update(prog.event_program,
                        {"active" : true})
                        .success(function () {})
                        .error(function (data) {$scope.errors = data;});
                    }else {
                        $scope.create_obj = {
                            "test_event" : $stateParams.event_id,
                            "program" : prog.id
                        };
                        wrappers.event_programs.create($scope.create_obj)
                        .success(function (data) {
                            prog.event_program = data.id;
                        })
                        .error(function (data) {$scope.errors = data;});
                    }
                }
                else{
                    if(prog.event_program){
                        wrappers.event_programs.update(prog.event_program,
                        {"active" : false})
                        .success(function () {})
                        .error(function (data) {$scope.errors = data;});
                    }
                }
            };
            if($scope.edit_view) {
                wrappers.events.get($scope.event_id)
                .success(function (data) {
                    $scope.an_event = data;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
                wrappers.event_programs.filter({"test_event" :$scope.event_id})
                .success(function (data) {
                    $scope.event_programs = data.results;
                    $scope.$watch("programs", function (p) {
                        if (_.isUndefined(p)){
                            return;
                        }
                        $scope.matchEventPrograms($scope.event_programs, p);
                    });
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            }

            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);
                if (! _.isEmpty(changed)) {
                    if($scope.edit_view){
                        wrappers.events.update($scope.event_id, changed)
                        .success(function () {
                            $state.go("events", {reload: true});
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    }else{
                        wrappers.events.create($scope.an_event)
                        .success(function (){
                            $state.go("events");
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
