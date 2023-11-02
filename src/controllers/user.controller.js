import UserModel from "../models/user.model.js";

export default class UserController{
    
    getRegistrationForm(req,res){
        res.render('register');
    }
    register(req,res){
         UserModel.add(req.body);
         res.render('register');
    }
}