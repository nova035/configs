(function (angular, _) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name huqas.results.controllers
     *
     * @description
     * Controllers for the results related views
     *
     */
    angular.module("huqas.results.controllers", [
        "ui.router",
        "huqas.events.services",
        "huqas.auth.services",
        "huqas.common.forms",
        "ng-fx"
    ])

    /**
     * @ngdoc controller
     *
     * @name huqas.results.controllers.results
     *
     * @description
     * Controller for listing the results
     * flow)
     */
    .controller("huqas.results.controllers.results",
        ["$scope",
        "huqas.auth.services.login", "$stateParams", "konza.chat_list",
        "huqas.common.forms.changes", "$anchorScroll", "$location",
        function ($scope, loginService, $stateParams, chatlist, forms,
            $anchorScroll, $location) {
            $scope.loggedInUser = loginService.getUser();
            $scope.chat_list = chatlist.list;
            $scope.gotoMsg = function(x) {
                var newHash = "msg" + x;
                if ($location.hash() !== newHash) {
                    // set the $location.hash to `newHash` and
                    // $anchorScroll will automatically scroll to it
                    $location.hash("msg" + x);
                } else {
                    // call $anchorScroll() explicitly,
                    // since $location.hash hasn't changed
                    $anchorScroll();
                }
            };
            $scope.activeChat = function (active_id) {
                _.each($scope.chat_list, function (chat) {
                    if(chat.id === active_id && chat.active !== true) {
                        /*poping program from lab_programs*/
                        $scope.chat_list = _.without($scope.chat_list,
                            chat);
                        /*adding back as the first item of the array*/
                        $scope.chat_list.unshift(chat);
                        chat.active = true;
                        $scope.gotoMsg(chat.messages.length);
                    }
                    else if(chat.id !== active_id && chat.active === true) {
                        chat.active = false;
                    }
                });
            };
            if($scope.chat_list) {
                $scope.user_id = $stateParams.user_id ? $stateParams.user_id :
                    $scope.chat_list[0].id;
                $scope.activeChat($scope.user_id);
            }
            $scope.msg = {text : "", focus : true};
            $scope.save = function (frm, evt, msg_str) {
                evt.preventDefault();
                var changed = forms.whatChanged(frm);
                if(changed) {
                    var msg_obj = {
                        mine : $scope.msg.text,
                        mine_time : "10/01/2016 at 09:00"
                    };
                    msg_str.push(msg_obj);
                    $scope.msg.text = "";
                    $scope.gotoMsg(msg_str.length);
                }
            };
        }]
    )
    .controller("huqas.results.controllers.enrollments", ["$scope",
        "huqas.events.wrappers", "$state",
        function ($scope, wrappers, $state) {
            $scope.reverseEnrollment = function () {
                $scope.reversal_obj = {
                    "lab_program" : $scope.lab_program.id,
                    "test_event" : $scope.$parent.test_event.id,
                    "reverse_enrollment" : true
                };

                wrappers.reverse_enrollments.create($scope.reversal_obj)
                .success(function () {
                    $scope.$parent.enrolled = false;
                    $state.go("results.programs",
                        {program_id : $scope.$parent.lab_program.id, reload : true});
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            };
            $scope.$watch("lab_program", function (lab_prog) {
                if(_.isUndefined(lab_prog)) {
                    return;
                }
                wrappers.lab_enrollments.filter({"lab_program" :
                    $scope.$parent.lab_program.id})
                .success(function (data) {
                    $scope.$parent.enrollments = data.results;
                    $scope.$parent.enrolled = $scope.enrollments.length ? true : false;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            });
        }
    ])
    .controller("huqas.results.controllers.quantitative_results", ["$scope",
        "huqas.events.wrappers",
        function ($scope, wrappers) {
            $scope.$watch("enrollments", function (enrollments) {
                if(_.isUndefined(enrollments)){
                    return;
                }
                $scope.results = $scope.enrollments;
                _.each($scope.results, function (result) {
                    var analyte_obj = _.findWhere($scope.subscriptions,
                        {configuration : result.configuration});
                    result.analyte_name = analyte_obj.analyte_name;
                    result.unit_name = analyte_obj.unit_name;
                });
                wrappers.result_codes.list()
                .success(function (data) {
                    $scope.result_codes = data.results;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            });
        }
    ])
    .controller("huqas.results.controllers.program_samples", ["$scope",
        "huqas.events.wrappers", "$state",
        function ($scope, wrappers, $state) {
            $scope.$parent.program_samples = false;
            $scope.$watch("lab_program", function (lab_prog) {
                if(_.isUndefined(lab_prog)) {
                    return;
                }
                wrappers.programs.get($scope.$parent.lab_program.program)
                .success(function (data) {
                    $scope.a_program = data;
                    $scope.sample_counter = $scope.a_program.samples.length;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            });
            $scope.sampleConditions = function () {
                var post_counter = 1;
                _.each($scope.a_program.samples, function (sample) {
                    sample.lab = $scope.$parent.lab_id;
                    sample.test_event = $scope.$parent.test_event.id;
                    sample.program_sample = sample.id;
                    if(post_counter <= $scope.sample_counter) {
                        wrappers.sample_conditions.create(sample)
                        .success(function () {
                            post_counter ++;
                            if(post_counter >= $scope.sample_counter){
                                $state.go("results.programs", {program_id :
                                    $scope.$parent.lab_program.id,
                                    reload : true});
                            }
                        })
                        .error(function (data) {
                            $scope.$parent.errors = data;
                        });
                    }
                });
            };
        }
    ]);
})(window.angular, window._);
