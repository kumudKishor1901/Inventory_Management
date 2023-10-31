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
        return res.render('new-product',{errorMessage:null});
    };

    getUpdateForm(req,res){
        const id = req.params.id;
        let productFound = ProductModel.getById(id);
        // console.log(id,productFound);

        if(productFound){
             res.render('update-product',{product : productFound, errorMessage: null});
        }else{
            res.status(401).send('Product not found');
        }
       
    }

   postUpdateProduct(req,res){
        // console.log(req.body);
        ProductModel.update(req.body);
        let products = ProductModel.get();
         res.render('products',{products});

    }

    addProduct(req,res){
        // console.log(req.body);
        ProductModel.add(req.body);
        let products = ProductModel.get();
        return res.render('products',{products});
        

    }
}