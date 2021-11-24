const sanitizer = require("sanitizer");
const bodySanitizer = (req, res, next)=>{
    // console.log("sanitizing");
    if (req.body) {
        for (const key in req.body) {
            // console.log(req.body[key]);
            req.body[key] = sanitizer.escape(req.body[key]);
            // console.log(req.body[key]);
        };
    };
    next();
}

module.exports = bodySanitizer;