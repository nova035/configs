(function () {

    "use strict";

    describe("Test include tpl directive", function () {
        var tpl = "<include-tpl src='step.html'></include-tpl>";

        beforeEach(function () {
            module("huqas.common.directives.includetpl");
            module("templates-app");
        });

        it("should compile", function () {
            inject(["$compile","$rootScope","$httpBackend",
                function ($compile, $rootScope,$httpBackend) {
                $httpBackend.expectGET("step.html").respond("<div>Test</div>");
                var scope = $rootScope.$new();
                var el = $compile(tpl)(scope);
                scope.$apply(el);
            }]);
        });
    });
})();
