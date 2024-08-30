const Router = require('express').Router;
const findLongUrl = require('../services/url-service').findLongUrl;
const route = Router();

route.get('/:code', async (req, res) => {
    const code = req.params.code;

    const url = await findLongUrl(code);

    if(url){
        return res.redirect(url.link);
    }else {
        res.redirect('https://raj-vora.github.io');
    }

})

module.exports = route;