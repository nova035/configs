(function (angular, _) {
    "use strict";

    angular.module("huqas.common.export", [
        "api.wrapper",
        "huqas.auth.oauth2"
    ])

    .service("huqas.common.export.service",
        ["api.oauth2", "api", "$window", function (oauth2, api, $window) {
            var helpers = api.apiHelpers;
            var DEFAULT_PAGE_SIZE = 10000;

            var exportTo = function (wrapper, format, params, page_size) {
                var download_params = {
                    "format": format,
                    "access_token": oauth2.getToken().access_token,
                    "page_size": page_size || DEFAULT_PAGE_SIZE
                };
                _.extend(download_params, _.omit(params, "page"));

                var url = helpers.joinUrl([
                    wrapper.makeUrl(wrapper.apiBaseUrl),
                    helpers.makeGetParam(helpers.makeParams(download_params))
                ]);

                $window.location.href = url;
            };

            var exportToExcel = function (wrapper, params, page_size) {
                return exportTo(wrapper, "excel", params, page_size);
            };

            return {
                "excelExport": exportToExcel
            };
        }]
    )

    .controller("huqas.common.export.controller",
        ["$scope", "huqas.common.export.service", function ($scope, exportService) {
            $scope.exportToExcel = function () {
                exportService.excelExport($scope.wrapper, $scope.filters);
            };
        }]
    )

    .directive("huqasExport", [function () {
        return {
            "restrict": "EA",
            "template": "<button " +
                            "type='button' class='btn btn-primary' " +
                            "ng-click='exportToExcel()'>Export</button>",
            "controller": "huqas.common.export.controller",
            "require": "^silGrid",
            "link": function (scope, element, attrs, silGrid) {
                scope.wrapper = silGrid.api;
            }
        };
    }]);

})(window.angular, window._);
