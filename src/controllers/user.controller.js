import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export default class UserController{
    
    getRegistrationPage(req,res){
        res.render('register');
    }
    getLoginPage(req,res){
        res.render('login',{errorMessage : null});
    }
    register(req,res){
         UserModel.add(req.body);
         res.render('login', {errorMessage : null});
    }
    postLogin(req,res){
        const {email,password} = req.body;
        const result = UserModel.checkLoginDetails(email,password);
        if(result){
            req.session.email = email;
            const products = ProductModel.get();
            res.render('products',{products:products});
        }
        else{
            res.render('login',{errorMessage:'Invalid Credentials'});
        }
       
    }

}