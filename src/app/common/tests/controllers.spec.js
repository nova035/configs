(function () {
    "use strict";

    describe("Test common controllers ", function () {
        var rootScope, state, loginService, ctrl;

        beforeEach(function () {
            module("huqasAppConfig");
            module("huqas.auth.services");
            module("huqas.common.controllers");
            module("ui.router");

            inject(["$controller", "$rootScope", "huqas.auth.services.login", "$state",
                function (c, r, l, s) {
                    rootScope = r;
                    loginService = l;
                    state = s;
                    ctrl = function (data) {
                        return c("huqas.common.controllers.header", data);
                    };
                }
            ]);
        });

        it("should test header controller", function () {
            var scope = rootScope.$new();
            spyOn(loginService, "getUser").and.returnValue({});
            spyOn(rootScope, "$on");

            ctrl({"$scope": scope, "huqas.auth.services.login": loginService});

            expect(scope.user).toEqual({});
            expect(loginService.getUser).toHaveBeenCalled();
            expect(rootScope.$on).toHaveBeenCalled();
        });

        it("should logout user on idle timeout (user loggedin)", function () {
            var scope = rootScope.$new();
            spyOn(loginService, "getUser").and.returnValue({});
            spyOn(loginService, "isLoggedIn").and.returnValue(true);
            spyOn(loginService, "logout");
            spyOn(state, "go");

            ctrl({
                "$scope": scope,
                "huqas.auth.services.login": loginService,
                "$state": state
            });
            rootScope.$broadcast("IdleTimeout");
            expect(loginService.isLoggedIn).toHaveBeenCalled();
            expect(state.go).toHaveBeenCalled();
        });

        it("should logout user on idle timeout (not on login page)", function () {
            var scope = rootScope.$new();
            spyOn(loginService, "getUser").and.returnValue({});
            spyOn(loginService, "isLoggedIn").and.returnValue(false);
            spyOn(loginService, "logout");
            spyOn(state, "go");

            ctrl({
                "$scope": scope,
                "huqas.auth.services.login": loginService,
                "$state": state
            });
            rootScope.$broadcast("IdleTimeout");
            expect(loginService.isLoggedIn).toHaveBeenCalled();
            expect(state.go).toHaveBeenCalled();
        });

        it("should listen to idletimeout and do nothing if user is out", function () {
            var scope = rootScope.$new();
            spyOn(loginService, "getUser").and.returnValue({});
            spyOn(loginService, "isLoggedIn").and.returnValue(false);
            spyOn(loginService, "logout");
            spyOn(state, "go");
            state.current.name = "login";

            ctrl({
                "$scope": scope,
                "huqas.auth.services.login": loginService,
                "$state": state
            });
            rootScope.$broadcast("IdleTimeout");
            expect(loginService.isLoggedIn).toHaveBeenCalled();
            expect(state.go).not.toHaveBeenCalled();
            expect(loginService.logout).not.toHaveBeenCalled();
        });
    });
})();
