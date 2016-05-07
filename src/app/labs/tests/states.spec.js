(function () {
    "use strict";

    describe("Tests for labs states :", function() {
        var $state;

        beforeEach(function() {
            module("huqas.labs.states");
            module("ui.router");

            inject(["$state", function (s) {
                $state = s;
            }]);
        });

        it("should go to /labs url", function () {
            expect($state.href("labs")).toEqual("#/labs");
        });
    });
})();
