(function () {
    "use strict";

    describe("Tests for common states :", function() {
        var $state;

        beforeEach(function() {
            module("huqas.common.states");
            module("ui.router");

            inject(["$state", function (s) {
                $state = s;
            }]);
            
        });

        it("should go to /403 url", function () {
            expect($state.href("common_403")).toEqual("#/403");
        });

        it("should go to /about url", function () {
            expect($state.href("about")).toEqual("#/about");
        });
    });
})();
