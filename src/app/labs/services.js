(function(angular){
    "use strict";
    /**
     * @ngdoc module
     *
     * @name huqas.labs.services
     *
     * @description
     * Contains the wrapper service used for labs api
     */
    angular.module("huqas.labs.services", [
        "api.wrapper",
        "huqas.common.constants"
    ])

    /**
     * @ngdoc service
     *
     * @name labsApi
     *
     * @description
     * The service used to for all lab endpoints
     */
    .service("labsApi", ["api","api_version",
        function(api, api_v) {
            return {
                labs: api.setBaseUrl("api/" + api_v + "/labs/"),
                programs: api.setBaseUrl("api/" + api_v + "/catalog/programs/"),
                users: api.setBaseUrl("api/" + api_v + "/users/"),
                contacts: api.setBaseUrl("api/" + api_v + "/catalog/programs/"),
                lab_programs: api.setBaseUrl("api/" + api_v + "/labs/lab_programs/"),
                lab_instruments: api.setBaseUrl("api/" + api_v + "/labs/lab_instruments/"),
                subscriptions: api.setBaseUrl("api/" + api_v + "/labs/subscriptions/"),
                lab_enrollments: api.setBaseUrl("api/" + api_v + "/labs/lab_enrollments/"),
                lab_sample_conditions: api.setBaseUrl("api/" + api_v +
                                                      "/labs/lab_sample_conditions/"),
                lab_users: api.setBaseUrl("api/" + api_v + "/labs/lab_users/"),
                lab_contacts: api.setBaseUrl("api/" + api_v + "/labs/lab_contacts/")
            };
        }
    ])
    .service("countries", function() {
        this.getCountries = function () {
            return [
                {"name": "Algeria", "code": "DZ"},
                {"name": "Angola", "code": "AO"},
                {"name": "Benin", "code": "BJ"},
                {"name": "Botswana", "code": "BW"},
                {"name": "Burkina Faso", "code": "BF"},
                {"name": "Burundi", "code": "BI"},
                {"name": "Cape Verde", "code": "CV"},
                {"name": "Central African Republic", "code": "CF"},
                {"name": "Chad", "code": "TD"},
                {"name": "Comoros", "code": "CM"},
                {"name": "Congo", "code": "CG"},
                {"name": "Congo, The Democratic Republic of the", "code": "CD"},
                {"name": "Cote d Ivoire", "code": "CI"},
                {"name": "Djibouti", "code": "DJ"},
                {"name": "Egypt", "code": "EG"},
                {"name": "Equatorial Guinea", "code": "GQ"},
                {"name": "Eritrea", "code": "ER"},
                {"name": "Ethiopia", "code": "ET"},
                {"name": "Gabon", "code": "GH"},
                {"name": "Ghana", "code": "GH"},
                {"name": "Guinea", "code": "GN"},
                {"name": "Guinea-Bissau", "code": "GW"},
                {"name": "Kenya", "code": "KE"},
                {"name": "Lesotho", "code": "LS"},
                {"name": "Liberia", "code": "LR"},
                {"name": "Libyan Arab Jamahiriya", "code": "LY"},
                {"name": "Madagascar", "code": "MG"},
                {"name": "Malawi", "code": "MW"},
                {"name": "Malaysia", "code": "MY"},
                {"name": "Mali", "code": "ML"},
                {"name": "Mauritania", "code": "MR"},
                {"name": "Mauritius", "code": "MU"},
                {"name": "Morocco", "code": "MA"},
                {"name": "Namibia", "code": "NA"},
                {"name": "Niger", "code": "NE"},
                {"name": "Nigeria", "code": "NG"},
                {"name": "RWANDA", "code": "RW"},
                {"name": "Sao Tome and Principe", "code": "ST"},
                {"name": "Senegal", "code": "SN"},
                {"name": "Seychelles", "code": "SC"},
                {"name": "Sierra Leone", "code": "SL"},
                {"name": "Somalia", "code": "SO"},
                {"name": "South Africa", "code": "ZA"},
                {"name": "Sudan", "code": "SD"},
                {"name": "Swaziland", "code": "SZ"},
                {"name": "Tanzania, United Republic of", "code": "TZ"},
                {"name": "Togo", "code": "TG"},
                {"name": "Trinidad and Tobago", "code": "TT"},
                {"name": "Tunisia", "code": "TN"},
                {"name": "Uganda", "code": "UG"},
                {"name": "Western Sahara", "code": "EH"},
                {"name": "Zambia", "code": "ZM"},
                {"name": "Zimbabwe", "code": "ZW"}
            ];
        };
    })
    .service("multiStepHelper",[function () {
        this.validationOnLoad = function (list_length) {
            var params = {};
            if(list_length > 0){
                params.show_form  = false;
                params.exitValidation = true;
            } else {
                params.show_form  = true;
                params.edit = false;
                params.exitValidation = false;
            }
            return params;
        };
        this.validationAfterSave = function () {
            var params = {};
            params.select_values  = {};
            params.show_form = false;
            params.exitValidation = true;
            return params;
        };
        this.uiSetupCreate = function (params) {
            params.edit = false;
            params.select_values = {};
            params.show_form = !params.show_form;
            return params;
        };

        this.uiSetupEdit = function (item,params) {
            params.edit = true;
            if(params.show_form !== true){
                params.show_form = !params.show_form;
            }
            params.select_values  = {
                program: {
                        "id": item.program,
                        "name": item.program_name
                    }
                };
            return params;
        };

        this.uiSetupEditUser = function (item,params) {
            params.edit = true;
            if(params.show_form !== true){
                params.show_form = !params.show_form;
            }
            params.select_values  = {
                user: {
                        "id": item.user,
                        "first_name": item.first_name,
                        "last_name": item.last_name
                    }
                };
            return params;
        };
    }]);

})(window.angular);
