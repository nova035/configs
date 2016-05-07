(function (angular) {
    "use strict";
    /**
    * @ngdoc module
    *
    * @name huqas.users.states
    *
    * @description
    * States for the users views
    *
    */
    angular.module("huqas.users.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

        .state("users", {
            url : "/users",
            views : {
                "main" : {
                    controller : "huqas.users.controllers.users",
                    templateUrl : "common/tpls/main.tpl.html"
                },
                "header@users": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                },
                "body@users": {
                    controller: "huqas.common.controllers.header",
                    templateUrl: "users/tpls/users-grid.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Users"
            }
        })
        .state("users.create", {
            url : "/add",
            views : {
                "body@users": {
                    controller : "huqas.users.controllers.edit",
                    templateUrl: "users/tpls/user-edit.tpl.html"
                },
                "footer@users.create" : {
                    templateUrl : "common/tpls/footer.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Add User"
            },
            requireUser: false
        })
        .state("users.edit", {
            url : "/edit/{user_id:int}",
            views : {
                "body@users": {
                    controller : "huqas.users.controllers.edit",
                    templateUrl: "users/tpls/user-edit.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Edit User"
            }
        });
    }]);
})(window.angular);
