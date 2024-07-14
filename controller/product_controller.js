var product = require("../model/product_model");


// 1.Data Add & Insert API
exports.add_product =  async(req,res)=>{
    var insert_data = await product.create(req.body)
    res.status(200).json({
        status:"product added successfully....",
        insert_data
    })
}

// 2.Data Update API
exports.Update_product = async(req,res)=>{
    var id = req.params.id;
    var update_data = await product.findByIdAndUpdate(id,req.body)

    res.status(200).json({
        status:"data updated successfully....",
        update_data
    })
}

// 3.Data Delete API
exports.Delete_product  = async(req,res)=>{
    var id = req.params.id;
    var delete_data = await product.findByIdAndDelete(id)

    res.status(200).json({
        status:"data deleted successfully...",
        delete_data
    })
}

// 4.All productprint API
exports.show_product = async(req,res)=>{

    var data = await product.find(req.body)
    var total_data = await product.find().count()
    res.status(200).json({
        status:"all Product Is Here",
        data,
        total_data
    })
}

// 5.Single product API (ID) thi data find 
exports.id_search_product = async(req,res)=>{
    try {

        // var id = req.params.id;  //if params hoi to index vali file ma :id lakhvu pde

        var id = req.query.id;
        data = await product.findById(id)
        res.status(200).json({
            status:"Product Is Here by Id",
            data
        })

    } catch (error) {
        res.status(200).json({
        error
        })
    }

}

// 6.Search products (NAME) thi find  

exports.name_search_product = async(req,res)=>{

        var title= req.query.title;
        data = await product.find({title})
    
        res.status(200).json({
            status:"Product Is Here by Name",
            data
        })
}

// 7.skip & Limit   
exports.Skip_limit = async (req,res)=>{

        var limit=3;    
        var total_record = await product.find().count();
        var total_page = Math.ceil(total_record / limit)

        var page_no  =  req.query.page_no;
        if(page_no==undefined){
            page_no=1;
        }
        var skip = (page_no-1)*limit;

        var data = await product.find(res.body).limit(limit).skip(skip);
        res.status(200).json({
            status:"skip limit API",
            data,
            limit,
            total_record,
            total_page,
            page_no     
        })
        res.status(200).json({
            status:"errorrrrr",
            error
    })
}


// 8. Get all products categories                               //hold
exports.all_product = async (req,res)=>{                        //hold
                                                                //hold
        res.status(200).json({                                  //hold
            status:"all product catagory successfull",
            data
        })  
}

// 9.Get products of category
exports.Get_Category = async (req,res) => {

    var category = req.query.category;
    var data = await product.find({category});

    res.status(200).json({
        status:"Select Catagory Successfully",
        data
    });
}