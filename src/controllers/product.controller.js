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
        
        const {name,description, price} = req.body;
        const imageUrl = 'images/'+req.file.filename;
        // ProductModel.add(req.body);
        ProductModel.add(name,description,price,imageUrl);
        let products = ProductModel.get();
        return res.render('products',{products});
        

    }

    deleteProduct(req,res){
        let id = req.params.id;
        let productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send('Product not found');
       }else{
            ProductModel.deleteById(id);
            let products = ProductModel.get();
            return res.render('products',{products});
        }
       
       
    }


        
    
}