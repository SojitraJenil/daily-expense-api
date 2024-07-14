var express = require('express');
var router = express.Router();

const{add_product,Update_product,Delete_product,show_product,Get_Category,id_search_product,name_search_product,Skip_limit,all_product}=require("../controller/product_controller");

/* GET home page. */
router.post('/insert',add_product); 
router.post('/y/:id',Update_product); 
router.get('/delete/:id',Delete_product);
router.get('/all_product',show_product);
router.get('/product_id',id_search_product);
router.get('/product_name',name_search_product);
router.get('/skip_limit',Skip_limit);

router.get('/catagories',all_product);

router.get('/get_product_of_category',Get_Category);

module.exports = router;
