(function (angular) {
    "use strict";

    /*
     * @ngdoc module
     *
     * @name huqas.events.services
     *
     * @description
     * Module containing services used in test events app
     */
    angular.module("huqas.events.services", [
        "api.wrapper"
    ])

    /*
     * @ngdoc service
     *
     * @name huqas.events.wrappers
     *
     * @description
     * Module containing api wrappers used in test event app
     */
    .service("huqas.events.wrappers", ["api", function (api) {

        this.organizations = api.setBaseUrl("api/v1/organizations/");
        this.industries = api.setBaseUrl("api/v1/common/industries/");
        this.location = api.setBaseUrl("api/v1/common/location/");
    }]);
})(window.angular);
