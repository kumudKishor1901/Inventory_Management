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

    addProduct(req,res){
        console.log(req.body);

        // server side form validation 

        const {name,price,imageUrl} = req.body;
        let errors = [];
        // validating name
        if(!name || name.trim()==''){
            errors.push('Name is invalid');
        }

        // validating price 
        if(!price || parseFloat(price)< 0){
            errors.push('Price is invalid');
        }
        // validating url
        try{
            const validUrl = new URL(imageUrl);
        }catch(err){
            errors.push('URL is invalid');
        }

        if(errors.length > 0){
            return res.render('new-product',{errorMessage : errors[0]});
        }
         

        ProductModel.add(req.body);
        let products = ProductModel.get();
        return res.render('products',{products});
        

    }
}