(function () {
    "use strict";

    describe("Directive: Testing the list assign directive", function () {
        var rootScope, compile;
        var directiveTpl = "<huqas-list-assignment " +
                                "listeditems='listeditems' assigneditems='assigneditems'>" +
                           "</huqas-list-assignment>";

        beforeEach(function () {
            module("huqas.common.directives.listassignment");
            module("templates-app");
            module("templates-common");

            inject(["$rootScope", "$compile",
                function ($rootScope, $compile) {
                    rootScope = $rootScope;
                    compile = $compile;
                }
            ]);
        });
        it("should create huqas list assignment directive",
        inject(["$rootScope", "$compile",function($rootScope, $compile) {
            var scope = $rootScope.$new();
            var template = $compile(directiveTpl)(scope);

            scope.listeditems = [{id: "1", name: "National"}];
            scope.assigneditems = [{id: "2", name: "CHRIO"}];
            scope.$digest();

            var templateAsHtml = template.html();

            expect(templateAsHtml).toContain("National");
        }]));
        it("should test clickedItem function",
        inject(["$rootScope", "$compile",function($rootScope, $compile) {
            var scope = $rootScope.$new();
            var $element = $compile(directiveTpl)(scope);
            scope.$digest();
            var isolatedScope = $element.isolateScope();
            var test_obj = {
                selected : false
            };
            isolatedScope.clickedItem(test_obj);

            expect(test_obj.selected).toBeTruthy();
        }]));
        it("should test setItem function",
        inject(["$rootScope", "$compile",function($rootScope, $compile) {
            var scope = $rootScope.$new();
            var $element = $compile(directiveTpl)(scope);
            scope.$digest();
            var isolatedScope = $element.isolateScope();
            var test_obj = {
                set_selected : false
            };
            isolatedScope.setItem(test_obj);

            expect(test_obj.set_selected).toBeTruthy();
        }]));
        it("should test addItems function",
        inject(["$rootScope", "$compile",function($rootScope, $compile) {
            var scope = $rootScope.$new();
            scope.listeditems = [{id: "1", name: "National"}];
            scope.assigneditems = [
                {
                    set_selected: true,
                    id: "1",
                    name: "test",
                    selected: false
                },
                {
                    set_selected : false,
                    id: "1",
                    name : "National",
                    selected: true
                }
            ];
            var $element = $compile(directiveTpl)(scope);

            scope.$digest();
            var isolatedScope = $element.isolateScope();
            isolatedScope.filtered_items = [
                {
                    selected: false,
                    name: "test"
                },
                {
                    selected : true,
                    name : "test_two"
                }
            ];
            isolatedScope.addItems();
        }]));
        it("should test revertItems function",
        inject(["$rootScope", "$compile",function($rootScope, $compile) {
            var scope = $rootScope.$new();
            scope.listeditems = [{id: "1", name: "National"}];
            scope.assigneditems = [
                {
                    set_selected: true,
                    id: "1",
                    name: "test",
                    selected: false
                },
                {
                    set_selected : false,
                    id: "1",
                    name : "National",
                    selected: true
                }
            ];
            var $element = $compile(directiveTpl)(scope);
            scope.$digest();
            var isolatedScope = $element.isolateScope();

            isolatedScope.revertItems();

        }]));
    });
})();
