const express = require('express')
const validUrl = require('valid-url');
const shortUrlLogic = require('../logic/shortUrlLogic')
const router = new express.Router()

router.get('/', async (req, res) => {
    try {
        var data = await shortUrlLogic.getAllShortUrl();
        return res.status(200).json({ data });
    }
    catch (err) {
        return res.status(500).json({error :"There is some internal error."});
    }
})

router.get('/:shortUrlCode', async (req, res) => {
    var shortUrlCode = req.params.shortUrlCode;
    try {
        var data = await shortUrlLogic.getShortUrl(shortUrlCode);
        if (data) {
            return res.redirect(data.url);
            //return res.status(200).json({ data });
        } else {
            return res.status(400).json({error :"The short url doesn't exists in our system."});
        }
    }
    catch (err) {
        return res.status(500).json({error : "There is some internal error."});
    }
})

router.post('/', async (req, res) => {
    try{
        const { shortBaseUrl, url } = req.body;

        if (validUrl.isUri(url) && validUrl.isUri(shortBaseUrl) ) {

            const urlHashCode = await shortUrlLogic.generate();

            const shortUrl = shortBaseUrl + '/' + urlHashCode;
            const data = { url, shortUrl, urlHashCode };

            await shortUrlLogic.addDetails(data);

            return res.status(200).json({ data });
            
        } else {
          return res.status(400).json('Invalid Url format');
        }
        
    } catch (e){
        res.status(500).json({ status : 500, error : e.toString()})
    }
})

router.put('/:shortUrlCode', async (req, res) => {
    try{
        const { shortUrlCode } = req.params;

        const { shortBaseUrl, url } = req.body;

        if (validUrl.isUri(url) && validUrl.isUri(shortBaseUrl) ) {

            const shortUrl = shortBaseUrl + '/' + shortUrlCode;
            const data = { url, shortUrl, shortUrlCode };
            const result = await shortUrlLogic.updateUrl(data);

            return res.status(200).json({ result });

        } else {
          return res.status(400).json('Invalid Url format');
        }
    } catch (e){
        res.status(500).json({ status : 500, error : e.toString()})
    }
})

router.delete('/:shortUrlCode', async (req, res) => {
    var shortUrlCode = req.params.shortUrlCode;
    try {
        var data = await shortUrlLogic.getShortUrl(shortUrlCode);
        if (data) {
            await shortUrlLogic.deleteDetails(shortUrlCode);
            return res.status(200).json({messgage : "Data deleted succesffully..!!!"});
        } else {
            return res.status(400).json({ error : "The short url code doesn't exists in our system." });
        }
    }
    catch (err) {
        return res.status(500).json({ error : "There is some internal error." });
    }
})

module.exports = router