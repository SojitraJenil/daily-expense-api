const cart = require('../model/cart_model');
const productmodel = require('../model/product_model');

exports.add_cart = async (req, res) => {
    var id = req.params.id;
    var data1 = await productmodel.findById(id);
    var obj =
    {                   
        "title": data1.title,
        "description": data1.description,
        "price": data1.price,
        "discountPercentage": data1.discountPercentage,
        "rating": data1.rating,
        "stock": data1.stock,
        "brand": data1.brand,
        "category": data1.category,
        "thumbnail": data1.thumbnail,
        "images": data1.images,
        "quantity": 1
    }

    var data = await cart.find({ "title": data1.title })

    if (data.length == 0) {
        var data = await cart.create(obj);
    }
    else {
        var qty = parseInt(data[0].quantity);

        var obj = {
            "quantity": qty + 1
        }

        var id = data[0].id;

        var data = await cart.findByIdAndUpdate(id, obj);
    }
    res.status(200).json({
        status: "Product Added Successfully",
         data1
    })

}



exports.delete_cart = async (req, res) => {

    var id = req.params.id;

    await cart.findByIdAndDelete(id);

    res.status(200).json({
        status: "cart product delete succesfully"
    })
}






exports.update_cart = async (req, res) => {

    var id = req.params.id;

    var updt = await cart.findByIdAndUpdate(id, req.body)

    res.status(200).json({
        status: "cart Update Successfully",
        updt

    })
}



exports.show_carts = async (req, res) => {

    var data = await cart.find();
    res.status(200).json({
        status: "cart Show Successfully",
        data
    })

}


exports.get_single_cart = async (req, res) => {

    var id = req.params.id;

    var data = await cart.findById(id)

    res.status(200).json({
        status: "single cart show successfully",
        data
    })

}