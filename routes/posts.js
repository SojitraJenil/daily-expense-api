var express = require('express');
var router = express.Router();

const{add_post,All_data_show,update_data,delete_data,id_search_product,Name_search_data,skip_limit}=require("../controller/post_controller");

router.post('/insert',add_post); 
router.get('/get',All_data_show); 
router.post('/update',update_data); 
router.get('/delete',delete_data); 
router.get('/id_search',id_search_product);
router.get('/name_search',Name_search_data); 
router.get('/skip_limit',skip_limit);



module.exports = router;
