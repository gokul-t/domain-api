(function() {
    var parseDomain = require("parse-domain");
    module.exports = function(options) {
        return function(req, res, next) {
            var host = req.headers.host;
            var excludeDomain = options.excludeDomain || [];
            var url = '/' + (options.namespace || 'domain') + '/';
            if (!Array.isArray(excludeDomain)) {
                excludeDomain = [excludeDomain];
            }
            try {
                var p = parseDomain(host);
                if (!(p && p.domain)) {
                    return next();
                }
                var a = p.domain + "." + (p.tld || "");
                if (excludeDomain.indexOf(a) !== -1) {
                    return next();
                }
                req.parseDomain = p;
				url += a;
				req.url = url + req.url;
            } catch (e) {
                console.log(e);
            }
            // Q.E.D.
            next();
        };

    };
})();