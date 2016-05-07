(function (_) {
    "use strict";

    describe("Testing the labs controller: ", function () {
        var controller, data, root, scope, SERVER_URL,
            _$stateParams, state, $httpBackend;

        beforeEach(function () {
            module("huqasAppConfig");
            module("huqas.events.controllers");

            inject(["$rootScope", "$controller", "SERVER_URL",
                "$stateParams","$httpBackend", "$state",
                function ($rootScope, $controller, _SERVER_URL,
                          $stateParams, _$httpBackend, $state) {
                    root = $rootScope;
                    scope = root.$new();
                    SERVER_URL = _SERVER_URL;
                    $httpBackend = _$httpBackend;
                    $stateParams = _$stateParams;
                    state = $state;
                    data = {
                        $scope : scope
                    };
                    controller = function (ctrl, params) {
                        return $controller(
                            "huqas.events.controllers."+ctrl, _.extend(data,
                                params));
                    };
                }
            ]);
        });

        it("should test edit lab controller | success", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            var res = {msg: "ok"};
            $httpBackend.expectGET(SERVER_URL+"api/v1/events/test_events/").respond(
            200, res);
            controller("main",dt);
            $httpBackend.flush();
        });

        it("should test edit lab controller | fail", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/events/test_events/").respond(
            500, {});
            controller("main",dt);
            $httpBackend.flush();
        });
        it("should test editing a test event",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        event_id : "1"
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                var event_progs = {
                    results : [
                        {
                            "id": 70,
                            "program_code": "BACT435",
                            "program_name": "Bacterial Identification",
                            "active": true,
                            "test_event": "1",
                            "program": "1"
                        },
                        {
                            "id": 83,
                            "program_code": "BCHE435",
                            "program_name": "Basic Chemistry",
                            "active": false,
                            "test_event": "1",
                            "program": "2"
                        }
                    ]
                };
                scope.evet_id = "1";
                scope.event_programs = event_progs.results;
                var programs = {
                    results : [
                        {
                            "id" : "1",
                            "selected" : true
                        },
                        {
                            "id" : "2",
                            "program_event" : "3"
                        }
                    ]
                };
                scope.programs = programs.results;
                scope.create_obj = {"test_event" : "1", "program" : "1"};
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/programs/").respond(200, programs);
                spyOn(formChanges, "whatChanged").and.returnValue({"name": "get"});
                controller("edit_event", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/events/test_events/1/").respond(200,{results :[]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/events/event_programs/?test_event=1")
                    .respond(200, event_progs);
                $httpBackend.expectPOST(SERVER_URL +
                    "api/v1/events/event_programs/")
                    .respond(200);
                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/events/test_events/1/")
                    .respond(200, {"name" :"get"});
                scope.manageProgramEvents(programs.results[0]);
                scope.$apply();
                scope.event_id = "1";
                scope.save();
                scope.matchEventPrograms(
                    scope.event_programs,scope.programs);
                $httpBackend.flush();
            }]);
        });
        it("should test editing a test event : patch event program",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        event_id : "1"
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                var event_progs = {
                    results : [
                        {
                            "id": 70,
                            "program_code": "BACT435",
                            "program_name": "Bacterial Identification",
                            "active": true,
                            "test_event": "1",
                            "program": "1"
                        },
                        {
                            "id": 83,
                            "program_code": "BCHE435",
                            "program_name": "Basic Chemistry",
                            "active": false,
                            "test_event": "1",
                            "program": "2"
                        }
                    ]
                };
                scope.evet_id = "1";
                scope.event_programs = event_progs.results;
                var programs = {
                    results : undefined
                };
                scope.programs = programs.results;
                scope.create_obj = {"test_event" : "1", "program" : "1"};
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/programs/").respond(200, programs);
                spyOn(formChanges, "whatChanged").and.returnValue({"name": "get"});
                controller("edit_event", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/events/test_events/1/").respond(200,{results :[]});

                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/events/event_programs/?test_event=1")
                    .respond(200, event_progs);

                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/events/event_programs/3/")
                    .respond(200);

                scope.$apply();
                scope.event_id = "1";
                scope.save();
                var prog = {
                    "selected" : false,
                    "event_program" : 3
                };
                scope.manageProgramEvents(prog);
                scope.matchEventPrograms(
                    scope.event_programs,scope.programs);
                $httpBackend.flush();
            }]);
        });
        it("should test editing a test event: fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        event_id : "1"
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/programs/").respond(500, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"name": "get"});
                controller("edit_event", data);

                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/events/test_events/1/").respond(500,{});
                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/events/test_events/1/")
                    .respond(500, {});
                scope.event_id = "1";
                var empty_event_progs = [];
                var empty_progs = [];
                scope.matchEventPrograms(empty_event_progs, empty_progs);
                var prog = {
                    "selected" : false,
                    "event_program" : 3
                };
                scope.manageProgramEvents(prog);
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test editing a test event: fail without event programs",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        event_id : "1"
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/programs/").respond(500, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"name": "get"});
                controller("edit_event", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/events/test_events/1/").respond(500,{});
                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/events/test_events/1/")
                    .respond(500, {});
                scope.event_id = "1";
                var empty_event_progs = [{id : "1", program : "5"}];
                var empty_progs = [{id : "3"}];
                scope.matchEventPrograms(empty_event_progs, empty_progs);
                var prog = {
                    "selected" : true
                };
                scope.manageProgramEvents(prog);
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test creating a test event",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        event_id : null
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/programs/").respond(200, {results : []});
                spyOn(formChanges, "whatChanged").and.returnValue({"name": "get"});
                controller("edit_event", data);
                $httpBackend.expectPOST(SERVER_URL +
                    "api/v1/events/test_events/")
                    .respond(200, {"name" :"get"});
                scope.an_event = {"name" : "Test"};
                var prog = {
                    "selected" : true,
                    "event_program" : 3
                };
                scope.manageProgramEvents(prog);
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test creating a test event: fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        event_id : null
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/programs/").respond(200, {results : []});
                spyOn(formChanges, "whatChanged").and.returnValue({"name": "get"});
                controller("edit_event", data);
                $httpBackend.expectPOST(SERVER_URL +
                    "api/v1/events/test_events/")
                    .respond(500, {});
                scope.an_event = {"name" : "Test"};
                var prog = {
                    "selected" : false,
                    "event_program" : false
                };
                scope.manageProgramEvents(prog);
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test creating a test event",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        event_id : null
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/programs/").respond(200, {results : []});
                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/events/event_programs/1/")
                    .respond(200);
                spyOn(formChanges, "whatChanged").and.returnValue({});
                controller("edit_event", data);
                var prog = {
                    "selected" : true,
                    "event_program" : 1
                };
                scope.manageProgramEvents(prog);
                scope.save();
                $httpBackend.flush();
            }]);
        });
    });
})(window._);
