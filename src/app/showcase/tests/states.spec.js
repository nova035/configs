(function () {
    "use strict";

    describe("Tests for events states :", function() {
        var $state;

        beforeEach(function() {
            module("huqas.lab_instruments.states");
            module("ui.router");

            inject(["$state", function (s) {
                $state = s;
            }]);
        });

        it("should go to /lab_instruments url", function () {
            expect($state.href("lab_instruments")).toEqual("#/lab_instruments");
        });
    });
})();
