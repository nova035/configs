(function (_) {
    "use strict";

    describe("Testing the lab instruments controller: ", function () {
        var controller, data, root, scope, SERVER_URL,
            _$stateParams, state, $httpBackend, loginService;

        beforeEach(function () {
            module("huqasAppConfig");
            module("huqas.auth.services");
            module("huqas.lab_instruments.controllers");
            module("huqas.results.controllers");

            inject(["$rootScope", "$controller", "SERVER_URL",
                "$stateParams","$httpBackend", "$state",
                "huqas.auth.services.login",
                function ($rootScope, $controller, _SERVER_URL,
                          $stateParams, _$httpBackend, $state, _loginService) {
                    root = $rootScope;
                    scope = root.$new();
                    SERVER_URL = _SERVER_URL;
                    $httpBackend = _$httpBackend;
                    $stateParams = _$stateParams;
                    state = $state;
                    loginService = _loginService;
                    data = {
                        $scope : scope
                    };
                    controller = function (ctrl, params) {
                        return $controller(
                            "huqas.lab_instruments.controllers."+ctrl,
                            _.extend(data, params));
                    };
                }
            ]);
        });

        it("should test main controller", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            var dt = {
                $stateParams: {instrument_id: 1}
            };
            var res = {msg: "ok"};
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_instruments/?lab=1")
                .respond(200, res);
            controller("main",dt);
            scope.loggedInUser = {lab_id : "1"};
            $httpBackend.flush();
        });

        it("should test failure in http calls main controller", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            var dt = {
                $stateParams: {instrument_id: 1}
            };
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_instruments/?lab=1")
                .respond(500, {});
            controller("main",dt);
            scope.loggedInUser = {lab_id : "1"};
            $httpBackend.flush();
        });
        it("should test editing a lab instrument | manufacturer instruments success",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        instrument_id : "1"
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                var manufacturer =[
                    {id:1}
                ];
                var instrument = {manufacturer_id:1};
                spyOn(state, "go");
                spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "manufacturer_id": "1"
                });
                controller("edit_instrument", data);
                scope.edit_view = true;
                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/manufacturers/?page_size=500")
                    .respond(200,{results :manufacturer});
                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/labs/lab_instruments/1/")
                    .respond(200,instrument);

                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/instruments/?manufacturer=1")
                    .respond(200,instrument);
                $httpBackend.flush();

                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/instruments/?manufacturer=1")
                    .respond(200,{results :{}});
                scope.manufacturerInstruments(1);
                $httpBackend.flush();

                scope.instrumentModels(1);

                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/labs/lab_instruments/1/")
                    .respond(200, {"manufacturer_id": "1"});
                scope.save();
                $httpBackend.flush();
            }]);
        });

        it("should test editing a lab instrument | manufacturer instruments fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        instrument_id : "1"
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                var manufacturer =[
                    {id:1}
                ];
                var instrument = {manufacturer_id:1};
                spyOn(state, "go");
                spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "manufacturer_id": "1"
                });
                controller("edit_instrument", data);
                scope.edit_view = true;
                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/manufacturers/?page_size=500")
                    .respond(200,{results :manufacturer});
                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/labs/lab_instruments/1/")
                    .respond(200,instrument);

                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/instruments/?manufacturer=1")
                    .respond(500,{});
                $httpBackend.flush();

                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/instruments/?manufacturer=1")
                    .respond(200,{results :{}});
                scope.manufacturerInstruments(1);
                $httpBackend.flush();

                scope.instrumentModels(1);

                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/labs/lab_instruments/1/")
                    .respond(200, {"manufacturer_id": "1"});
                scope.save();
                $httpBackend.flush();
            }]);
        });

        it("should test editing a lab instrument | fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        instrument_id : "1"
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };

                spyOn(state, "go");
                spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "manufacturer_id": "1"
                });
                controller("edit_instrument", data);
                scope.edit_view = true;
                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/manufacturers/?page_size=500")
                    .respond(500,{});
                $httpBackend.flush();

                scope.manufacturerInstruments(1);
                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/instruments/?manufacturer=1")
                    .respond(500,{});
                $httpBackend.flush();
                scope.instrumentModels(1);

                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/labs/lab_instruments/1/")
                    .respond(500, {});
                scope.save();
                $httpBackend.flush();
            }]);
        });

        it("should test creating a lab instrument",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {},
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                var manufacturer =[
                    {id:1}
                ];
                spyOn(state, "go");
                spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "manufacturer_id": "1"
                });
                controller("edit_instrument", data);
                scope.edit_view = false;
                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/manufacturers/?page_size=500")
                    .respond(200,{results :manufacturer});
                $httpBackend.flush();

                $httpBackend.expectPOST(SERVER_URL +
                    "api/v1/labs/lab_instruments/")
                    .respond(200, {"manufacturer_id": "1"});
                scope.save();
                $httpBackend.flush();
            }]);
        });

        it("should test creating a lab instrument | fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {},
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                var manufacturer =[
                    {id:1}
                ];
                spyOn(state, "go");
                spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "manufacturer_id": "1"
                });
                controller("edit_instrument", data);
                scope.edit_view = false;
                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/manufacturers/?page_size=500")
                    .respond(200,{results :manufacturer});
                $httpBackend.flush();

                $httpBackend.expectPOST(SERVER_URL +
                    "api/v1/labs/lab_instruments/")
                    .respond(500, {});
                scope.save();
                $httpBackend.flush();
            }]);
        });

        it("should test creating a lab instrument | no changes",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {},
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                var manufacturer =[
                    {id:1}
                ];
                spyOn(state, "go");
                spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
                spyOn(formChanges, "whatChanged").and.returnValue({});
                controller("edit_instrument", data);
                scope.edit_view = false;
                $httpBackend.expectGET(
                    SERVER_URL + "api/v1/catalog/manufacturers/?page_size=500")
                    .respond(200,{results :manufacturer});
                $httpBackend.flush();

                scope.save();
            }]);
        });
    });
})(window._);
