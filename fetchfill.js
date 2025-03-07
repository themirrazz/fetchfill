if(!window.fetch) {
    window.fetch = function (url, options) {
        options = options || {};
        var xhr = new XMLHttpRequest();
        var headers = Object.keys ? Object.keys(options.headers||{}) : [
            'User-Agent',
            'Accept',
            'Accept-Language',
            'Accept-Encoding',
            'Accept-CH',
            'Accept-Post',
            'Referer',
            'Cache-Control',
            'Allow',
            'Authorization',
            'Date'
        ];
        if(options.method === 'POST' || options.method === 'post') {
            xhr.open('POST', url);
        } else {
            xhr.open('GET', url);
        };
        if(options.headers) {
            for(var h = 0; h < headers.length; h++) {
                if(options.headers[headers[h]]) {
                    xhr.setRequestHeader(headers[h], options.headers[headers[h]]);
                } else if(options.headers[headers[h].toLowerCase()]) {
                    xhr.setRequestHeader(headers[h], options.headers[headers[h].toLowerCase()]);
                } else if(options.headers[headers[h].toUpperCase()]) {
                    xhr.setRequestHeader(headers[h], options.headers[headers[h].toUpperCase()]);
                }
            }
        }
        var rejGb;
        var promise = new Promise(function (res, rej) {
            rejGb = rej;
            xhr.onerror = function (error) {
                rej(error);
            };
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4) {
                    res({
                        status: 200,
                        text: function () {
                            return new Promise(function (k) {
                                k(xhr.responseText);
                            });
                        }
                    });
                }
            }
        });
        setTimeout(function () {
            try {
                if(options.body) {
                    xhr.send(body);
                } else {
                    xhr.send();
                }
            } catch (error) {
                rejGb(error);
            }
        },1000);
        return promise;
    }
}
