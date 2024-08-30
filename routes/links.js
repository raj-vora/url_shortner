const { Router } = require('express');
const {
    createCustomShortCode,
    createRandomShortCode,
    findLongUrl
} = require('../services/url-service');

const route = Router();

route.post('/', async (req, res) => {
    const link = req.body.link;
    const code = req.body.code;

    if(!code) {
        const url = await createRandomShortCode(link);
        res.redirect(`/response?link=${encodeURIComponent(url.link)}&code=${url.code}`);
    }

    try {
        const url = await createCustomShortCode(code, link);
        res.redirect(`/response?link=${encodeURIComponent(url.link)}&code=${url.code}`);
    } catch (e) {
        return res.status(400).json({error: e.message});
    }
})

route.get('/:code', async (req, res) => {
    const code = req.params.code;

    const url = await findLongUrl(code);

    if(url){
        return res.json(url);
    }else {
        res.status(404).json({error: 'No such shortcode created'});
    }

})

module.exports = route;