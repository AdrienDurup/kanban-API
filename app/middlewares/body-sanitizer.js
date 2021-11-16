const sanitizer = require("sanitizer");
const bodySanitizer = (req, res, next)=>{
    if (req.body) {
        for (key in req.body) {
            req.body[key] = sanitizer.escape(req.body[key]);
        };
    };
    next();
}

module.exports = bodySanitizer;