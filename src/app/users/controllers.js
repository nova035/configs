(function (angular,_) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name huqas.users.controllers
     *
     * @description
     * Controllers for the users related views
     *
     */
    angular.module("huqas.users.controllers", [
        "ui.router"
    ])

    /**
     * @ngdoc controller
     *
     * @name huqas.users.controllers.users
     *
     * @description
     * Controller for listing the users
     * flow)
     */
    .controller("huqas.users.controllers.users",
        ["$scope",
        function ($scope) {
            $scope.users = "users";
        }]
    )
    .controller("huqas.users.controllers.edit", ["$scope",
        "labsApi", "huqas.common.forms.changes", "$state",
        "$stateParams","$window",
        function ($scope, wrappers, forms, $state, $stateParams,$window) {
            $scope.loggedin_user =JSON.parse($window.localStorage.getItem("auth.user"));
            $scope.user_id = $stateParams.user_id;
            $scope.edit_view = $scope.user_id ? true : false;
            if($scope.edit_view) {
                wrappers.users.get($scope.user_id)
                .success(function (data) {
                    $scope.user = data;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            }
            $scope.filters = {user : $scope.user_id};
            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);
                if (! _.isEmpty(changed)) {
                    if($scope.edit_view){
                        wrappers.users.update($scope.user_id, changed)
                        .success(function () {
                            $state.go("login");
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    }else{
                        wrappers.users.create(changed)
                        .success(function (){
                            $state.go("login");
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    }
                }
            };
        }
    ]);
})(window.angular,window._);
