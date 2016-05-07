(function (_) {
    "use strict";

    describe("Testing the lab_programs controller: ", function () {
        var controller, data, root, scope, SERVER_URL,
            _$stateParams, state, $httpBackend;

        beforeEach(function () {
            module("huqasAppConfig");
            module("huqas.auth.services");
            module("huqas.labs.services");
            module("huqas.events.services");
            module("huqas.labs.controllers.lab_programs");

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
                            "huqas.labs.controllers."+ctrl,
                            _.extend(data, params));
                    };
                }
            ]);
        });

        it("should test lab_programs controller |query parameter: lab_prog  | 1,1 ", function () {
            inject([ function () {
                var data = {
                    "$stateParams" : {
                        labprogram_id: 1,
                        lab_id: 1,
                        program_id : 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state
                };
                var lab_program = {
                    id:1
                };
                controller("lab_programs_analytes", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_programs/?lab=1").respond(200,{results :[lab_program]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/?lab_program=1").respond(200,{results :[]});
                $httpBackend.flush();

                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/?lab_program=1").respond(200,{results :[]});
                scope.getSubscriptions(1,1,1);
                $httpBackend.flush();

                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/?lab_program=1").respond(500,{});
                scope.getSubscriptions(1,1,1);
                $httpBackend.flush();
            }]);
        });
        it("should test lab_programs controller |query parameter: lab_prog  | 1,0 ", function () {
            inject([ function () {
                var data = {
                    "$stateParams" : {
                        labprogram_id: 1,
                        lab_id: 1,
                        program_id : 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state
                };
                var lab_program = {
                    id:1
                };
                controller("lab_programs_analytes", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_programs/?lab=1").respond(200,{results :[lab_program]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/1/").respond(200,{});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/?lab_program=1").respond(500,{results :[]});
                $httpBackend.flush();
            }]);
        });
        it("should test lab_programs controller | 1,1", function () {
            inject([ function () {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state
                };
                var lab_program = {
                    id:1
                };
                controller("lab_programs_analytes", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_programs/?lab=1").respond(200,{results :[lab_program]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/?lab_program=1").respond(200,{results :[]});
                $httpBackend.flush();

                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/?lab_program=1").respond(200,{results :[]});
                scope.getSubscriptions(1,1,1);
                $httpBackend.flush();

                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/?lab_program=1").respond(500,{});
                scope.getSubscriptions(1,1,1);
                $httpBackend.flush();
            }]);
        });
        it("should test lab_programs controller | 0", function () {
            inject([ function () {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state
                };
                controller("lab_programs_analytes", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_programs/?lab=1").respond(500,{});
                $httpBackend.flush();
            }]);
        });
        it("should test lab_programs controller | 1,0", function () {
            inject([ function () {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state
                };
                var lab_program = {
                    id:1
                };
                controller("lab_programs_analytes", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_programs/?lab=1").respond(200,{results :[lab_program]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/?lab_program=1").respond(500,{});
                $httpBackend.flush();
            }]);
        });




        it("should test subscriptions controller | failed calls",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "name": "get"
                });
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/analytes/?program=1").respond(500,{});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_instruments/?lab=1").respond(500,{});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/1/").respond(500,{});
                controller("edit_subscription", data);
                $httpBackend.flush();
            }]);
        });
        it("should test subscriptions controller | getConfigurationsAnalyte() | success",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                controller("edit_subscription", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/configurations/?analyte=1").respond(200,{});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/unit_conversions/?analyte=1").respond(200,{});
                scope.getConfigurationsAnalyte(1);
                $httpBackend.flush();
            }]);
        });
        it("should test subscriptions controller | getConfigurationsAnalyte() | fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                controller("edit_subscription", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/configurations/?analyte=1").respond(500,{});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/unit_conversions/?analyte=1").respond(500,{});
                scope.getConfigurationsAnalyte(1);
                $httpBackend.flush();
            }]);
        });
        it("should test subscriptions controller | getConfigurationsAnalyteReagent() | success",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                controller("edit_subscription", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/configurations/?analyte=1&reagent=1").respond(200,{});
                scope.getConfigurationsAnalyteReagent(1,1);
                $httpBackend.flush();
            }]);
        });
        it("should test subscriptions controller | getConfigurationsAnalyteReagent() | fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                controller("edit_subscription", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/configurations/?analyte=1&reagent=1").respond(500,{});
                scope.getConfigurationsAnalyteReagent(1,1);
                $httpBackend.flush();
            }]);
        });
        it("should test editing a subscription | PATCH",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "name": "get"
                });
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/analytes/?program=1").respond(200,{results :[]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_instruments/?lab=1").respond(200,{results :[]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/1/").respond(200,{analyte:1});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/unit_conversions/?analyte=1").respond(200,{results :[]});
                controller("edit_subscription", data);
                $httpBackend.flush();
                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/labs/subscriptions/1/")
                    .respond(200, {"name" :"get"});
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test editing a subscription | PATCH fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1,
                        subscription_id : 1
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "name": "get"
                });
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/analytes/?program=1").respond(200,{results :[]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_instruments/?lab=1").respond(200,{results :[]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/subscriptions/1/").respond(200,{results :[]});
                controller("edit_subscription", data);
                $httpBackend.flush();
                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/labs/subscriptions/1/")
                    .respond(500, {});
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test creating a subscription | POST",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "name": "get"
                });
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/analytes/?program=1").respond(200,{results :[]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_instruments/?lab=1").respond(200,{results :[]});
                controller("edit_subscription", data);
                $httpBackend.flush();
                scope.edit_view = false;
                scope.configurations = [{id:1}];
                $httpBackend.expectPOST(SERVER_URL +
                    "api/v1/labs/subscriptions/")
                    .respond(200, {"name" :"get"});
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test creating a subscription | empty form",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/analytes/?program=1").respond(200,{results :[]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_instruments/?lab=1").respond(200,{results :[]});
                controller("edit_subscription", data);
                $httpBackend.flush();
                scope.edit_view = false;
                scope.configurations = [{id:1}];
                scope.save();
            }]);
        });
        it("should test creating a subscription | POST fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        program_id : 1,
                        lab_id: 1,
                        lab_program_id : 1
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "name": "get"
                });
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/catalog/analytes/?program=1").respond(200,{results :[]});
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/labs/lab_instruments/?lab=1").respond(200,{results :[]});
                controller("edit_subscription", data);
                $httpBackend.flush();
                scope.edit_view = false;
                scope.configurations = [{id:1}];
                $httpBackend.expectPOST(SERVER_URL +
                    "api/v1/labs/subscriptions/")
                    .respond(500, {});
                scope.save();
                $httpBackend.flush();
            }]);
        });
    });
})(window._);
