(function () {
    "use strict";

    describe("Tests for users states :", function() {
        var $state;

        beforeEach(function() {
            module("huqas.users.states");
            module("ui.router");

            inject(["$state", function (s) {
                $state = s;
            }]);
        });

        it("should go to /users url", function () {
            expect($state.href("users")).toEqual("#/users");
        });
    });
})();
