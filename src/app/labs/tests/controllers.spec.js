(function (_,angular) {
    "use strict";

    describe("Testing the labs controller: ", function () {
        var controller, data, root, scope, SERVER_URL,$state,
            _$stateParams, $httpBackend, WizardHandler;

        beforeEach(function () {
            module("huqasAppConfig");
            module("huqas.labs.controllers");
            module("mgo-angular-wizard");
            module("templates-app");

            inject(["$rootScope", "$controller", "SERVER_URL",
                "$stateParams","$httpBackend","WizardHandler","$state",
                function ($rootScope, $controller, _SERVER_URL,
                          $stateParams, _$httpBackend, _WizardHandler,_state) {
                    root = $rootScope;
                    scope = root.$new();
                    $state = _state;
                    SERVER_URL = _SERVER_URL;
                    $httpBackend = _$httpBackend;
                    WizardHandler = _WizardHandler;
                    $stateParams = _$stateParams;
                    data = {
                        $scope : scope
                    };
                    controller = function (ctrl, params) {
                        return $controller("huqas.labs.controllers."+ctrl, _.extend(data, params));
                    };
                }
            ]);
        });

        it("should test edit lab controller | creating",
            function () {
            inject(["huqas.common.forms.changes","WizardHandler",
                function (formChanges,WizardHandler) {
                var dt = {
                    $stateParams: {},
                    "huqas.common.forms.changes": formChanges,
                    "WizardHandler": WizardHandler
                };
                var frm = {
                    "$dirty": true,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": true,
                        "$modelValue": 1
                    }
                };
                var obj = {
                    next: angular.noop
                };
                var res = {msg: "ok"};
                controller("edit",dt);

                // Test POST
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/").respond(
                200, res);
                spyOn(WizardHandler, "wizard").and.returnValue(obj);
                spyOn(obj, "next");
                scope.$apply();
                root.$digest();
                spyOn(formChanges, "whatChanged").and.returnValue({"lab": 1});
                scope.saveDetails(frm,false);
                $httpBackend.flush();
                expect(obj.next).toHaveBeenCalled();
            }]);
        });

        it("should test edit lab controller | success POST",
            function () {
            inject(["huqas.common.forms.changes","WizardHandler",
                function (formChanges,WizardHandler) {
                var dt = {
                    $stateParams: {lab_id: 1},
                    "huqas.common.forms.changes": formChanges,
                    "WizardHandler": WizardHandler
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var obj = {
                    next: angular.noop
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/1/").respond(
                200, res);
                controller("edit",dt);
                $httpBackend.flush();

                // Test PATCH
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/").respond(
                200, res);
                spyOn(WizardHandler, "wizard").and.returnValue(obj);
                spyOn(obj, "next");
                scope.$apply();
                root.$digest();
                spyOn(formChanges, "whatChanged").and.returnValue({"lab": 1});
                scope.saveDetails(frm,false);
                $httpBackend.flush();
                expect(obj.next).toHaveBeenCalled();
            }]);
        });

        it("should test edit lab controller | success POST",
            function () {
            inject(["huqas.common.forms.changes","WizardHandler",
                function (formChanges,WizardHandler) {
                var dt = {
                    $stateParams: {lab_id: 1},
                    "huqas.common.forms.changes": formChanges,
                    "WizardHandler": WizardHandler
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var obj = {
                    next: angular.noop
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/1/").respond(
                200, res);
                controller("edit",dt);
                $httpBackend.flush();

                // Test PATCH
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/").respond(
                200, res);
                spyOn(WizardHandler, "wizard").and.returnValue(obj);
                spyOn(obj, "next");
                scope.$apply();
                root.$digest();
                spyOn(formChanges, "whatChanged").and.returnValue({"lab": 1});
                scope.saveDetails(frm,false);
                $httpBackend.flush();
                expect(obj.next).toHaveBeenCalled();
            }]);
        });

        it("should test edit lab controller | fail POST",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1},
                    "huqas.common.forms.changes": formChanges
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/1/").respond(
                200, res);
                controller("edit",dt);
                $httpBackend.flush();

                // Test PATCH
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/").respond(
                500, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"lab": 1});
                scope.saveDetails(frm,false);
                $httpBackend.flush();
            }]);
        });

        it("should test edit lab controller | success PATCH | form not empty",
            function () {
            inject(["huqas.common.forms.changes","WizardHandler",
                function (formChanges,WizardHandler) {
                var dt = {
                    $stateParams: {lab_id: 1},
                    "huqas.common.forms.changes": formChanges,
                    "WizardHandler": WizardHandler
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var obj = {
                    next: angular.noop
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/1/").respond(
                200, res);
                controller("edit",dt);
                $httpBackend.flush();

                // Test PATCH
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/1/").respond(
                200, res);
                spyOn(WizardHandler, "wizard").and.returnValue(obj);
                spyOn(obj, "next");
                scope.$apply();
                root.$digest();
                spyOn(formChanges, "whatChanged").and.returnValue({"lab": 1});
                scope.saveDetails(frm,true);
                $httpBackend.flush();
                expect(obj.next).toHaveBeenCalled();
            }]);
        });

        it("should test edit lab controller | PATCH fail > form empty",
            function () {
            inject(["huqas.common.forms.changes","WizardHandler",
                function (formChanges,WizardHandler) {
                var dt = {
                    $stateParams: {lab_id: 1},
                    "huqas.common.forms.changes": formChanges
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var obj = {
                    next: angular.noop
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/1/").respond(
                200, res);
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/").respond(
                200, res);
                spyOn(WizardHandler, "wizard").and.returnValue(obj);
                spyOn(obj, "next");
                scope.$apply();
                root.$digest();
                controller("edit",dt);
                $httpBackend.flush();

                spyOn(formChanges, "whatChanged").and.returnValue({});
                scope.saveDetails(frm,true);
                expect(obj.next).toHaveBeenCalled();
            }]);
        });

        it("should test edit lab controller | PATCH fail > backend",
            function () {
            inject(["huqas.common.forms.changes","WizardHandler",
                function (formChanges,WizardHandler) {
                var dt = {
                    $stateParams: {lab_id: 1},
                    "huqas.common.forms.changes": formChanges
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/1/").respond(
                200, res);
                spyOn(WizardHandler, "wizard");
                controller("edit",dt);
                spyOn(formChanges, "whatChanged").and.returnValue({"lab": 1});
                $httpBackend.flush();
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/1/").respond(
                500, {});
                scope.saveDetails(frm,true);
                $httpBackend.flush();
            }]);
        });

        it("should test edit lab controller | fail", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/labs/1/").respond(
            500, {});
            $httpBackend.expectGET(SERVER_URL+"api/v1/labs/").respond(
            500, {});
            controller("edit",dt);
            $httpBackend.flush();
        });

        it("should test lab_program controller | programs & lab_programs > 0,0", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/catalog/programs/").respond(
            500, {});
            $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
            500, {});
            controller("lab_programs",dt);
            $httpBackend.flush();
        });

        it("should test lab program controller | new  & edit program fns", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            var params = {
                setValidation: false
            };
            var frm = {
                "$dirty": false,
                "$setPristine": angular.noop,
                "lab": {
                    "$dirty": false,
                    "$modelValue": 1
                }
            };
            var prog = {
                "lab": 1
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/catalog/programs/").respond(
            200, {});
            $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
            200, {});
            controller("lab_programs",dt);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

            scope.editProg(frm,prog,params);
            scope.newProg(frm,prog);
        });

        it("should have no changes after saving in lab_program controller",
           function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "program": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/catalog/programs/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                200, {});
                controller("lab_programs",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab program
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_programs/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({});
                scope.saveLabProg(frm,false);
            }]);
        });

        it("should test lab programs | CREATE | reFETCH lab programs > 1,1",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "program": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/catalog/programs/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                200, {});
                controller("lab_programs",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab program
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_programs/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"program": 1});
                scope.saveLabProg(frm,false);

                //reGet lab programs
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                200, {});
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab programs | CREATE | reFETCH lab programs > 0,0",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "program": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/catalog/programs/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                200, {});
                controller("lab_programs",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab program
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_programs/").respond(
                500, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"program": 1});
                scope.saveLabProg(frm,false);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab programs | CREATE | reFETCH lab programs > 1,0",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "program": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/catalog/programs/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                200, {});
                controller("lab_programs",dt);
                $httpBackend.flush();

                //Post new lab program
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_programs/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"program": 1});
                scope.saveLabProg(frm,false);

                //reGet lab programs
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                500, {});
                $httpBackend.flush();
            }]);
        });

        it("should test lab programs | EDIT | reFETCH lab programs > 1,1",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "id":{
                        "$modelValue":1
                    },
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "program": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var lab_prog = {
                    "results" :[
                        {
                            "id": 1
                        }
                    ]
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/catalog/programs/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                200, lab_prog);
                controller("lab_programs",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab program
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/lab_programs/1/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"program": 1});
                scope.saveLabProg(frm,true);

                //reGet lab programs
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                200, {});
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab programs | EDIT | reFETCH lab programs > 0,0",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "id":{
                        "$modelValue":1
                    },
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "program": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/catalog/programs/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                200, {});
                controller("lab_programs",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab program
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/lab_programs/1/").respond(
                500, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"program": 1});
                scope.saveLabProg(frm,true);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab programs | EDIT | reFETCH lab programs > 1,0",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "id":{
                        "$modelValue":1
                    },
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "program": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/catalog/programs/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                200, {});
                controller("lab_programs",dt);
                $httpBackend.flush();

                //Post new lab program
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/lab_programs/1/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"program": 1});
                scope.saveLabProg(frm,true);

                //reGet lab programs
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_programs/?lab=1").respond(
                500, {});
                $httpBackend.flush();
            }]);
        });

        it("should test lab_user controller | users & lab_users > 0,0", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/users/").respond(
            500, {});
            $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
            500, {});
            controller("lab_users",dt);
            $httpBackend.flush();
        });

        it("should test lab user controller | new  & edit user fns", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            var params = {
                setValidation: false
            };
            var frm = {
                "$dirty": false,
                "$setPristine": angular.noop,
                "lab": {
                    "$dirty": false,
                    "$modelValue": 1
                }
            };
            var user = {
                "lab": 1
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/users/").respond(
            200, {});
            $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
            200, {});
            controller("lab_users",dt);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

            scope.editUser(frm,user,params);
            scope.newUser(frm,user);
        });

        it("should have no changes after saving in lab_user controller",
           function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/users/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                200, {});
                controller("lab_users",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab user
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_users/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({});
                scope.saveLabUser(frm,false);
            }]);
        });

        it("should test lab users | CREATE | reFETCH lab users > 1,1",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/users/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                200, {});
                controller("lab_users",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab user
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_users/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabUser(frm,false);

                //reGet lab users
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                200, {});
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab users | CREATE | reFETCH lab users > 0,0",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/users/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                200, {});
                controller("lab_users",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab user
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_users/").respond(
                500, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabUser(frm,false);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab users | CREATE | reFETCH lab users > 1,0",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/users/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                200, {});
                controller("lab_users",dt);
                $httpBackend.flush();

                //Post new lab user
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_users/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabUser(frm,false);

                //reGet lab users
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                500, {});
                $httpBackend.flush();
            }]);
        });

        it("should test lab users | EDIT | reFETCH lab users > 1,1",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "id":{
                        "$modelValue":1
                    },
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var lab_user = {
                    "results" :[
                        {
                            "id": 1
                        }
                    ]
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/users/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                200, lab_user);
                controller("lab_users",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab user
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/lab_users/1/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabUser(frm,true);

                //reGet lab users
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                200, {});
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab users | EDIT | reFETCH lab users > 0,0",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "id":{
                        "$modelValue":1
                    },
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/users/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                200, {});
                controller("lab_users",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab user
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/lab_users/1/").respond(
                500, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabUser(frm,true);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab users | EDIT | reFETCH lab users > 1,0",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "id":{
                        "$modelValue":1
                    },
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/users/").respond(
                200, {});
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                200, {});
                controller("lab_users",dt);
                $httpBackend.flush();

                //Post new lab user
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/lab_users/1/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabUser(frm,true);

                //reGet lab users
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_users/?lab=1").respond(
                500, {});
                $httpBackend.flush();
            }]);
        });

        it("should test lab_contact controller | lab_contacts | backend FAIL", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_contacts/?lab=1").respond(
            500, {});

            controller("lab_contacts",dt);
            $httpBackend.flush();
        });

        it("should test lab_contact controller | lab_contacts", function () {
            var dt = {
                $stateParams: {}
            };
            controller("lab_contacts",dt);
        });

        it("should test lab_contact controller | lab_contacts = 0", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_contacts/?lab=1").respond(
            200, {results: []});
            controller("lab_contacts",dt);

            $httpBackend.flush();
        });

        it("should test lab_contact controller | lab_contacts greater than 0", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_contacts/?lab=1").respond(
            200, {results:[{id:1},{id:2}]});
            controller("lab_contacts",dt);
            $httpBackend.flush();
        });

        it("should test lab contact controller | new  & edit user fns", function () {
            var dt = {
                $stateParams: {lab_id: 1}
            };
            $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_contacts/?lab=1").respond(
            200, {});
            controller("lab_contacts",dt);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should have no changes after saving in lab_contact controller",
           function () {
            inject(["huqas.common.forms.changes","WizardHandler",
                function (formChanges, WizardHandler) {
                var dt = {
                    $stateParams: {lab_id: 1},
                    WizardHandler: WizardHandler
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var obj = {
                    finish: angular.noop
                };
                spyOn($state, "go");
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_contacts/?lab=1").respond(
                200, {});
                controller("lab_contacts",dt);
                spyOn(WizardHandler, "wizard").and.returnValue(obj);
                spyOn(obj, "finish");
                scope.$apply();
                root.$digest();
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab contact
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_contacts/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({});
                scope.saveLabContact(frm,false);
                expect(obj.finish).toHaveBeenCalled();
                expect($state.go).toHaveBeenCalledWith("labs");
            }]);
        });

        it("should test lab contacts | CREATE | reFETCH lab contacts > 1",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                controller("lab_contacts",dt);

                //Post new lab contact
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_contacts/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                spyOn($state, "go");
                scope.saveLabContact(frm,false);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab contacts | CREATE | reFETCH lab contacts > 1,0",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                spyOn($state, "go");
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_contacts/?lab=1").respond(
                200, {});
                controller("lab_contacts",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Post new lab contact
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_contacts/").respond(
                500, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabContact(frm,false);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab contacts | CREATE | reFETCH lab contacts > 1",
            function () {
            inject(["huqas.common.forms.changes","WizardHandler",
                function (formChanges, WizardHandler) {
                var dt = {
                    $stateParams: {lab_id: 1},
                    WizardHandler: WizardHandler
                };
                var frm = {
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var obj = {
                    finish: angular.noop
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_contacts/?lab=1").respond(
                200, {});
                spyOn(WizardHandler, "wizard").and.returnValue(obj);
                spyOn(obj, "finish");
                controller("lab_contacts",dt);
                $httpBackend.flush();

                //Post new lab contact
                $httpBackend.expectPOST(SERVER_URL+"api/v1/labs/lab_contacts/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabContact(frm,false);
                scope.$apply();
                root.$digest();
                $httpBackend.flush();
                expect(obj.finish).toHaveBeenCalled();
            }]);
        });

        it("should test lab contacts | EDIT | reFETCH lab contacts > 1,1",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "id":{
                        "$modelValue":1
                    },
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var lab_contact = {
                    "results" :[
                        {
                            "id": 1
                        }
                    ]
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_contacts/?lab=1").respond(
                200, lab_contact);
                controller("lab_contacts",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Patch lab contact
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/lab_contacts/1/").respond(
                200, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabContact(frm,true);

                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab contacts | EDIT | reFETCH lab contacts > 0",
            function () {
            inject(["huqas.common.forms.changes",
                function (formChanges) {
                var dt = {
                    $stateParams: {lab_id: 1}
                };
                var frm = {
                    "id":{
                        "$modelValue":1
                    },
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_contacts/?lab=1").respond(
                200, {});
                controller("lab_contacts",dt);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();

                //Patch lab contact
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/lab_contacts/1/").respond(
                500, {});
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabContact(frm,true);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }]);
        });

        it("should test lab contacts | EDIT | reFETCH lab contacts > 1",
            function () {
            inject(["huqas.common.forms.changes","WizardHandler",
                function (formChanges, WizardHandler) {
                var dt = {
                    $stateParams: {lab_id: 1},
                    WizardHandler: WizardHandler
                };
                var frm = {
                    "id":{
                        "$modelValue":1
                    },
                    "$dirty": false,
                    "$setPristine": angular.noop,
                    "lab": {
                        "$dirty": false,
                        "$modelValue": 1
                    },
                    "user": {
                        "$dirty": false,
                        "$modelValue": 1
                    }
                };
                var obj = {
                    finish: angular.noop
                };
                $httpBackend.expectGET(SERVER_URL+"api/v1/labs/lab_contacts/?lab=1").respond(
                200, {});
                controller("lab_contacts",dt);
                $httpBackend.flush();

                //Patch lab contact
                $httpBackend.expectPATCH(SERVER_URL+"api/v1/labs/lab_contacts/1/").respond(
                200, {});
                spyOn(WizardHandler, "wizard").and.returnValue(obj);
                spyOn(obj, "finish");
                spyOn(formChanges, "whatChanged").and.returnValue({"user": 1});
                scope.saveLabContact(frm,true);
                scope.$apply();
                root.$digest();
                $httpBackend.flush();
                expect(obj.finish).toHaveBeenCalled();
            }]);
        });

    });
})(window._,window.angular);
