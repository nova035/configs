(function () {
    "use strict";
    describe("Filters: testing huqas app common filters", function () {
        var contact_type_filter,titlecase_filter,bool_filter,date_filter,
            option_name, manufacturer_instruments;
        beforeEach(function () {
            module("huqas.common.filters");
            inject(["$filter", function ($filter) {
                contact_type_filter = $filter("contact_type");
                titlecase_filter = $filter("titlecase");
                bool_filter = $filter("boolFilter");
                date_filter = $filter("dateFilter");
                option_name = $filter("optionName");
                manufacturer_instruments = $filter("manufacturerInstruments");
            }]);
        });
        it("Should have contact_type filter defined", function(){
            expect(contact_type_filter).toBeDefined();
        });
        it("Should return contact type given a list of contact_type id",
        function () {
            var cont_types, solution, cont_type_id;
            cont_type_id = "78240cf9-7bcd-405d-a21d-ad41be2641a2";
            solution = "POSTAL";
            cont_types = [
                {
                    "id": "78240cf9-7bcd-405d-a21d-ad41be2641a2",
                    "name": "POSTAL"
                },
                {
                    "id": "d6b557dc-b073-42f2-8afa-475eaabc92b9",
                    "name": "FAX"
                }
            ];
            expect(contact_type_filter(
                cont_type_id, cont_types)).toEqual(solution);
        });
        it("dateFilter should be defined", function () {
            expect(date_filter).toBeDefined();
        });
        it("should give Expected output", function () {
            var now = new Date();
            var ans = date_filter(now, "EEE, dd MMM yyyy hh:mm a");
            // Tue, 18 Nov 2014 03:09 PM
            expect(date_filter(now.toISOString())).toBe(ans);
        });
        it( "Should test titlecase filter",function() {
            var result;
            result = titlecase_filter( "i am a test" );
            expect( result ).toEqual( "I am a Test" );

            result = titlecase_filter( "i-am-a-test" );
            expect( result ).toEqual( "I-am-a-Test" );

            result = titlecase_filter( "i am a ng'ombe" );
            expect( result ).toEqual( "I am a Ng'ombe" );

            result = titlecase_filter( "I am a Test" );
            expect( result ).toEqual( "I am a Test" );

            result = titlecase_filter( "I AM A TEST" );
            expect( result ).toEqual( "I am a Test" );

            result = titlecase_filter( "" );
            expect( result ).toEqual( "" );

            result = titlecase_filter( );
            expect( result ).toEqual( "" );

            result = titlecase_filter( 10 );
            expect( result ).toEqual( "10" );

            result = titlecase_filter( true );
            expect( result ).toEqual( "True" );

            result = titlecase_filter( false );
            expect( result ).toEqual( "False" );

            result = titlecase_filter( null );
            expect( result ).toEqual( "" );
        });
        it("should have the boolean filter return 'Yes' given 'true'", inject(function () {
            var string = true, result;
            result = bool_filter(string, "boolean");
            expect(result).toEqual("Yes");
        }));
        it("should have the boolean filter return 'No' given 'false'", inject(function () {
            var string = false, result;
            result = bool_filter(string, "boolean");
            expect(result).toEqual("No");
        }));
        it("should have the boolean filter return undefined given ''", inject(function () {
            var string = "", result;
            result = bool_filter(string, "boolean");
            expect(result).toEqual("");
        }));
        it("optionName should be defined", function () {
            expect(option_name).toBeDefined();
        });
        it("should text option name filter", function () {
            var list, input;
            list = [
                {
                    id : "5",
                    display_text : "option_example"
                },
                {
                    id : "7",
                    display_text : "hospital"
                }
            ];
            input  = "5";
            expect(option_name(input, list)).toEqual("option_example");
        });
        it("manufacturerInstruments should be defined", function () {
            expect(manufacturer_instruments).toBeDefined();
        });
        it("should text option name filter", function () {
            var instruments, manufacturer_id;
            instruments = [
                {
                    "id" : "5",
                    "name" : "Pen",
                    "manufacturer" : 1
                },
                {
                    "id" : "7",
                    "name" : "Pin",
                    "manufacturer" : 1
                }
            ];
            manufacturer_id  = 1;
            expect(manufacturer_instruments(
                manufacturer_id, instruments)).toEqual([]);
        });
    });
})();
