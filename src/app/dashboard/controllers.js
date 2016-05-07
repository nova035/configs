(function (angular) {
    "use strict";
    /**
    * @ngdoc module
    *
    * @name huqas.auth.controllers
    *
    * @description
    * Controllers for the dashboard related views
    *
    */

    angular.module("huqas.dashboard.controllers", [
        "ui.router",
        "huqas.auth.services",
        "huqas.events.services",
        "ui.calendar"
    ])
    /**
    * @ngdoc controller
    *
    * @name huqas.dashboard.controllers.home
    *
    * @description
    * Controller for dashboard view
    */
    .controller("huqas.dashboard.controllers.main", ["$scope",
        "huqas.auth.services.login", "uiCalendarConfig",
        function ($scope, loginService, uiCalendarConfig) {
            $scope.view = "dashboard";
            $scope.loggedInUser = loginService.getUser();
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var currentView = "month";
            $scope.changeView = function(view,calendar) {
                currentView = view;
                calendar.fullCalendar("changeView",view);
            };
            /* Change View */
            $scope.changeView = function(view,calendar) {
                uiCalendarConfig.calendars[calendar].fullCalendar(
                    "changeView",view);
            };
            $scope.events = {
                events : [
                    {
                        id: 999,
                        title: "AGM Meeting",
                        start: new Date(y, m, d + 8, 16, 0),
                        end: new Date(y, m, d+10, 17, 0),
                        allDay: false
                    },
                    {
                        id: 999,
                        title: "Family Day",
                        start: new Date(y, m, d + 4, 16, 0),
                        end: new Date(y, m, d+5, 17, 0),
                        allDay: false
                    },
                    {
                        title: "Birthday Party",
                        start: new Date(y, m, d + 1, 19, 0),
                        end: new Date(y, m, d + 1, 22, 30),
                        allDay: false
                    },
                    {
                        title: "Click for Google",
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        url: "http://google.com/"
                    }
                ]
            };
            $scope.uiConfig = {
                calendar:{
                    height: "100%",
                    editable: true,
                    header:{
                        left: "title",
                        center: "agendaWeek,agendaDay,month",
                        right: "today prev,next"
                    }
                }
            };
            $scope.eventSources = [$scope.events];
        }
    ]);
})(window.angular);
