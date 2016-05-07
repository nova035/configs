(function () {
    "use strict";

    describe("Test revision", function () {

        var wrapper, httpBackend, server_url, rootScope;

        beforeEach(function () {
            module("huqas.common.revision");
            module("api.wrapper");
            module("huqasAppConfig");

            inject(["api", "$httpBackend", "SERVER_URL", "$rootScope",
                function (api, $httpBackend, SERVER_URL, $rootScope) {
                    wrapper = api.setBaseUrl("test/api/");
                    httpBackend = $httpBackend;
                    server_url = SERVER_URL;
                    rootScope = $rootScope;
                }
            ]);

            spyOn(wrapper, "get").and.callThrough();
        });

        describe("test revision controller", function () {
            var ctrl, log;

            beforeEach(function () {
                inject(["$controller", "$log", function ($controller, $log) {
                    log = $log;
                    spyOn(log, "error");
                    ctrl = function (data) {
                        return $controller("huqas.revision.controller", data);
                    };
                }]);
            });

            it("should complain if wrapper is not set", function () {
                var scope = rootScope.$new();
                scope.id = 3;
                var data = { "$scope": scope };
                var err_fxn = function () {ctrl(data);};
                expect(err_fxn).toThrow(new Error("wrapper for revision is undefined"));
            });

            it("should fetch revisions", function () {
                var scope = rootScope.$new();
                scope.wrapper = wrapper;
                scope.id = 3;
                var data = { "$scope": scope };
                ctrl(data);
                expect(scope.showRevisions).toBe(false);
                httpBackend
                    .expectGET(server_url+"test/api/3/?fields=__rev__&include_audit=true")
                    .respond(200, {"revisions": []});
                scope.fetchRevisions();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.revisions).toEqual([]);
                expect(scope.showRevisions).toBe(true);
                expect(log.error).not.toHaveBeenCalled();
            });

            it("should catch revision fetch error", function () {
                var scope = rootScope.$new();
                scope.wrapper = wrapper;
                scope.id = 3;
                var data = { "$scope": scope };
                ctrl(data);
                expect(scope.showRevisions).toBe(false);
                httpBackend
                    .expectGET(server_url+"test/api/3/?fields=__rev__&include_audit=true")
                    .respond(400, {"revisions": []});
                scope.fetchRevisions();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.revisions).toEqual(undefined);
                expect(scope.showRevisions).toBe(false);
                expect(log.error).toHaveBeenCalled();
            });

            it("should hide revisions", function () {
                var scope = rootScope.$new();
                scope.wrapper = wrapper;
                scope.id = 3;
                var data = { "$scope": scope };
                ctrl(data);
                expect(scope.showRevisions).toBe(false);
                httpBackend
                    .expectGET(server_url+"test/api/3/?fields=__rev__&include_audit=true")
                    .respond(200, {"revisions": []});
                scope.fetchRevisions();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.revisions).toEqual([]);
                expect(scope.showRevisions).toBe(true);
                expect(log.error).not.toHaveBeenCalled();

                scope.hideRevisions();
                expect(scope.showRevisions).toBe(false);
            });
        });

        describe("test revision directive", function () {

            var $compile, scope;

            beforeEach(function () {

                inject(["$compile", function (c) {
                    $compile = c;
                    scope = rootScope.$new();
                    scope.e_id = 3;
                    scope.wrapper = wrapper;
                }]);
            });

            it("should compile", function () {
                var tpl = "<huqas-revision-view id='e_id' wrapper='wrapper'></huqas-revision-view>";
                $compile(tpl)(scope);
            });
        });
    });

})();
