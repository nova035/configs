(function (angular) {
    "use strict";

    angular.module("huqas.common.constants", [])
    .constant("api_version","v1")
    .constant("huqas.error.messages", {
        errors : "Sorry, ",
        connection : "a connection error occured",
        data : "failed to save updates",
        contacts : "failed to update contacts",
        fetch_contacts : "failed to fetch contacts"
    })
    .constant("konza.projects", {
        projects : [
            {
                id : "1",
                title : "Konza Construction Project",
                description : "This project is about the on going construction"+
                    " of Konza City. Konza City is to be the the East African"+
                    " Silicon Valley. This will provide a physical plartform"+
                    " where Inventors and Investors meet and share Ideas.",
                category : "Internal",
                start_date : "2016-01-16T11:44:32.292313Z"
            },
            {
                id : "2",
                title : "Konza Online Project",
                description : "This project is about the on going construction"+
                    " of Konza City. Konza City is to be the the East African"+
                    " Silicon Valley. This will provide a physical plartform"+
                    " where Inventors and Investors meet and share Ideas.",
                category : "Internal",
                start_date : "2016-01-16T11:44:32.292313Z"
            },
            {
                id : "3",
                title : "Crowd Fund Project",
                description : "This project is about the on going construction"+
                    " of Konza City. Konza City is to be the the East African"+
                    " Silicon Valley. This will provide a physical plartform"+
                    " where Inventors and Investors meet and share Ideas.",
                category : "External",
                start_date : "2016-01-16T11:44:32.292313Z"
            },
            {
                id : "4",
                title : "Mobile Farming Project",
                description : "This project is about the on going construction"+
                    " of Konza City. Konza City is to be the the East African"+
                    " Silicon Valley. This will provide a physical plartform"+
                    " where Inventors and Investors meet and share Ideas.",
                category : "Internal",
                start_date : "2016-01-16T11:44:32.292313Z"
            },
            {
                id : "5",
                title : "Investors Enlisting Plartform",
                description : "This project is about the on going construction"+
                    " of Konza City. Konza City is to be the the East African"+
                    " Silicon Valley. This will provide a physical plartform"+
                    " where Inventors and Investors meet and share Ideas.",
                category : "External",
                start_date : "2016-01-16T11:44:32.292313Z"
            },
            {
                id : "6",
                title : "Online Crowd Funding",
                description : "This project is about the on going construction"+
                    " of Konza City. Konza City is to be the the East African"+
                    " Silicon Valley. This will provide a physical plartform"+
                    " where Inventors and Investors meet and share Ideas.",
                category : "Internal",
                start_date : "2016-01-16T11:44:32.292313Z"
            }
        ]
    })
    .constant("konza.chat_list", {
        list : [
            {
                id : "1",
                name : "Peter Otieno",
                messages : [
                    {
                        mine : "Hello this is a message from me to my bro."+
                        " I wrote this message while I was making the Konza"+
                        "application to be utilized",
                        mine_time : "20/02/2015 at 09:00",
                        other : "Now this is yet another message from me "+
                        " bro. I write this message just wondering stuff ",
                        other_time: "20/02/2015 at 09:03"
                    },
                    {
                        mine : "Now this is yet another message from me "+
                        " bro. I write this message just wondering stuff ",
                        mine_time : "20/02/2015 at 09:00",
                        other : "Hello how have you been",
                        other_time: "20/02/2015 at 09:03"
                    },
                    {
                        other : "Hello this is a message from me to my bro."+
                        " I wrote this message while I was making the Konza"+
                        "application to be utilized",
                        other_time : "20/02/2015 at 09:00",
                        mine : "Now this is yet another message from me "+
                        " bro. I write this message just wondering stuff ",
                        mine_time: "20/02/2015 at 09:03"
                    }
                ]
            },
            {
                id : "2",
                name : "Christine Brown",
                messages : [
                    {
                        mine : "Hello",
                        mine_time : "20/02/2015 at 09:00",
                        other : "Hello how have you been",
                        other_time: "20/02/2015 at 09:03"
                    }
                ]
            },
            {
                id : "3",
                name : "Gorge Kinyanjui",
                messages : [
                    {
                        mine : "Hello",
                        mine_time : "20/02/2015 at 09:00",
                        other : "Hello how have you been",
                        other_time: "20/02/2015 at 09:03"
                    }
                ]
            },
            {
                id : "4",
                name : "Andrew Mwangi",
                messages : [
                    {
                        mine : "Hello",
                        mine_time : "20/02/2015 at 09:00",
                        other : "Hello how have you been",
                        other_time: "20/02/2015 at 09:03"
                    }
                ]
            },
            {
                id : "5",
                name : "Peter Otieno",
                messages : [
                    {
                        mine : "Hello this is a message from me to my bro."+
                        " I wrote this message while I was making the Konza"+
                        "application to be utilized",
                        mine_time : "20/02/2015 at 09:00",
                        other : "Now this is yet another message from me "+
                        " bro. I write this message just wondering stuff ",
                        other_time: "20/02/2015 at 09:03"
                    },
                    {
                        mine : "Now this is yet another message from me "+
                        " bro. I write this message just wondering stuff ",
                        mine_time : "20/02/2015 at 09:00",
                        other : "Hello how have you been",
                        other_time: "20/02/2015 at 09:03"
                    },
                    {
                        other : "Hello this is a message from me to my bro."+
                        " I wrote this message while I was making the Konza"+
                        "application to be utilized",
                        other_time : "20/02/2015 at 09:00",
                        mine : "Now this is yet another message from me "+
                        " bro. I write this message just wondering stuff ",
                        mine_time: "20/02/2015 at 09:03"
                    }
                ]
            },
            {
                id : "6",
                name : "Christine Brown",
                messages : [
                    {
                        mine : "Hello",
                        mine_time : "20/02/2015 at 09:00",
                        other : "Hello how have you been",
                        other_time: "20/02/2015 at 09:03"
                    }
                ]
            },
            {
                id : "7",
                name : "Gorge Kinyanjui",
                messages : [
                    {
                        mine : "Hello",
                        mine_time : "20/02/2015 at 09:00",
                        other : "Hello how have you been",
                        other_time: "20/02/2015 at 09:03"
                    }
                ]
            },
            {
                id : "8",
                name : "Andrew Mwangi",
                messages : [
                    {
                        mine : "Hello",
                        mine_time : "20/02/2015 at 09:00",
                        other : "Hello how have you been",
                        other_time: "20/02/2015 at 09:03"
                    }
                ]
            }
        ]
    })
    .constant("konza.showcases", {
        showcases : [
            {
                id : 1,
                user : 1,
                owner_name : "Antony Owaga",
                listing_date : "2016-01-16T11:44:32.292313Z",
                total_debt : 55000,
                contribution : 15000,
                repayment_term : 18,
                repayment_schedule : "End of Term",
                company_name : "Yitchouse",
                town : "Mombasa",
                industry : "IT",
                contacts : [
                    {
                        type : "phone",
                        contact : "0719333989"
                    },
                    {
                        type : "email",
                        contact : "yitchouse@inc.io"
                    },
                    {
                        type : "address",
                        contact : "Box 80100-83931, Mombasa, White House, Moi Avenue"
                    }
                ],
                idea : "This is an agriculture based company specialized"+
                    "with green houses for growing commercial plantations "+
                    "with green houses for growing commercial plantations "+
                    "with green houses for growing commercial plantations "+
                    "and rearing of fish",
                debt_reason : "The loan will be used to build a new green house"+
                    " in Kericho which has a more condusive climate for the"+
                    " growth of strawberries. The business after doing its"+
                    " financial assessments concluded that starting to grow"+
                    " strawberries not only increases profit margin but also"+
                    " increases overall business financial position",
                overview : "This is an IT company specialized with "+
                "developing software inline with financial industry. From"+
                "ERPs to Accounting specific software"
            },
            {
                id : 2,
                user : 2,
                owner_name : "Andrew Mwangi",
                listing_date : "2016-01-16T11:44:32.292313Z",
                total_debt : 35000,
                contribution : 25000,
                repayment_term : 18,
                repayment_schedule : "End of Term",
                company_name : "Owaga",
                town : "Nairobi",
                industry : "IT",
                contacts : [
                    {
                        type : "phone",
                        contact : "0719333989"
                    },
                    {
                        type : "email",
                        contact : "yitchouse@inc.io"
                    },
                    {
                        type : "address",
                        contact : "Box 80100-83931, Mombasa, White House, Moi Avenue"
                    }
                ],
                idea : "This is an agriculture based company specialized"+
                    "with green houses for growing commercial plantations "+
                    "with green houses for growing commercial plantations "+
                    "with green houses for growing commercial plantations "+
                    "and rearing of fish",
                debt_reason : "The loan will be used to build a new green house"+
                    " in Kericho which has a more condusive climate for the"+
                    " growth of strawberries. The business after doing its"+
                    " financial assessments concluded that starting to grow"+
                    " strawberries not only increases profit margin but also"+
                    " increases overall business financial position",
                overview : "This is an IT company specialized with "+
                "developing software inline with financial industry. From "+
                "ERPs to Accounting specific software"
            },
            {
                id : 3,
                user : 3,
                owner_name : "Peter Owaga",
                listing_date : "2016-01-16T11:44:32.292313Z",
                total_debt : 35000,
                contribution : 20000,
                repayment_term : 18,
                repayment_schedule : "End of Term",
                company_name : "TMNT Limited",
                town : "Nairobi",
                industry : "Agricultural",
                contacts : [
                    {
                        type : "phone",
                        contact : "0719333989"
                    },
                    {
                        type : "email",
                        contact : "yitchouse@inc.io"
                    },
                    {
                        type : "address",
                        contact : "Box 80100-83931, Mombasa, White House, Moi Avenue"
                    }
                ],
                idea : "This is an agriculture based company specialized"+
                    "with green houses for growing commercial plantations "+
                    "with green houses for growing commercial plantations "+
                    "with green houses for growing commercial plantations "+
                    "and rearing of fish",
                debt_reason : "The loan will be used to build a new green house"+
                    " in Kericho which has a more condusive climate for the"+
                    " growth of strawberries. The business after doing its"+
                    " financial assessments concluded that starting to grow"+
                    " strawberries not only increases profit margin but also"+
                    " increases overall business financial position",
                overview : "This is an agriculture based company specialized"+
                    "with green houses for growing commercial plantations."+
                    "and rearing of fish"
            }
        ]
    });
})(window.angular);
