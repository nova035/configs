(function () {
    "use strict";

    describe("Tests for dashboard states :", function() {
        var $state;

        beforeEach(function() {
            module("huqas.dashboard.states");
            module("ui.router");

            inject(["$state", function (s) {
                $state = s;
            }]);
        });

        it("should go to /dashboard url", function () {
            expect($state.href("dashboard")).toEqual("#/");
        });
    });
})();
