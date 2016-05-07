(function (window) {
    "use strict";

    var settings = {
        "SERVER_URL": "http://localhost:8001/",
        "CREDENTIALS": {
            "username": "owaga@owaga.com",
            "password": "password1",
            "client_id": "7mfI9iDWXf8VZxn3wqiecmkppFrYhZh26A1YCDlf",
            "client_secret": "ljD9BYxsR8EYxSm3HtHhF0MeqMu5q62AC64vAjwXQ1X"+
                "nWpRbaqMm2ipSsmc7eWZkYqeIDkiQpBUYvlKeM2cQEtZozLOUbCHweyEt"+
                "J8cJv2fKNOrpMG8cFsnUFov8lRYN",
            "token_url": "o/token/",
            "revoke_url": "o/revoke_token/"
        },
        "TIMEOUT": {"kickout": 640, "warning": 60}
    };

    settings.CREDENTIALS.token_url = settings.SERVER_URL +
        settings.CREDENTIALS.token_url;
    settings.CREDENTIALS.revoke_url = settings.SERVER_URL +
        settings.CREDENTIALS.revoke_url;

    window.HUQAS_SETTINGS = settings;

})(window);
