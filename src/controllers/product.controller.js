import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController{
    getProducts(req,res){
        let products = ProductModel.get();
        // console.log(products);
        return res.render("products",{products:products});
        //return res.sendFile(path.join(path.resolve(),'src','views','products.ejs'));
    }

    addNewForm(req,res){
        return res.render('new-product');
    };

    addProduct(req,res){
        console.log(req.body);
        ProductModel.add(req.body);
        let products = ProductModel.get();
        return res.render('products',{products});
        

    }
}