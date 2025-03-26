const express=require('express');
const routes= express.Router();
const { 
    HandleGenerateShortURL,
    HandleGetLongURL,
    HandleGetAnalytics
}= require('../Controllers/url');

routes.post('/',HandleGenerateShortURL);

routes.get('/:id',HandleGetLongURL);

routes.get('/analytics/:id',HandleGetAnalytics);


module.exports=routes;

