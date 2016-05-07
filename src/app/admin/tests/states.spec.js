(function () {
    "use strict";

    describe("Tests for events states :", function() {
        var $state;

        beforeEach(function() {
            module("huqas.events.states");
            module("huqas.dashboard.states");
            module("ui.router");

            inject(["$state", function (s) {
                $state = s;
            }]);
        });

        it("should go to /test_events url", function () {
            expect($state.href("dashboard.events")).toEqual("#/test_events");
        });
    });
})();
