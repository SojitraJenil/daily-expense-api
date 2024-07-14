var express = require('express');
var router = express.Router();
const{Insert_user,Show_all_data,update_user,Delete_users,single_user_find_id,single_user_find_name,skip_limit,filter_users} = require('../controller/users_controller');


router.post('/data_insert' , Insert_user)
router.get('/' , Show_all_data)  
router.post('/update/:id' , update_user) //Params
router.get('/delete/:id' , Delete_users)  //Params
router.get('/data_find', single_user_find_id)   //Query
router.get('/data_find_id/:id', single_user_find_id)  // Params
router.get('/data_find_name', single_user_find_name)  // Query
router.get('/skip_limit', skip_limit)  // Query
router.get('/filter', filter_users)  // Query


module.exports = router;
