const User = require("../../models/LoginModel"),
    md5 = require('md5');

var self = module.exports = {
    function_login: async (req, res) => {
        const _obj = req.body
        if (_obj) {
            const result = await User.findOne(_obj)
            if (result) {
                res.status(200).send(result);
            }else {
                res.status(403).send(result)
            }
        }else {
            res.status(403).send({content: 'invalid'});
        }
    },
}
