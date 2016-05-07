(function (angular,_) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name huqas.labs.controllers.labs
     *
     * @description
     * Controllers for the labs related views
     *
     */
    angular.module("huqas.labs.controllers.labs", [
        "ui.router",
        "ngAnimate",
        "ng-fx",
        "mgo-angular-wizard",
        "huqas.labs.services",
        "huqas.common.forms",
        "huqas.common.directives"
    ])

    /**
     * @ngdoc controller
     *
     * @name huqas.labs.controllers.edit
     *
     * @description
     * Main controller for editing and adding labs
     * flow)
     */
    .controller("huqas.labs.controllers.edit",
        ["$scope", "labsApi","multiStepHelper","$stateParams","WizardHandler",
         "huqas.common.forms.changes",
        function ($scope, labsApi, multiStep, $stateParams, WizardHandler,forms) {

            $scope.lab_program = {};
            $scope.multi = {
                edit : false
            };

            if(!_.isUndefined($stateParams.lab_id)){
                $scope.edit_lab = true;
                //xhr function that loads lab
                labsApi.labs.get($stateParams.lab_id)
                .success(function(data){
                    $scope.lab = data;
                })
                .error(function(e){
                    $scope.errors = e;
                });
            } else{
                $scope.edit_lab = false;
                $scope.lab = {
                    active: true
                };
            }

            //xhr function that loads all labs
            labsApi.labs.list()
            .success(function(data){
                $scope.labs = data.results;
            })
            .error(function(e){
                $scope.errors = e;
            });

            //xhr function that save lab details
            $scope.saveDetails = function(frm,edit){
                var changes = forms.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    if(edit === true) {
                        labsApi.labs.update($stateParams.lab_id, changes)
                        .success(function (data) {
                            $scope.lab = data;
                            WizardHandler.wizard().next();
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    } else {
                        labsApi.labs.create(changes)
                        .success(function (data) {
                            $scope.lab = data;
                            WizardHandler.wizard().next();
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    }
                } else{
                    WizardHandler.wizard().next();
                }
            };
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name huqas.labs.controllers.edit_lab_programs
     *
     * @description
     * Controller for editing lab programs
     * flow)
     */
    .controller("huqas.labs.controllers.lab_programs",
        ["$scope", "labsApi","multiStepHelper","$stateParams","WizardHandler",
         "huqas.common.forms.changes",
        function ($scope, labsApi, multiStep, $stateParams, WizardHandler,forms) {
            $scope.lab_id = "";
            //xhr function that loads programs
            labsApi.programs.list()
            .success(function(data){
                $scope.programs = data.results;
            })
            .error(function(e){
                $scope.errors = e;
            });

            //xhr function that loads lab_programs
            labsApi.lab_programs.filter({lab:$stateParams.lab_id})
            .success(function(data){
                $scope.lab_programs = data.results;
                $scope.multi = multiStep.validationOnLoad(data.results.length);
                $scope.lab_program = {
                    active: true
                };
            })
            .error(function(e){
                $scope.errors = e;
            });

            // function that saves new/edited lab program
            $scope.saveLabProg = function(frm,edit){
                var changes = forms.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    if(edit === false){
                        labsApi.lab_programs.create(_.extend(changes,{lab: frm.lab.$modelValue}))
                        .success(function () {
                            frm.$setPristine();
                            labsApi.lab_programs.filter({lab: frm.lab.$modelValue})
                            .success(function(data){
                                //service
                                $scope.lab_programs = data.results;
                                $scope.multi = multiStep.validationAfterSave();
                            })
                            .error(function(e){
                                $scope.errors = e;
                            });
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    } else {
                        labsApi.lab_programs.update(frm.id.$modelValue,changes)
                        .success(function () {
                            frm.$setPristine();
                            labsApi.lab_programs.filter({lab:$stateParams.lab_id})
                            .success(function(data){
                                $scope.lab_programs = data.results;
                                //service
                                $scope.multi = multiStep.validationAfterSave();
                            })
                            .error(function(e){
                                $scope.errors = e;
                            });
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    }
                }
            };

            //Setup ui for editing a program
            $scope.editProg = function (frm,prog,params) {
                frm.$setPristine();
                $scope.multi = multiStep.uiSetupEdit(prog,params);
                $scope.lab_program = prog;
                $scope.errors = null;
            };

            //Setup ui for new program
            $scope.newProg = function (frm,prog) {
                frm.$setPristine();
                $scope.multi = multiStep.uiSetupCreate(prog);
                $scope.errors = null;
                $scope.lab_program = {
                    active: true
                };
            };

        }]
    )

    /**
     * @ngdoc controller
     *
     * @name huqas.labs.controllers.edit_lab_users
     *
     * @description
     * Controller for editing lab users
     * flow)
     */
    .controller("huqas.labs.controllers.lab_users",
        ["$scope", "labsApi","multiStepHelper","$stateParams","WizardHandler",
         "huqas.common.forms.changes",
        function ($scope, labsApi, multiStep, $stateParams, WizardHandler,forms) {

            //xhr function that loads users
            labsApi.users.list()
            .success(function(data){
                $scope.users = data.results;
            })
            .error(function(e){
                $scope.errors = e;
            });

            //xhr function that loads lab_users
            labsApi.lab_users.filter({lab:$stateParams.lab_id})
            .success(function(data){
                $scope.lab_users = data.results;
                $scope.multi = multiStep.validationOnLoad(data.results.length);
                $scope.lab_user = {
                    active: true
                };
            })
            .error(function(e){
                $scope.errors = e;
            });

            // function that saves new/edited lab user
            $scope.saveLabUser = function(frm,edit){
                var changes = forms.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    if(edit === false){
                        labsApi.lab_users.create(_.extend(changes,{lab: frm.lab.$modelValue}))
                        .success(function () {
                            frm.$setPristine();
                            labsApi.lab_users.filter({lab: frm.lab.$modelValue})
                            .success(function(data){
                                //service
                                $scope.lab_users = data.results;
                                $scope.multi = multiStep.validationAfterSave();
                            })
                            .error(function(e){
                                $scope.errors = e;
                            });
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    } else {
                        labsApi.lab_users.update(frm.id.$modelValue,changes)
                        .success(function () {
                            frm.$setPristine();
                            labsApi.lab_users.filter({lab:$stateParams.lab_id})
                            .success(function(data){
                                $scope.lab_users = data.results;
                                //service
                                $scope.multi = multiStep.validationAfterSave();
                            })
                            .error(function(e){
                                $scope.errors = e;
                            });
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    }
                }
            };

            //Setup ui for editing a user
            $scope.editUser = function (frm,user,params) {
                frm.$setPristine();
                $scope.multi = multiStep.uiSetupEditUser(user,params);
                $scope.lab_user = user;
                $scope.errors = null;
            };

            //Setup ui for new user
            $scope.newUser = function (frm,user) {
                frm.$setPristine();
                $scope.multi = multiStep.uiSetupCreate(user);
                $scope.errors = null;
                $scope.lab_user = {
                    active: true
                };
            };

        }]
    )    /**
     * @ngdoc controller
     *
     * @name huqas.labs.controllers.edit_lab_contacts
     *
     * @description
     * Controller for editing lab contacts
     * flow)
     */
    .controller("huqas.labs.controllers.lab_contacts",
        ["$scope", "labsApi","multiStepHelper","$stateParams","WizardHandler",
         "huqas.common.forms.changes","countries","$state",
        function ($scope, labsApi, multiStep, $stateParams, WizardHandler,forms,countries,
                  $state) {
            $scope.multi = {};
            $scope.edit_contacts = false;
            //xhr function that loads lab_contacts
            if(!_.isUndefined($stateParams.lab_id)){
                labsApi.lab_contacts.filter({lab:$stateParams.lab_id})
                .success(function(data){
                    $scope.lab_contact = data.results[0];
                    if(data.results.length>0){
                        $scope.multi.select_values = {
                            country: $scope.lab_contact.country
                        };
                        $scope.edit_contacts = true;
                    } else {
                        $scope.edit_contacts = false;
                    }
                })
                .error(function(e){
                    $scope.errors = e;
                });
            }
            else {
                $scope.lab_contact = {
                    active: true
                };
            }
            $scope.countries = countries.getCountries();
            // function that saves new/edited lab contact
            $scope.saveLabContact = function(frm,edit){
                var changes = forms.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    if(edit === false){
                        labsApi.lab_contacts.create(_.extend(changes,{lab: frm.lab.$modelValue}))
                        .success(function (data) {
                            $scope.lab_contacts = data;
                            $scope.multi = multiStep.validationAfterSave();
                            WizardHandler.wizard().finish();
                            $state.go("labs");
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    } else {
                        labsApi.lab_contacts.update(frm.id.$modelValue,changes)
                        .success(function (data) {
                            $scope.lab_contacts = data;
                            //service
                            $scope.multi = multiStep.validationAfterSave();
                            WizardHandler.wizard().finish();
                            $state.go("labs");
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                    }
                } else{
                    WizardHandler.wizard().finish();
                    $state.go("labs");
                }
            };

        }]
    );
})(window.angular,window._);
