(function () {
    "use strict";

    describe("Test labs module services", function () {
        beforeEach(function(){
            module("huqasAppConfig");
            module("api.wrapper");
            module("huqas.labs.services");
            module("huqas.common.constants");
            module("huqas.auth.oauth2");
        });

        describe("Test api wrappers", function() {

            it("should have lab wrappers defined", function() {
                inject(["labsApi",function(wrappers){
                    expect(wrappers.labs.apiBaseUrl)
                        .toEqual("api/v1/labs/");
                }]);
            });
            it("should test multiStepHelper.validationOnLoad: items > 1", function () {
                inject(["multiStepHelper",function (multiSp) {
                    var list_length = 1;
                    var result = {
                        show_form : false,
                        exitValidation : true
                    };
                    var params = multiSp.validationOnLoad(list_length);
                    expect(params).toEqual(result);
                }]);
            });

            it("should test multiStepHelper.validationOnLoad: items < 1", function () {
                inject(["multiStepHelper",function (multiSp) {
                    var list_length = 0;
                    var result = {
                        show_form : true,
                        edit : false,
                        exitValidation : false
                    };
                    var params = multiSp.validationOnLoad(list_length);
                    expect(params).toEqual(result);
                }]);
            });

            it("should test multiStepHelper.uiStepEdit: form showing", function () {
                inject(["multiStepHelper",function (multiSp) {
                    var params = {
                        show_form: true
                    };
                    var item = {
                        name: "item",
                        program: 1,
                        program_name: "program"
                    };
                    var result = {
                        show_form : true,
                        edit: true,
                        select_values:{
                            program:{
                                id: 1,
                                name: "program"
                            }
                        }
                    };
                    var output = multiSp.uiSetupEdit(item,params);
                    expect(output).toEqual(result);
                }]);
            });

            it("should test multiStepHelper.uiStepEdit: form hidden", function () {
                inject(["multiStepHelper",function (multiSp) {
                    var params = {
                        show_form: false
                    };
                    var item = {
                        name: "item",
                        program: 1,
                        program_name: "program"
                    };
                    var result = {
                        show_form : true,
                        edit: true,
                        select_values:{
                            program:{
                                id: 1,
                                name: "program"
                            }
                        }
                    };
                    var output = multiSp.uiSetupEdit(item,params);
                    expect(output).toEqual(result);
                }]);
            });

            it("should test multiStepHelper.uiStepEditUser: form showing", function () {
                inject(["multiStepHelper",function (multiSp) {
                    var params = {
                        show_form: true
                    };
                    var item = {
                        name: "item",
                        user: 1,
                        first_name: "first",
                        last_name: "last"
                    };
                    var result = {
                        show_form : true,
                        edit: true,
                        select_values:{
                            user:{
                                id: 1,
                                first_name: "first",
                                last_name: "last"
                            }
                        }
                    };
                    var output = multiSp.uiSetupEditUser(item,params);
                    expect(output).toEqual(result);
                }]);
            });

            it("should test multiStepHelper.uiStepEditUser: form hidden", function () {
                inject(["multiStepHelper",function (multiSp) {
                    var params = {
                        show_form: false
                    };
                    var item = {
                        name: "item",
                        user: 1,
                        first_name: "first",
                        last_name: "last"
                    };
                    var result = {
                        show_form : true,
                        edit: true,
                        select_values:{
                            user:{
                                id: 1,
                                first_name: "first",
                                last_name: "last"
                            }
                        }
                    };
                    var output = multiSp.uiSetupEditUser(item,params);
                    expect(output).toEqual(result);
                }]);
            });
        });
    });

})();
