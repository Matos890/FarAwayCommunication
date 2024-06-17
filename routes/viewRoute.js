const express = require('express');
const viewsController = require('./../controllers/viewController');

const router = express.Router();
router.get('/', viewsController.viewHome)
module.exports=router;
