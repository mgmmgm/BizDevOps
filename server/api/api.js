/**
 * Created by golanm on 20/11/2017.
 */

const express = require('express');
const router = express.Router();
const octane = require('./rest/octane_bl');


router.get('/octane', octane.doSomething);


module.exports = router;