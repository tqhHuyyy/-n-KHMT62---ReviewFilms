const _LOGIN_CON = require('./login_controller.js');
const _UTIL = require('../../utils/index');

exports.login = async (req, res) => {
    if (req.session.user) {
        return res.redirect('http://localhost:3010/dash_board?step=session')
    }
    if (req.method === 'GET') {
        let objLogin = await _LOGIN_CON.function_login(q)
        let q = req.body;
        let check = _UTIL.checkMissingKey(q, ['email', 'password'])
        console.log('check>>>>', check)
        //storage session here
        req.session.user = objLogin;
        return res.redirect('http://localhost:8080/profile?step=login_success')
    }
    return res.redirect('http://localhost:8080/login?step=error')
}

exports.profile = async (req, res) => { }