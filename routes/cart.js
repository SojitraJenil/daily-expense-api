var express = require('express');
var router = express.Router();
const {add_cart,delete_cart,update_cart,show_carts,get_single_cart} = require('../controller/cart_controller');

router.post('/cart_add/:id', add_cart);
router.post('/cart_delete/:id', delete_cart);
router.post('/cart_update/:id', update_cart);
router.post('/cart_show/', show_carts);
router.post('/cart_show_single/:id', get_single_cart);

module.exports = router;
