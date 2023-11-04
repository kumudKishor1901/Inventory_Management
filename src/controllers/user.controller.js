import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export default class UserController{
    
    getRegistrationPage(req,res){
        res.render('register',{email:req.session.email});
    }
    getLoginPage(req,res){
        res.render('login',{errorMessage : null,email:req.session.email});
    }
    register(req,res){
         UserModel.add(req.body);
         res.render('login', {errorMessage : null,email:req.session.email});
    }
    postLogin(req,res){
        const {email,password} = req.body;
        const result = UserModel.checkLoginDetails(email,password);
        if(result){
            req.session.email = email;
            const products = ProductModel.get();
            res.render('products',{products:products,email:req.session.email});
        }
        else{
            res.render('login',{errorMessage:'Invalid Credentials'});
        }
       
    }

    logout(req,res){
        //destroy the session
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect('/login');
            }
        })
    }

}