(function () {
    "use strict";

    describe("Tests for results states :", function() {
        var $state;

        beforeEach(function() {
            module("huqas.results.states");
            module("ui.router");

            inject(["$state", function (s) {
                $state = s;
            }]);
        });

        it("should go to /results url", function () {
            expect($state.href("results")).toEqual("#/results/");
        });
    });
})();
