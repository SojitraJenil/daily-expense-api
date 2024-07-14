var express = require('express');
var router = express.Router();
const{Insert_catagory,show_catagory,Update_catagory,Delete_catagory} = require('../controller/catagory_controller')


router.post('/insert_catagory',Insert_catagory);
router.get('/get_catagory',show_catagory);
router.post('/update_catagory/:id',Update_catagory);
router.get('/delete_catagory/:id',Delete_catagory);

module.exports = router;
