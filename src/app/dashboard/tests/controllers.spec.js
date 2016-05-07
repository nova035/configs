(function () {
    "use strict";

    describe("Testing the dashboard controller: ", function () {
        var controller, data, root, scope, $httpBackend, SERVER_URL, loginService;

        beforeEach(function () {
            module("huqasAppConfig");
            module("huqas.auth.services");
            module("huqas.dashboard.controllers");

            inject(["$rootScope", "$controller", "$httpBackend", "SERVER_URL",
                "huqas.auth.services.login",
                function ($rootScope, $controller, _$httpBackend,
                    _SERVER_URL,_loginService) {
                    root = $rootScope;
                    scope = root.$new();
                    $httpBackend = _$httpBackend;
                    SERVER_URL = _SERVER_URL;
                    loginService = _loginService;
                    data = {
                        $scope : scope
                    };
                    controller = function () {
                        return $controller("huqas.dashboard.controllers.main", data);
                    };
                }
            ]);
        });

        it("should test auth login controller", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            controller("huqas.dashboard.controllers.main");
            scope.loggedInUser = {
                lab_id : "279"
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/events/open_event/")
                .respond(200, {"id" : 1});
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                .respond(200, {results : []});

            scope.lab_id = "1";
            expect(scope.view).toEqual("dashboard");
            $httpBackend.flush();
        });
        it("should test http calls failures", function () {
            spyOn(loginService, "getUser").and.returnValue({lab_id : "1"});
            controller("huqas.dashboard.controllers.main");
            $httpBackend.expectGET(SERVER_URL+"api/v1/events/open_event/")
                .respond(500, {});
            $httpBackend.expectGET(
                SERVER_URL+"api/v1/labs/lab_programs/?lab=1")
                .respond(500, {});

            scope.lab_id = "1";
            expect(scope.view).toEqual("dashboard");
            $httpBackend.flush();
        });
    });
})();
