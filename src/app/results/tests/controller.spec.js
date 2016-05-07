(function () {
    "use strict";

    describe("Testing the results controller: ", function () {
        var controller, data, root, scope, loginService, $httpBackend,
            SERVER_URL, state, _$stateParams;

        beforeEach(function () {
            module("huqasAppConfig");
            module("huqas.auth.services");
            module("huqas.results.controllers");

            inject(["$rootScope", "$controller", "huqas.auth.services.login",
                "$httpBackend", "$state", "SERVER_URL", "$stateParams",
                function ($rootScope, $controller, _loginService,
                    _$httpBackend, $state, _SERVER_URL, $stateParams) {
                    root = $rootScope;
                    scope = root.$new();
                    SERVER_URL = _SERVER_URL;
                    $httpBackend = _$httpBackend;
                    loginService = _loginService;
                    state = $state;
                    $stateParams = _$stateParams;
                    data = {
                        $scope : scope
                    };
                    controller = function (ctrl) {
                        return $controller("huqas.results.controllers."+ctrl, data);
                    };
                }
            ]);
        });

        it("should test 'results' controller", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            spyOn(state, "go");
            controller("results");
            var lab_programs = {results : [{"id" : "2"}]};
            var enrollments = {results : [{"id" : "2"}]};
            $httpBackend.expectGET(SERVER_URL+"api/v1/events/open_event/")
                .respond(200, {"id" : 1});
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                .respond(200, lab_programs);
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/subscriptions/?lab_program=2")
                .respond(200, {resulsts: []});
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/enrollments/?lab_program=2")
                .respond(200, enrollments);
            scope.lab_programs = lab_programs.results;
            scope.counter = 0;
            $httpBackend.flush();
        });
        it("should test 'results' controller no enrollments", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            spyOn(state, "go");
            controller("results");
            var lab_programs = {results : [{"id" : "2"}]};
            var enrollments = {results : []};
            $httpBackend.expectGET(SERVER_URL+"api/v1/events/open_event/")
                .respond(200, {"id" : 1});
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                .respond(200, lab_programs);
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/subscriptions/?lab_program=2")
                .respond(200, {resulsts: []});
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/enrollments/?lab_program=2")
                .respond(200, enrollments);
            scope.lab_programs = lab_programs.results;
            scope.labSubscriptions();
            $httpBackend.flush();
        });
        it("should test failure to get enrollments", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            spyOn(state, "go");
            var dt = {
                "$state" : {
                    current : {name : "results.programs.subscriptions"}
                }
            };
            state = {current : {name : "results.programs.subscriptions"}};
            controller("results", dt);
            var lab_programs = {results : [{"id" : "2"}]};
            var subscritions = {
                results : [
                    {
                        id : "1",
                        analyte : "1"
                    },
                    {
                        id : "2"
                    }
                ]
            };
            var data = {is_quantitative : true};
            scope.subscriptions = {length : "2"};
            scope.counter = "2";
            $httpBackend.expectGET(SERVER_URL+"api/v1/events/open_event/")
                .respond(200, {"id" : 1});
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                .respond(200, lab_programs);
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/subscriptions/?lab_program=2")
                .respond(200, subscritions);
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/enrollments/?lab_program=2")
                .respond(500, {});
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/catalog/analytes/1/")
                .respond(200, data);
            scope.lab_programs = lab_programs.results;
            scope.checker = true;
            scope.labSubscriptions();
            scope.isQuantitative(subscritions.results[0]);
            $httpBackend.flush();
        });
        it("should test is result state", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            inject(["$state", function ($state) {
                spyOn(state, "go");
                $state = {current : {name : "results.programs.subscriptions"}};
                controller("results");
                var lab_programs = {results : [{"id" : "2"}]};
                var subscritions = {
                    results : [
                        {
                            id : "1",
                            analyte : "1"
                        },
                        {
                            id : "2"
                        }
                    ]
                };
                var data = {is_quantitative : true};
                scope.subscriptions = {length : "2"};
                scope.counter = "2";
                $httpBackend.expectGET(SERVER_URL+"api/v1/events/open_event/")
                    .respond(200, {"id" : 1});
                $httpBackend.expectGET(
                    SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                    .respond(200, lab_programs);
                $httpBackend.expectGET(
                    SERVER_URL+"api/v1/labs/subscriptions/?lab_program=2")
                    .respond(200, subscritions);
                $httpBackend.expectGET(
                    SERVER_URL+"api/v1/labs/enrollments/?lab_program=2")
                    .respond(500, {});
                $httpBackend.expectGET(
                    SERVER_URL+"api/v1/catalog/analytes/1/")
                    .respond(200, data);
                scope.lab_programs = lab_programs.results;
                scope.checker = true;
                scope.labSubscriptions();
                scope.isQuantitative(subscritions.results[0]);
                $httpBackend.flush();
            }]);
        });
        it("should test not result state", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            inject(["$state", function ($state) {
                $state = {current : {name : "results.programs.subscriptions"}};
                controller("results");
                var lab_programs = {results : [{"id" : "2"}]};
                var subscritions = {
                    results : [
                        {
                            id : "1",
                            analyte : "1"
                        },
                        {
                            id : "2"
                        }
                    ]
                };
                var data = {is_quantitative : true};
                scope.subscriptions = {length : "2"};
                scope.counter = "2";
                $httpBackend.expectGET(SERVER_URL+"api/v1/events/open_event/")
                    .respond(200, {"id" : 1});
                $httpBackend.expectGET(
                    SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                    .respond(200, lab_programs);
                $httpBackend.expectGET(
                    SERVER_URL+"api/v1/labs/subscriptions/?lab_program=2")
                    .respond(200, subscritions);
                $httpBackend.expectGET(
                    SERVER_URL+"api/v1/labs/enrollments/?lab_program=2")
                    .respond(500, {});
                $httpBackend.expectGET(
                    SERVER_URL+"api/v1/catalog/analytes/1/")
                    .respond(200, data);
                scope.lab_programs = lab_programs.results;
                scope.checker = false;
                scope.labSubscriptions();
                scope.isQuantitative(subscritions.results[0]);
                $httpBackend.flush();
            }]);
        });
        it("should test 'results' controller with stateParam", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            spyOn(state, "go");
            var dt = {
                $stateParams : {program_id : 2},
                state : {current : {name : "results.programs"}}
            };
            var data = {is_quantitative : true};
            controller("results", dt);
            var lab_programs = {results : [{"id" : "2"}]};
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                .respond(200, lab_programs);
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/catalog/analytes/1/")
                .respond(200, data);
            scope.lab_programs = lab_programs.results;
            var sub_obj = {analyte : "1"};
            scope.isQuantitative(sub_obj);
            $httpBackend.flush();
        });
        it("should test is quantitative", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            spyOn(state, "go");
            var dt = {
                $stateParams : {program_id : 2}
            };
            controller("results", dt);
            var lab_programs = {results : [{"id" : "2"}]};
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                .respond(200, lab_programs);
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/catalog/analytes/1/")
                .respond(500, {});
            scope.lab_programs = lab_programs.results;
            var sub_obj = {analyte : "1"};
            scope.isQuantitative(sub_obj);
            $httpBackend.flush();
        });
        it("should test fail to fetch subscriptions", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            var dt = {
                $stateParams : {program_id : 2}
            };
            spyOn(state, "go");
            controller("results", dt);
            var lab_programs = {results : [{"id" : "2"}]};
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                .respond(200, lab_programs);
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/subscriptions/?lab_program=2")
                .respond(500, {});
            scope.lab_programs = lab_programs.results;

            $httpBackend.flush();
        });
        it("should test 'results' controller : http failures", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            var dt = {
                "$stateParams": {program_id : "1"}
            };
            controller("results", dt);
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                .respond(200, {results: []});
            scope.labprog_id = "1";
            $httpBackend.flush();
        });
        it("should test 'results' controller : http failures", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            var dt = {
                "$stateParams": {program_id : "1"}
            };
            controller("results", dt);
            $httpBackend.expectGET(SERVER_URL+"api/v1/events/open_event/")
                .respond(500, {});
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                .respond(500, {});
            $httpBackend.flush();
        });
        it("should test create confirmation function", function () {
            spyOn(state, "go");
            controller("results");
            scope.test_event = {id : "1"};
            $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/enrollments/")
                .respond(200);
            scope.counter = 3;
            var subscriptions = [
                {
                    id : "3",
                    test_event : "1"
                },
                {
                    id : "3",
                    test_event : "1"
                },
                {
                    id : "3",
                    test_event : "1"
                }
            ];
            scope.confirmSubscriptions(subscriptions);
            $httpBackend.flush();
        });
        it("should test create confirmation function two", function () {
            spyOn(state, "go");
            controller("results");
            scope.test_event = {id : "1"};
            $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/enrollments/")
                .respond(200);
            scope.counter = 1;
            var subscriptions = [
                {
                    id : "3",
                    test_event : "1"
                }
            ];
            scope.confirmSubscriptions(subscriptions);
            $httpBackend.flush();
        });
        it("should test create confirmation function: fail", function () {
            spyOn(state, "go");
            controller("results");
            scope.test_event = {id : "1"};
            $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/enrollments/")
                .respond(500, {});
            scope.counter = 3;
            var subscriptions = [
                {
                    id : "3",
                    test_event : "1"
                },
                {
                    id : "3",
                    test_event : "1"
                },
                {
                    id : "3",
                    test_event : "1"
                }
            ];
            scope.confirmSubscriptions(subscriptions);
            $httpBackend.flush();
        });
        it("should test create confirmation function", function () {
            spyOn(state, "go");
            controller("results");
            scope.test_event = {id : "1"};
            scope.counter = 0;
            var subscriptions = [
                {
                    id : "3",
                    test_event : "1"
                }
            ];
            scope.confirmSubscriptions(subscriptions);
        });
        /*Enrollment controller tests*/
        it("should test 'enrollment' controller get enrollment", function () {
            controller("enrollments");
            scope.$apply();
            scope.$parent.lab_program = {id: "2", program : "2"};
            $httpBackend.expectGET(SERVER_URL + "api/v1/labs/enrollments/?lab_program=2")
                .respond(200, {results: []});
            $httpBackend.flush();
        });
        it("should test reversal of enrollment success", function () {
            spyOn(state, "go");
            controller("enrollments");
            scope.$parent.lab_program = {id: "2", program : "2"};
            scope.$parent.test_event = {id : "1"};
            scope.$parent.enrolled = false;
            $httpBackend.expectPOST(SERVER_URL + "api/v1/labs/reverse_enrollments/").respond(200);
            scope.reversal_obj = {
                "lab_program" : scope.lab_program.id,
                "test_event" : scope.$parent.test_event.id,
                "reverse_enrollment" : true
            };
            scope.reverseEnrollment();
            $httpBackend.flush();
        });
        it("should test reversal of enrollment fail", function () {
            controller("enrollments");
            scope.$parent.lab_program = {id: "2", program : "2"};
            scope.$parent.test_event = {id : "1"};
            $httpBackend.expectPOST(SERVER_URL + "api/v1/labs/reverse_enrollments/").respond(500);
            scope.reversal_obj = {
                "lab_program" : scope.lab_program.id,
                "test_event" : scope.$parent.test_event.id,
                "reverse_enrollment" : true
            };
            scope.reverseEnrollment();
            $httpBackend.flush();
        });
        it("should test 'enrollment' controller get enrollment", function () {
            controller("enrollments");
            var enrollments = {results : [{id : 2}]};
            scope.$apply();
            scope.$parent.lab_program = {id: "2", program : "2"};
            $httpBackend.expectGET(SERVER_URL + "api/v1/labs/enrollments/?lab_program=2")
                .respond(200, enrollments);
            scope.enrollments = {length : 1};
            $httpBackend.flush();
        });
        it("should test get enrollment:fail ", function () {
            controller("enrollments");
            scope.$apply();
            scope.$parent.lab_program = {id: "2", program : "2"};
            $httpBackend.expectGET(SERVER_URL + "api/v1/labs/enrollments/?lab_program=2")
                .respond(500, {});
            $httpBackend.flush();
        });
        it("should test 'enrollment' controller", function () {
            controller("enrollments");
            scope.$apply();
            scope.$parent.lab_program = undefined;
        });
        it("should test 'results' controller", function () {
            controller("program_samples");
            expect(scope.$parent.program_sample).toBe(undefined);
        });
        /*Testing program sample*/
        it("should test 'samples' controller get enrollment", function () {
            controller("program_samples");
            var enrollments = {results : [{id : 2}]};
            scope.$apply();
            scope.$parent.lab_program = {id: "2", program : "2"};
            $httpBackend.expectGET(SERVER_URL + "api/v1/catalog/programs/2/")
                .respond(200, enrollments);
            scope.enrollments = {length : 1};
            $httpBackend.flush();
        });
        it("should test get programs:fail ", function () {
            controller("program_samples");
            scope.$apply();
            scope.$parent.lab_program = {id: "2", program : "2"};
            $httpBackend.expectGET(SERVER_URL + "api/v1/catalog/programs/2/")
                .respond(500, {});
            $httpBackend.flush();
        });
        it("should test 'program samples' controller", function () {
            controller("program_samples");
            scope.$apply();
            scope.$parent.lab_program = undefined;
        });
        it("should test 'program samples' controller", function () {
            spyOn(state, "go");
            controller("program_samples");
            scope.$parent.lab_id = "3";
            scope.$parent.test_event = {id : "2"};
            scope.sample_counter = 1;
            scope.a_program = {
                samples : [
                    {
                        id : "1",
                        lab : "3",
                        test_event : "2",
                        program_sample : "1"
                    }
                ]
            };
            $httpBackend.expectPOST(SERVER_URL + "api/v1/labs/sample_conditions/")
                .respond(200);
            scope.sampleConditions();
            $httpBackend.flush();
        });
        it("should test sample counter > posting counter", function () {
            spyOn(state, "go");
            controller("program_samples");
            scope.$parent.lab_id = "3";
            scope.$parent.test_event = {id : "2"};
            scope.sample_counter = 5;
            scope.a_program = {
                samples : [
                    {
                        id : "1",
                        lab : "3",
                        test_event : "2",
                        program_sample : "1"
                    }
                ]
            };
            $httpBackend.expectPOST(SERVER_URL + "api/v1/labs/sample_conditions/")
                .respond(200);
            scope.sampleConditions();
            $httpBackend.flush();
        });
        it("should test 'program samples' controller", function () {
            controller("program_samples");
            scope.$parent.lab_id = "3";
            scope.$parent.test_event = {id : "2"};
            scope.sample_counter = 1;
            scope.a_program = {
                samples : [
                    {
                        id : "1",
                        lab : "3",
                        test_event : "2",
                        program_sample : "1"
                    }
                ]
            };
            $httpBackend.expectPOST(SERVER_URL + "api/v1/labs/sample_conditions/")
                .respond(500, {});
            scope.sampleConditions();
            $httpBackend.flush();
        });
        it("should test sample counter < posting counter", function () {
            spyOn(state, "go");
            controller("program_samples");
            scope.$parent.lab_id = "3";
            scope.$parent.test_event = {id : "2"};
            scope.sample_counter = 0;
            scope.a_program = {
                samples : [
                    {
                        id : "1",
                        lab : "3",
                        test_event : "2",
                        program_sample : "1"
                    }
                ]
            };
            scope.sampleConditions();
        });
    });
})();
