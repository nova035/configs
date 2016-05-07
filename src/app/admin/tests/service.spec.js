(function () {
    "use strict";

    describe("Test events services", function () {

        var api;

        beforeEach(function () {
            module("huqasAppConfig");
            module("api.wrapper");
            module("huqas.events.services");

            inject(["api", function (a) {
                api = a;
            }]);
        });

        it("should define api wrappers", function () {
            spyOn(api, "setBaseUrl").and.returnValue({});
            inject(["huqas.events.wrappers", function (w) {
                expect(w.events).toEqual({});
                expect(w.programs).toEqual({});
            }]);
        });
    });
})();
