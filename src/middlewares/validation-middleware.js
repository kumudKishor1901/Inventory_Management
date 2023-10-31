import {body,validationResult} from 'express-validator';

const validationMiddleware = async (req,res,next)=>{
     // server side form validation by Express Validator

     //  1- set up rules for validation
     const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('description').notEmpty().withMessage('description is required'),
        body('price').isFloat({gt:0}).withMessage('Price must be a positive value'),
        body('imageUrl').isURL().withMessage('Invalid URL')
     ];


    //  2-  Run the Rules

    await Promise.all(rules.map((rule)=> rule.run(req)));
    
    //  3- check if there is any error in running the rules( validationResult)

     const validationErrors = validationResult(req);

    //   4- if there is errors then return the errors

     if(!validationErrors.isEmpty()){
         return res.render('new-product',{errorMessage : validationErrors.array()[0].msg});
     }
     next();
}

export default validationMiddleware;