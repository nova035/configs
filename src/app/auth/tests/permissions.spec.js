(function (angular) {
    "use strict";

    describe("Testing permissions module :", function () {

        beforeEach(function () {
            module("huqasAppConfig");
            module("huqas.auth.services");
            module("huqas.auth.permissions");
        });

        describe("Testing permission checker service: ", function () {
            var loginService;

            beforeEach(inject(["huqas.auth.services.login",
                function (ls) {
                    loginService = ls;
                }
            ]));

            it("should not allow non-loggedin users", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(false);
                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasPermission("hello")).toBe(false);
                    expect(permChecker.hasUserFeature("county")).toBe(false);
                }]);
            });

            it("should not allow loggedin users without permission", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({all_permissions: []});

                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasPermission("hello")).toBe(false);
                }]);
            });

            it("should not allow loggedin users without feature", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({});

                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasUserFeature("county")).toBe(false);
                }]);
            });

            it("should allow loggedin users with permissions", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").
                and.returnValue({all_permissions: ["hello", "world"]});

                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasPermission("hello,world")).toBe(true);
                }]);
            });

            it("should not allow loggedin users without all permissions", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({all_permissions: ["hello"]});

                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasPermission("hello,world")).toBe(false);
                }]);
            });

            it("should allow loggedin users with features (and)", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({county: "meru", "is_admin":true});

                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasUserFeature("county,is_admin")).toBe(true);
                }]);
            });

            it("should allow loggedin users with all features (or)", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({county: "meru", "is_admin":true});

                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasUserFeature("county|is_admin")).toBe(true);
                }]);
            });

            it("should allow loggedin users with some features (or)", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({county: "meru"});

                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasUserFeature("county|admin")).toBe(true);
                }]);
            });

            it("should not allow loggedin users without any feature (or)", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({});

                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasUserFeature("county|admin")).toBe(false);
                }]);
            });

            it("should not allow loggedin users without all features", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({county: "meru"});

                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasUserFeature("county,admin")).toBe(false);
                }]);
            });

            it("should not allow if permission is not valid", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({all_permissions: []});

                inject(["huqas.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasPermission()).toBe(false);
                    expect(permChecker.hasUserFeature()).toBe(false);
                    expect(permChecker.hasPermission("")).toBe(false);
                    expect(permChecker.hasUserFeature("")).toBe(false);
                    expect(permChecker.hasPermission({})).toBe(false);
                    expect(permChecker.hasUserFeature({})).toBe(false);
                    expect(function () {permChecker.hasPermission("a,w|q");}).toThrow();
                    expect(function () {permChecker.hasUserFeature("a,w|q");}).toThrow();
                }]);
            });

        });

        describe("Testing requires-permission directive :", function () {
            var compile, rootscope, loginService, permChecker;

            beforeEach(inject(["$compile", "$rootScope", "huqas.auth.permissions.checker",
                "huqas.auth.services.login",
                function (c, r, pc, ls) {
                    compile = c;
                    rootscope = r;
                    permChecker = pc;
                    loginService = ls;
                }
            ]));

            it("should disallow element without permission", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);

                var element = angular.element(
                    "<div><div id='r'><p requires-permission=''>asd</p></div></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).not.toContain("asd");

                element = angular.element(
                    "<div><div id='r'><p requires-permission>asd</p></div></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).not.toContain("asd");
            });

            it("should allow element", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser")
                .and.returnValue({all_permissions: ["view_counties"]});

                var element = angular.element(
                    "<div id='r'><p requires-permission='view_counties'>asd</p></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).toContain("asd");
            });

            it("should remove element if not logged in", function () {
                var tags = [
                    "requires-permission",
                    "x-requires-permission",
                    "data-requires-permission"
                ];
                tags.forEach(function (tag) {
                    var element = angular.element(
                        "<div><div id='r'><p " + tag + "='view_counties'>YEAH</p></div></div>"
                    );
                    compile(element)(rootscope);
                    expect(element.html()).not.toContain("YEAH");
                });
            });

            it("should remove element if logged in but without permission", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({all_permissions: []});
                var tags = [
                    "requires-permission", "x-requires-permission", "data-requires-permission"
                ];
                tags.forEach(function (tag) {
                    var element = angular.element(
                        "<div><div id='r'><p " + tag + "='view_counties'>YEAH</p></div></div>"
                    );
                    compile(element)(rootscope);
                    expect(element.html()).not.toContain("YEAH");
                });
            });
        });

        describe("Testing requires-user-feature directive :", function () {
            var compile, rootscope, loginService;

            beforeEach(inject(["$compile", "$rootScope", "huqas.auth.services.login",
                function (c, r, ls) {
                    compile = c;
                    rootscope = r;
                    loginService = ls;
                }
            ]));

            it("should remove element without feature", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);

                var element = angular.element(
                    "<div><div id='r'><p requires-user-feature=''>asd</p></div></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).not.toContain("asd");

                element = angular.element(
                    "<div><div id='r'><p requires-user-feature>asd</p></div></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).not.toContain("asd");
            });

            it("should allow element", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({county: "meru"});

                var element = angular.element(
                    "<div id='r'><p requires-user-feature='county'>asd</p></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).toContain("asd");
            });

            it("should remove element if not logged in", function () {
                var tags = [
                    "requires-user-feature",
                    "x-requires-user-feature",
                    "data-requires-user-feature"
                ];
                tags.forEach(function (tag) {
                    var element = angular.element(
                        "<div><div id='r'><p " + tag + "='national'>YEAH</p></div></div>"
                    );
                    compile(element)(rootscope);
                    expect(element.html()).not.toContain("YEAH");
                });
            });

            it("should remove element if logged in but without feature", function () {
                spyOn(loginService, "isLoggedIn").and.returnValue(true);
                spyOn(loginService, "getUser").and.returnValue({});
                var tags = [
                    "requires-user-feature", "x-requires-user-feature", "data-requires-user-feature"
                ];
                tags.forEach(function (tag) {
                    var element = angular.element(
                        "<div><div id='r'><p " + tag + "='national'>YEAH</p></div></div>"
                    );
                    compile(element)(rootscope);
                    expect(element.html()).not.toContain("YEAH");
                });
            });
        });
    });
})(window.angular);
