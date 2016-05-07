(function (_) {
    "use strict";

    describe("Testing the users controller: ", function () {
        var controller, data, root, scope, SERVER_URL,auth_user,
            _$stateParams, state, $httpBackend;

        beforeEach(function () {
            module("huqasAppConfig");
            module("huqas.labs.services");
            module("huqas.users.controllers");

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
                            "huqas.users.controllers."+ctrl,
                            _.extend(data, params));
                    };
                }
            ]);
        });

        beforeEach(
            inject(["$window",function ($window) {
                auth_user = "auth.user";
                var user = {
                    is_staff: true
                };
                $window.localStorage.setItem(auth_user, JSON.stringify(user));
            }])
        );

        it("should test users controller | success", function () {
            controller("users");
            expect("huqas.users.controllers.users").toBeDefined();
        });
        it("should test editing an user",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        user_id : "1"
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({
                    "name": "get"
                });
                controller("edit", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/users/1/").respond(200,{results :[]});
                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/users/1/")
                    .respond(200, {"name" :"get"});
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test editing a user: fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        user_id : "1"
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({"name": "get"});
                controller("edit", data);
                $httpBackend.expectGET(SERVER_URL +
                    "api/v1/users/1/").respond(500,{});
                $httpBackend.expectPATCH(SERVER_URL +
                    "api/v1/users/1/")
                    .respond(500, {});
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test creating a user : success",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        user_id : null
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({"name": "get"});
                controller("edit", data);
                $httpBackend.expectPOST(SERVER_URL +
                    "api/v1/users/")
                    .respond(200, {"name" :"get"});
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test creating an user: fail",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        user_id : null
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({"name": "get"});
                controller("edit", data);
                $httpBackend.expectPOST(SERVER_URL +
                    "api/v1/users/")
                    .respond(500, {});
                scope.save();
                $httpBackend.flush();
            }]);
        });
        it("should test creating an user",
            function () {
            inject(["huqas.common.forms.changes", function (formChanges) {
                var data = {
                    "$stateParams" : {
                        user_id : null
                    },
                    "$state" : state,
                    "huqas.common.forms.changes": formChanges
                };
                spyOn(state, "go");
                spyOn(formChanges, "whatChanged").and.returnValue({});
                controller("edit", data);
                scope.save();
            }]);
        });
    });
})(window._);
